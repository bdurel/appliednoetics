"use client";

import { DropdownMenu } from "@/components/dropdown-menu/dropdown-menu";
import Image from "next/image";
import { useState } from "react";

export default function LandingPage() {
  // State for the menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuOptions, setMenuOptions] = useState<
    { label: string; href: string }[]
  >([]);
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null);

  // Hide dropdown if user clicks anywhere outside:
  const handlePageClick = () => {
    setMenuOpen(false);
    setActiveGlyph(null);
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
          {
            label: "Where do I fit in?",
            href: "/ka/where-do-i-fit-in",
          },
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
            href: "https://appliednoetics.org/",
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

    // HTMLElement that was clicked
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    //   centre of the glyph *in the viewport*
    const x = rect.left + rect.width / 2 + window.scrollX;
    const y = rect.top + rect.height / 2 + window.scrollY;

    setMenuPosition({ x, y });
    setMenuOptions(getGlyphOptions(glyphName));
    setMenuOpen(true);
    setActiveGlyph(glyphName);
  };

  return (
    <main
      className={`p-4 flex justify-center items-center min-h-screen transition-colors duration-300 ${
        menuOpen ? "bg-amber-200" : "bg-yellow-100"
      }`}
      onClick={handlePageClick}
    >
      {/* Wrapper for scaling */}
      <div
        className="relative scale-100 sm:scale-90 md:scale-90 lg:scale-90 xl:scale-90"
        style={{
          transformOrigin: "center",
          maxWidth: "100%",
        }}
      >
        {/* The Grid */}
        <div
          className="grid auto-rows-max gap-y-4 gap-x-6 justify-items-center items-center max-w-screen-lg w-full"
          style={{
            gridTemplateAreas: `
            "left1 . center1 . right1"
            ". left-center2 center2 right-center2 ."
            "left3 center3 center3 center3 right3"
          `,
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          }}
        >
          {/* Outer glyphs */}
          <a
            className={
              "glyph -mt-6 cursor-pointer transition-opacity" +
              (activeGlyph === "assiah" ? " opacity-60" : "")
            }
            style={{ gridArea: "right3", alignSelf: "start" }}
            onClick={(e) => handleGlyphDropdownClick(e, "assiah")}
          >
            <Image
              src="/assiah.svg"
              alt="Glyph Right 3"
              width={150}
              height={150}
              className="w-[24vw] h-[24vw] sm:w-[9vw] sm:h-[9vw]"
            />
          </a>
          <a
            className={
              "glyph -mt-6 cursor-pointer transition-opacity" +
              (activeGlyph === "beri-yah" ? " opacity-20" : "")
            }
            style={{ gridArea: "left3", alignSelf: "start" }}
            onClick={(e) => handleGlyphDropdownClick(e, "beri-yah")}
          >
            <Image
              src="/beri-yah.svg"
              alt="Glyph Left 3"
              width={150}
              height={150}
              className="w-[24vw] h-[24vw] sm:w-[9vw] sm:h-[9vw]"
            />
          </a>
          <a
            className={
              "glyph cursor-pointer" +
              (activeGlyph === "atziluth" ? " opacity-20" : "")
            }
            style={{ gridArea: "left1", alignSelf: "end" }}
            onClick={(e) => handleGlyphDropdownClick(e, "atziluth")}
          >
            <Image
              src="/atziluth.svg"
              alt="Glyph Left 1"
              width={150}
              height={150}
              className="w-[24vw] h-[24vw] sm:w-[9vw] sm:h-[9vw]"
            />
          </a>
          <a
            className={
              "glyph -mb-2 cursor-pointer transition-opacity" +
              (activeGlyph === "yetzirah" ? " opacity-20" : "")
            }
            style={{ gridArea: "right1", alignSelf: "end" }}
            onClick={(e) => handleGlyphDropdownClick(e, "yetzirah")}
          >
            <Image
              src="/yetzirah.svg"
              alt="Glyph Right 1"
              width={150}
              height={150}
              className="w-[24vw] h-[24vw] sm:w-[9vw] sm:h-[9vw]"
            />
          </a>

          {/* Center glyphs clockwise */}
          <a
            className={
              "glyph mb-8 cursor-pointer transition-opacity" +
              (activeGlyph === "ka" ? " opacity-20" : "")
            }
            style={{ gridArea: "center1", alignSelf: "start" }}
            onClick={(e) => handleGlyphDropdownClick(e, "ka")}
          >
            <Image
              src="/ka.svg"
              alt="Glyph Center 1"
              width={150}
              height={150}
              className="w-[25vw] h-[25vw] sm:w-[10vw] sm:h-[10vw]"
            />
          </a>
          <a
            className={
              "glyph mb-8 cursor-pointer transition-opacity" +
              (activeGlyph === "ren" ? " opacity-20" : "")
            }
            style={{ gridArea: "right-center2" }}
            onClick={(e) => handleGlyphDropdownClick(e, "ren")}
          >
            <Image
              src="/ren.svg"
              alt="Glyph Right Center 2"
              width={150}
              height={150}
              className="w-[25vw] h-[25vw] sm:w-[10vw] sm:h-[10vw]"
            />
          </a>
          <a
            className={
              "glyph mt-8 ml-6 cursor-pointer transition-opacity" +
              (activeGlyph === "ba" ? " opacity-20" : "")
            }
            style={{ gridArea: "center3" }}
            onClick={(e) => handleGlyphDropdownClick(e, "ba")}
          >
            <Image
              src="/ba.svg"
              alt="Glyph Center 3"
              width={150}
              height={150}
              className="w-[27vw] h-[27vw] sm:w-[16vw] sm:h-[16vw]"
            />
          </a>
          <a
            className={
              "glyph cursor-pointer transition-opacity" +
              (activeGlyph === "sheut" ? " opacity-20" : "")
            }
            style={{ gridArea: "left-center2", alignSelf: "start" }}
            onClick={(e) => handleGlyphDropdownClick(e, "sheut")}
          >
            <Image
              src="/sheut.svg"
              alt="Glyph Left Center 2"
              width={150}
              height={150}
              className="w-[26vw] h-[26vw] sm:w-[11vw] sm:h-[11vw]"
            />
          </a>

          {/* Innermost glyph */}
          <a
            className={
              "glyph pb-4 cursor-pointer transition-opacity" +
              (activeGlyph === "ib" ? " opacity-20" : "")
            }
            style={{ gridArea: "center2" }}
            onClick={(e) => handleGlyphDropdownClick(e, "ib")}
          >
            <Image
              src="/ib.svg"
              alt="Glyph Center 2"
              width={150}
              height={150}
              className="w-[24vw] h-[24vw] sm:w-[9vw] sm:h-[9vw]"
            />
          </a>
        </div>
      </div>

      {/* Dropdown Menu */}
      <DropdownMenu
        isOpen={menuOpen}
        position={menuPosition}
        options={menuOptions}
        onClose={() => setMenuOpen(false)}
      />
    </main>
  );
}
