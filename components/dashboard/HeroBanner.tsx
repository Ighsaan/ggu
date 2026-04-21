import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./HeroBanner.module.css";

export function HeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.copyBlock}>
        <h1 className={styles.title}>LET THE DEVS KNOW!!!</h1>
        <p className={styles.subtitle}>
          Vote for change in your favourite game
        </p>
        <ButtonLink href="/login" className={styles.voteButton}>
          Vote now
        </ButtonLink>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/placeholders/game-hero-poster.svg"
          alt="Hero placeholder"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 42vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}
