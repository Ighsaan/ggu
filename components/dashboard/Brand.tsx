import styles from "./Brand.module.css";

type BrandProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function Brand({ compact = false, inverse = false }: BrandProps) {
  const wrapClass = compact ? styles.compactWrap : styles.wrap;
  const markClass = compact ? styles.compactMark : styles.mark;
  const textClass = inverse ? styles.textBlockInverse : styles.textBlock;

  return (
    <div className={wrapClass}>
      <div className={markClass}>GGU</div>
      <div className={textClass}>
        <span className={styles.title}>GLOBAL GAME</span>
        <span className={styles.subtitle}>UNION</span>
      </div>
    </div>
  );
}
