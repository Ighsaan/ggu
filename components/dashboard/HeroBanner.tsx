import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./HeroBanner.module.css";

export function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.copyBlock}>
        <h1 className={styles.title}>
          <span>LET THE DEVS</span>
          <span>KNOW!!!</span>
        </h1>
        <p className={styles.subtitle}>
          Vote for change in your favourite game
        </p>
        <ButtonLink href="/login" className={styles.voteButton}>
          <svg
            className={styles.voteIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
          </svg>
          <span>VOTE NOW</span>
        </ButtonLink>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/megaphone.svg"
          alt="Megaphone"
          width={654}
          height={444}
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}
