import styles from "./Brand.module.css";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <div className={compact ? styles.compactWrap : styles.wrap}>
      <div className={compact ? styles.compactMark : styles.mark}>GGU</div>
      <div className={styles.textBlock}>
        <span className={styles.title}>GGU</span>
        <span className={styles.subtitle}>GLOBAL GAME</span>
      </div>
    </div>
  );
}
