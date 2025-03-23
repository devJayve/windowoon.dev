import { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react';
import { Dialog } from '@/shared/components/dialog/dialog';

interface ModalContextType {
  openModal: <T = boolean>(component: ReactElement) => Promise<T>;
  closeModal: <T = boolean>(result: T) => void;
}

export interface ModalProps {
  close: (resolve: boolean) => void;
  reject: (reason?: Error) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ReactElement<ModalProps> | null>(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [promiseHandler, setPromiseHandler] = useState<{
    resolve: (value: any) => void;
    reject: (reason?: Error) => void;
  } | null>(null);

  const openModal = <T = boolean,>(component: ReactElement) => {
    setModal(component);

    return new Promise<T>((resolve, reject) => {
      setPromiseHandler({ resolve, reject });
    });
  };

  const closeModal = <T = boolean,>(result: T) => {
    promiseHandler?.resolve(result);
    setModal(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal(false);
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={!!modal} onOpenChange={handleOpenChange}>
        {modal && modal}
      </Dialog>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
