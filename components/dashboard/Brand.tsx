import Image from "next/image";
import styles from "./Brand.module.css";

export function Brand() {
  return (
    <Image
      src="/ggu-logo.svg"
      alt="GGU Logo"
      width={367}
      height={59}
      priority
      className={styles.logo}
    />
  );
}
