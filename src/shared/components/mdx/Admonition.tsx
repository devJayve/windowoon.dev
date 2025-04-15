import type { ReactNode } from 'react';

import styles from './Admonition.module.css';

import { IconDanger, IconInfo, IconNote, IconTip, IconWarning } from '@/shared/components/icons';

export type TAdmonition = 'warning' | 'danger' | 'info' | 'note' | 'tip';

type TAdmonitionInfo = {
  title: string;
  icon: ReactNode;
};

type TAdmonitions = Record<TAdmonition, TAdmonitionInfo>;

const ADMONITIONS: TAdmonitions = {
  warning: {
    title: 'warning',
    icon: <IconWarning />,
  },
  danger: {
    title: 'danger',
    icon: <IconDanger />,
  },
  info: {
    title: 'info',
    icon: <IconInfo />,
  },
  tip: {
    title: 'tip',
    icon: <IconTip />,
  },
  note: {
    title: 'note',
    icon: <IconNote />,
  },
};

type CustomProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  ['data-type']: string;
  ['data-title']?: string;
};

const types: TAdmonition[] = ['warning', 'danger', 'info', 'note', 'tip'];

export const admonition = ({ children, ...props }: CustomProps) => {
  if (!props['data-type']) return null;

  const defaultType = 'note' as TAdmonition;
  const type = props['data-type'] as TAdmonition;
  const title = props['data-title'];

  const admonitionType = types.includes(type) ? type : defaultType;
  const admonition = ADMONITIONS[admonitionType];

  return (
    <div className={`${styles['admonition-container']} ${styles[admonitionType]}`}>
      <div className={styles['admonition-title']}>
        {admonition.icon}
        {title ?? admonition.title}
      </div>
      <div className={styles['admonition-content']}>{children}</div>
    </div>
  );
};
