"use client";

import Image from "next/image";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import styles from "./GameCarousel.module.css";

export type GameCarouselItem = {
  title: string;
  image: string;
};

type GameCarouselProps = {
  items: readonly GameCarouselItem[];
  dense?: boolean;
};

export function GameCarousel({ items, dense = false }: GameCarouselProps) {
  return (
    <section className={styles.carousel}>
      <button
        className={styles.arrow}
        type="button"
        aria-label="Previous games"
      >
        <ArrowCircleLeftOutlinedIcon fontSize="inherit" />
      </button>

      <div className={dense ? styles.itemsDense : styles.items}>
        {items.map((item) => (
          <article key={item.title} className={styles.card}>
            <div className={dense ? styles.imageWrapDense : styles.imageWrap}>
              <Image
                src={item.image}
                alt={`${item.title} logo`}
                fill
                sizes="96px"
                className={styles.image}
              />
            </div>
            <p className={styles.label}>{item.title}</p>
          </article>
        ))}
      </div>

      <button className={styles.arrow} type="button" aria-label="Next games">
        <ArrowCircleRightOutlinedIcon fontSize="inherit" />
      </button>
    </section>
  );
}
