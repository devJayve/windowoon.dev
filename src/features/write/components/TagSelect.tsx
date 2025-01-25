import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  initialOptions?: string[];
  onChange?: (selectedItems: string[]) => void;
}

const TagSelect: React.FC<CustomSelectProps> = ({
  initialOptions = ['Apple', 'Banana', 'Cherry', 'Date'],
  onChange,
}) => {
  const [options, setOptions] = useState<string[]>(initialOptions);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    onChange?.(selectedValues);
  }, [selectedValues, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);

    const filtered = options.filter(
      option =>
        option.toLowerCase().includes(value.toLowerCase()) && !selectedValues.includes(option),
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValues(prev => [...prev, option]);
    setInputValue('');
    setFilteredOptions(options.filter(opt => !selectedValues.includes(opt) && opt !== option));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && !options.includes(inputValue.trim())) {
      const newOption = inputValue.trim();
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      setSelectedValues(prev => [...prev, newOption]);
      setInputValue('');
      setFilteredOptions(updatedOptions.filter(opt => !selectedValues.includes(opt)));
    }
  };

  const removeValue = (valueToRemove: string) => {
    setSelectedValues(prev => prev.filter(value => value !== valueToRemove));
    setFilteredOptions(prev => [...prev, valueToRemove].sort());
  };

  return (
    <div className="w-64">
      <div className="flex min-h-[42px] w-full flex-wrap gap-2 rounded border p-2 focus-within:ring-2 focus-within:ring-blue-500">
        {selectedValues.map((value, index) => (
          <span
            key={index}
            className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-sm"
          >
            {value}
            <button
              type="button"
              onClick={() => removeValue(value)}
              className="font-bold hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => setIsOpen(true)}
          className="min-w-[60px] grow outline-none"
          placeholder={selectedValues.length === 0 ? 'Select or type...' : ''}
        />
      </div>

      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute mt-1 max-h-60 w-64 overflow-auto rounded border bg-white shadow-lg"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer px-4 py-2 hover:bg-blue-50"
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="px-4 py-2 text-gray-500">Press Enter to add new option</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TagSelect;
