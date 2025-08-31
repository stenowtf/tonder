import { type FC } from "react";

import styles from "./styles.module.css";

type MainImageProps = {
  imageSrc: string | undefined;
  imageAlt: string;
  setMainImageLoaded: (loaded: boolean) => void;
  setHideInfoOnMouseOver: (hide: boolean) => void;
};

export const MainImage: FC<MainImageProps> = ({
  imageSrc,
  imageAlt,
  setMainImageLoaded,
  setHideInfoOnMouseOver,
}) => {
  if (!imageSrc) {
    return null;
  }

  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      className={styles.photo}
      onLoad={() => setMainImageLoaded(true)}
      onMouseOver={() => setHideInfoOnMouseOver(true)}
      onMouseOut={() => setHideInfoOnMouseOver(false)}
      onError={() => setMainImageLoaded(false)}
      fetchPriority="high"
    />
  );
};
