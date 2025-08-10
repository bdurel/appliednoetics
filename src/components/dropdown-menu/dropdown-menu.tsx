"use client";

import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  options: { label: string; href: string }[];
  onClose: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  position,
  options,
  onClose,
}) => {
  if (!isOpen) return null;

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: position.y,
    left: position.x,
    transform: "translate(-50%, -50%)",
    background: "rgba(22, 2, 1, 0.7)",

    // border: "2px solid #e3534c",
    borderRadius: 18,
    padding: 8,
    zIndex: 9_999,
    color: "rgb(227, 83, 76)",
    fontWeight: 200,
    fontSize: "1.2rem",
  };

  const linkClasses =
    "block w-full text-left text-inherit outline-none transition-all duration-150 px-2 py-1 rounded-sm " +
    "border border-transparent " +
    "hover:text-[#ffeae8] hover focus-visible:text-[#ffeae8] " +
    "hover:scale-105 focus-visible:scale-105";

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      style={menuStyle}
      onClick={handleMenuClick}
      className="origin-top-left animate-dropdown"
      key={`${position.x}-${position.y}`}
    >
      <ul className="bg-transparent">
        {options.map((option) => (
          <li key={option.href} className="list-none mb-0 pb-0">
            <Link href={option.href} className={linkClasses} onClick={onClose}>
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
