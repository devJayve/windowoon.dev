'use client';
import React, { useRef, useEffect } from 'react';
import { useCategorySelect } from '../hooks/useCategorySelect';
import CategorySelectItem from '@/features/write/components/CategorySelectItem';
import CategoryOptionItem from '@/features/write/components/CategoryOptionItem';
import Input from '@/shared/components/input/Input';
import { clsx } from 'clsx';

interface TagSelectProps {
  onChange?: (selectedItems: string[]) => void;
}

const CategorySelect: React.FC<TagSelectProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const {
    selectedOptions,
    inputValue,
    isOpen,
    optionMenu,
    handleInputChange,
    handleOptionClick,
    handleKeyDown,
    removeCategory,
    toggleDropdown,
  } = useCategorySelect({ onChange });

  useEffect(() => {
    // 외부 클릭 시 드롭다운 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        toggleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleDropdown]);

  return (
    <div>
      <div
        className={clsx(
          'flex w-full flex-wrap gap-2 rounded border border-gray-600 p-2',
          'focus-within:ring-1 focus-within:ring-blue-500',
        )}
      >
        {selectedOptions.map((value, index) => (
          <CategorySelectItem
            key={`${value}-${index}`}
            value={value}
            removeCategory={removeCategory}
          />
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          variant="outline"
          onChange={e => handleInputChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleKeyDown(inputValue)}
          onClick={() => toggleDropdown(true)}
          placeholder={selectedOptions.length === 0 ? '카테고리를 선택 혹은 입력' : ''}
          fullWidth
        />
      </div>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 mt-1 max-h-60 w-64 overflow-auto rounded bg-white shadow-lg dark:bg-neutral-900"
        >
          {optionMenu.map((option, index) => (
            <CategoryOptionItem
              key={`${option}-${index}`}
              option={option}
              handleOptionClick={handleOptionClick}
            />
          ))}
          {optionMenu.length === 0 && (
            <li className="px-4 py-2 text-gray-500">Enter를 눌러 새로운 옵션 추가하기</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
