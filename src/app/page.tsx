"use client";

import { DropdownMenu } from "@/components/dropdown-menu/dropdown-menu";
import Image from "next/image";
import { useRef, useState } from "react";

export default function LandingPage() {
  // State for the menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuOptions, setMenuOptions] = useState<
    { label: string; href: string }[]
  >([]);
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null);

  // Keep a ref to the trigger glyph so we can restore focus on close (ESC/click-away)
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  // Unified close: close the menu, clear activeGlyph, restore focus to trigger
  const closeMenu = () => {
    setMenuOpen(false);
    setActiveGlyph(null);
    triggerRef.current?.focus();
  };

  // Hide dropdown if user clicks anywhere outside:
  const handlePageClick = () => {
    closeMenu();
  };

  const getGlyphOptions = (
    glyphName: string
  ): { label: string; href: string }[] => {
    switch (glyphName) {
      case "assiah":
        return [{ label: "Placeholder", href: "/assiah/placeholder" }];
      case "atziluth":
        return [{ label: "Placeholder", href: "/atziluth/placeholder" }];
      case "ba":
        return [{ label: "Placeholder", href: "/ba/placeholder" }];
      case "beri-yah":
        return [{ label: "Placeholder", href: "/beri-yah/placeholder" }];
      case "ib":
        return [{ label: "Placeholder", href: "/ib/placeholder" }];
      case "ka":
        return [
          {
            label: "What is the Noosphere?",
            href: "/ka/what-is-the-noosphere",
          },
          {
            label: "What is the organiztion?",
            href: "/ka/what-is-the-organization",
          },
          { label: "Where do I fit in?", href: "/ka/where-do-i-fit-in" },
          {
            label: "A Cybernetically Turbulent World",
            href: "/ka/a-cybernetically-turbulent-world",
          },
          { label: "Leadership", href: "/ka/leadership" },
        ];
      case "ren":
        return [
          {
            label: "Noetic Oracular Deck",
            href: "/ren/noetic-oracular-deck",
          },
        ];
      case "sheut":
        return [
          {
            label: "Signs, omens, and portents",
            href: "/sheut/signs-omens-and-portents",
          },
          {
            label: "Sign up for the email list",
            href: "/sheut/sign-up-for-email-list",
          },
        ];
      case "yetzirah":
        return [{ label: "Placeholder", href: "/yetzirah/placeholder" }];
      default:
        return [];
    }
  };

  const handleGlyphDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    glyphName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Save the trigger for focus return when menu closes
    triggerRef.current = e.currentTarget;

    // HTMLElement that was clicked
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    // centre of the glyph *in the viewport*
    const x = rect.left + rect.width / 2 + window.scrollX;
    const y = rect.top + rect.height / 2 + window.scrollY;

    setMenuPosition({ x, y });
    setMenuOptions(getGlyphOptions(glyphName));
    setMenuOpen(true);
    setActiveGlyph(glyphName);
  };

  // Keyboard support for anchors (Space/Enter activates)
  const handleGlyphKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    glyphName: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();

      // Save the trigger for focus return when menu closes
      triggerRef.current = e.currentTarget;

      // Synthesize the same logic as click
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2 + window.scrollX;
      const y = rect.top + rect.height / 2 + window.scrollY;

      setMenuPosition({ x, y });
      setMenuOptions(getGlyphOptions(glyphName));
      setMenuOpen(true);
      setActiveGlyph(glyphName);
    }
  };

  return (
    <main
      className={`p-4 flex justify-center items-center min-h-screen transition-colors duration-300 ${
        menuOpen ? "bg-amber-200" : "bg-yellow-100"
      }`}
      onClick={handlePageClick}
    >
      {/* Wrapper: full viewport height (minus main padding) + responsive breathing room ALL around */}
      <div className="relative mx-auto w-full max-w-screen-lg h-[calc(100dvh-2rem)] p-[clamp(8px,3vmin,24px)]">
        {/* 3×3 grid that fills the wrapper */}
        <div className="grid grid-cols-3 grid-rows-3 gap-8 w-full h-full items-stretch justify-items-stretch">
          {/* Top row: atziluth, ka, yetzirah */}
          <a
            href="#"
            role="button"
            aria-label="Open menu for atziluth"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "atziluth"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "atziluth" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "atziluth")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "atziluth")}
            title="atziluth"
          >
            <Image
              src="/atziluth.svg"
              alt="atziluth"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for ka"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "ka"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "ka" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "ka")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "ka")}
            title="ka"
          >
            <Image
              src="/ka.svg"
              alt="ka"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for yetzirah"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "yetzirah"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "yetzirah" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "yetzirah")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "yetzirah")}
            title="yetzirah"
          >
            <Image
              src="/yetzirah.svg"
              alt="yetzirah"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          {/* Middle row: sheut, ib, ren */}
          <a
            href="#"
            role="button"
            aria-label="Open menu for sheut"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "sheut"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "sheut" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "sheut")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "sheut")}
            title="sheut"
          >
            <Image
              src="/sheut.svg"
              alt="sheut"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for ib"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "ib"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "ib" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "ib")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "ib")}
            title="ib"
          >
            <Image
              src="/ib.svg"
              alt="ib"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for ren"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "ren"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "ren" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "ren")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "ren")}
            title="ren"
          >
            <Image
              src="/ren.svg"
              alt="ren"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          {/* Bottom row: beri-yah, ba, assiah */}
          <a
            href="#"
            role="button"
            aria-label="Open menu for beri-yah"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "beri-yah"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "beri-yah" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "beri-yah")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "beri-yah")}
            title="beri-yah"
          >
            <Image
              src="/beri-yah.svg"
              alt="beri-yah"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for ba"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "ba"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "ba" ? " opacity-20" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "ba")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "ba")}
            title="ba"
          >
            <Image
              src="/ba.svg"
              alt="ba"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>

          <a
            href="#"
            role="button"
            aria-label="Open menu for assiah"
            aria-haspopup="menu"
            aria-expanded={menuOpen && activeGlyph === "assiah"}
            className={
              "glyph relative block w-full h-full cursor-pointer transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 " +
              (activeGlyph === "assiah" ? " opacity-60" : "")
            }
            onClick={(e) => handleGlyphDropdownClick(e, "assiah")}
            onKeyDown={(e) => handleGlyphKeyDown(e, "assiah")}
            title="assiah"
          >
            <Image
              src="/assiah.svg"
              alt="assiah"
              fill
              sizes="33vw"
              className="object-contain object-center"
            />
          </a>
        </div>
      </div>

      {/* Dropdown Menu */}
      <DropdownMenu
        isOpen={menuOpen}
        position={menuPosition}
        options={menuOptions}
        onClose={closeMenu}
      />
    </main>
  );
}
