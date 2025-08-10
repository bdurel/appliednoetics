"use client";

import React, { useEffect, useRef } from "react";
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
  // Always declare hooks at top-level (no conditional return before hooks)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // On open: focus first item
  useEffect(() => {
    if (!isOpen) return;

    const raf = requestAnimationFrame(() => {
      const first = linkRefs.current.find(
        (el): el is HTMLAnchorElement => !!el
      );
      first?.focus();
    });

    // Close on Escape (and let LandingPage's closeMenu clear activeGlyph + restore focus)
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onDocKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onDocKey);
    };
  }, [isOpen, options, onClose]);

  // Arrow/Home/End nav within the menu
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const items = linkRefs.current.filter(
      (el): el is HTMLAnchorElement => !!el
    );
    if (items.length === 0) return;

    const currentIndex = items.findIndex((el) => el === document.activeElement);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next =
          currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
        items[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev =
          currentIndex === -1
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
        items[prev]?.focus();
        break;
      }
      case "Home":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: position.y,
    left: position.x,
    transform: "translate(-50%, -50%)",
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
    "hover:text-[#ffeae8] focus-visible:text-[#ffeae8] hover:bg-[#160201b3] focus-visible:bg-[#160201b3] " +
    "hover:scale-105 focus-visible:scale-105";

  const handleMenuClick = (event: React.MouseEvent) => {
    // prevent close from <main> onClick
    event.stopPropagation();
  };

  return (
    <div
      ref={menuRef}
      style={menuStyle}
      onClick={handleMenuClick}
      onKeyDown={handleKeyDown}
      className="origin-top-left animate-dropdown"
      key={`${position.x}-${position.y}`}
    >
      <ul role="menu" aria-label="Glyph options" className="bg-transparent">
        {options.map((option, i) => (
          <li key={option.href} role="none" className="list-none mb-0 pb-0">
            <Link
              href={option.href}
              role="menuitem"
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={linkClasses}
              onClick={onClose}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
