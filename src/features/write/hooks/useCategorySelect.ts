import { useState, useEffect } from 'react';
import { getCategories } from '@/features/write/lib/getCategories';

interface UseCategorySelectProps {
  onChange?: (selectedItems: string[]) => void;
}

export const useCategorySelect = ({ onChange }: UseCategorySelectProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [optionMenu, setOptionMenu] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // DB로부터 카테고리 목록 fetching
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setOptions(categories.map((category: { name: string }) => category.name));
      setOptionMenu(categories.map((category: { name: string }) => category.name));
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onChange?.(selectedOptions);
  }, [selectedOptions]);

  // input 입력 시 해당 키워드 필터링
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsOpen(true);

    const filtered = options.filter(
      option =>
        option.toLowerCase().includes(value.toLowerCase()) && !selectedOptions.includes(option),
    );
    setOptionMenu(filtered);
  };

  const _updateOptions = (option: string) => {
    setSelectedOptions(prev => [...prev, option]);
    setOptionMenu(options.filter(opt => !selectedOptions.includes(opt) && opt !== option));
    setInputValue('');
  };

  // option을 클릭하여 새로 선택
  const handleOptionClick = (option: string) => _updateOptions(option);

  // enter key 입력
  const handleKeyDown = (option: string) => {
    const trimmedOption = option.trim();

    if (!trimmedOption) return;

    if (!options.includes(trimmedOption)) {
      const updatedOptions = [...options, trimmedOption];
      setOptions(updatedOptions);
    }
    _updateOptions(trimmedOption);
  };

  // input으로부터 카테고리 제거
  const removeCategory = (valueToRemove: string) => {
    setSelectedOptions(prev => prev.filter(value => value !== valueToRemove));
    setOptionMenu(prev => [...prev, valueToRemove].sort());
  };

  // 드롭다운 토글
  const toggleDropdown = (open: boolean) => setIsOpen(open);

  return {
    isLoading,
    selectedOptions,
    inputValue,
    isOpen,
    optionMenu,
    handleInputChange,
    handleOptionClick,
    handleKeyDown,
    removeCategory,
    toggleDropdown,
  };
};
