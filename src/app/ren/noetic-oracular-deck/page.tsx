"use client";

import styles from "./page.module.css";
import { Noto_Serif_Display } from "next/font/google";
import Image from "next/image";

const noto = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function NodPromo() {
  return (
    <section
      className={`${styles.nodRoot} ${noto.className}`}
      aria-labelledby="nod-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            src="/nod-logo.jpg" // must live in /public
            alt="The Noetic Oracular Deck Logo"
            width={200}
            height={200}
            className={styles.logoImg}
            priority
          />
          <div>
            <h1 id="nod-title">New Technology from Applied Noetics!</h1>
            <h2 className={styles.mobileTitle}>The Noetic Oracular Deck!</h2>
            <h3 className={styles.mobileByline}>
              Conceived by Connor M. Kizer <br /> Illustrated by KNOX
            </h3>
          </div>
        </header>

        <div className={styles.content}>
          <Image
            src="/cards-ad.jpg" // must live in /public
            alt="The Noetic Oracular Deck"
            width={550}
            height={250}
            className={styles.deckImg}
          />

          <a
            href="https://www.etsy.com/listing/1759048426"
            className={styles.mobileBuyNowButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now
          </a>

          <div className={styles.text}>
            <h2 className={styles.desktopTitle}>The Noetic Oracular</h2>
            <div className={styles.titleAndByline}>
              <h2 className={styles.desktopTitle}> Deck!</h2>
              <span className={styles.byline}>
                Conceived by Connor M. Kizer <br /> Illustrated by KNOX
              </span>
            </div>

            <p className={styles.description}>
              The Noetic Oracular Deck ({"N.\u00A0O.\u00A0D."}) is a fortune
              telling device developed by our noeticist Connor M. Kizer to help
              you explore your noetic existence. The thirty-six original card
              concepts have been designed using a formula published by famed
              early twentieth century wizard Austin Osman Spare and illustrated
              by Baltimore artist KNOX. Each deck includes a list of brief
              descriptions of card meanings. The N. O. D. works with any spread
              you normally use, but includes the Noetic Nine Card spread,
              developed specifically for the Noetic Oracular Deck. Plumb the
              depths of your fortune with a {"N.\u00A0O.\u00A0D."} today!
            </p>

            <div className={styles.buttonContainer}>
              <a
                href="https://www.etsy.com/listing/1759048426"
                className={styles.buyNowButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
