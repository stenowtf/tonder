import { type FC } from "react";
import styles from "./styles.module.css";

type MainImageProps = {
  loading: boolean;
  imageSrc: string;
  imageAlt: string;
  onLoad: () => void;
};

export const MainImage: FC<MainImageProps> = ({
  loading,
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
