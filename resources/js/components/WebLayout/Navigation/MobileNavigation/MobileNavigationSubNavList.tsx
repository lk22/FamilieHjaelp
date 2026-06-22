import { useState } from "react";

// Component imports
import MobileNavigationLink from "./MobileNavigationLink";


type MobileNavigationSubNavListProps = {
  items: {
    href: string;
    label: string;
  }[];
  label: string;
}

export default function MobileNavigationSubNavList({ items, label }: MobileNavigationSubNavListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggledListClasses = `flex gap-2 flex-col items-start mt-2 w-full sub-nav ${isOpen ? 'h-auto' : 'hidden'}`;

  const toggleSubNav = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <p className="text-white font-bold text-4xl mt-2 flex justify-between items-center w-full">
        {label}
        <button onClick={toggleSubNav} className={`ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      </p>
      <ul className={toggledListClasses}>
        {items.map((item, index) => (
          <MobileNavigationLink key={index} href={item.href}>{item.label}</MobileNavigationLink>
        ))}
      </ul>
    </>
  );
}