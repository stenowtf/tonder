import { Skeleton } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { type NextPersonResponse } from "../../api/next-person";
import { translate } from "../../i18n";
import { DislikeButton } from "../dislike-button";
import { LikeButton } from "../like-button";
import styles from "./styles.module.css";

type NextPersonProps = {
  currentUserId: number;
};

export const NextPerson: FC<NextPersonProps> = ({ currentUserId }) => {
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  // undifined = loading, null = no more profiles, Person = next profile
  const [response, setResponse] = useState<
    NextPersonResponse | undefined | null
  >(undefined);

  const fetchNextPerson = useCallback(() => {
    import("../../api/next-person").then((mod) => {
      const res = mod.default({ currentUserId });
      setResponse(res);
    });
  }, [currentUserId]);

  const handleLike = () => {
    // updateUserLikes(currentUserId, response?.nextPerson?.id!, true);
    fetchNextPerson();
  };

  const handleDislike = () => {
    // updateUserLikes(currentUserId, response?.nextPerson?.id!, false);
    fetchNextPerson();
  };

  useEffect(() => {
    fetchNextPerson();
  }, [currentUserId, fetchNextPerson]);

  if (response?.nextPerson === null) {
    return (
      <div className={styles.noMoreProfiles}>
        {response?.error || translate("error.noMoreProfilesAvailable")}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {response?.nextPerson === undefined ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <img
            src={response.nextPerson.photo}
            alt={response.nextPerson.name}
            className={styles.photo}
            sizes="(max-width: 600px) 100vw, 400px"
            onLoad={() => setMainImageLoaded(true)}
          />
        )}

        <div
          className={
            mainImageLoaded
              ? `${styles.info} ${styles.infoGradient}`
              : styles.info
          }
        >
          <div className={styles.infoHeader}>
            {response?.nextPerson === undefined ? (
              <Skeleton width={100} />
            ) : (
              <span className={styles.name}>{response.nextPerson.name}</span>
            )}

            {response?.nextPerson === undefined ? (
              <Skeleton width={50} />
            ) : (
              <span className={styles.age}>
                {response.nextPerson.age} {translate("yearsOld")}
              </span>
            )}
          </div>

          {response?.nextPerson === undefined ? (
            <Skeleton width="100%" />
          ) : (
            <span className={styles.bio}>{response.nextPerson.bio}</span>
          )}
        </div>
      </div>

      {mainImageLoaded && (
        <div className={styles.actions}>
          <LikeButton onClick={handleLike} />
          <DislikeButton onClick={handleDislike} />
        </div>
      )}
    </div>
  );
};
