interface TagOptionItemProps {
  option: string;
  handleOptionClick: (option: string) => void;
}

function CategoryOptionItem({ option, handleOptionClick }: TagOptionItemProps) {
  return (
    <li
      onClick={() => handleOptionClick(option)}
      className="group mx-2 my-1 cursor-pointer text-sm"
    >
      <p className="size-full p-1 group-hover:rounded-md group-hover:bg-white/20">{option}</p>
    </li>
  );
}

export default CategoryOptionItem;
