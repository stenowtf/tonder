import { type FC } from "react";
import styles from "./styles.module.css";

type MainImageProps = {
  imageSrc: string;
  imageAlt: string;
  onLoad: () => void;
};

export const MainImage: FC<MainImageProps> = ({
  imageSrc,
  imageAlt,
  onLoad,
}) => {
  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      className={styles.photo}
      onLoad={onLoad}
      fetchPriority="high"
    />
  );
};
