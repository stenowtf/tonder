import {
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { type ActionResponse } from "../../api/action";
import { type NextPersonResponse } from "../../api/next-person";
import { translate } from "../../i18n";
import { type Action } from "../../types/action";
import { Actions } from "../actions";
import { ErrorMessage } from "../error-message";
import { MainImage } from "../main-image";

import styles from "./styles.module.css";

type NextPersonProps = {
  currentUserId: number;
};

export const NextPerson: FC<NextPersonProps> = ({ currentUserId }) => {
  const [mainImageLoaded, setMainImageLoaded] = useState<boolean>(false);
  const [hideInfoOnMouseOver, setHideInfoOnMouseOver] =
    useState<boolean>(false);

  // undifined = loading, null = no more profiles, Person = next profile
  const [nextPersonResponse, setNextPersonResponse] = useState<
    NextPersonResponse | undefined | null
  >(undefined);

  const [actionResponse, setActionResponse] = useState<
    ActionResponse | undefined
  >(undefined);

  const fetchNextPerson = useCallback(() => {
    import("../../api/next-person").then((mod) => {
      const response = mod.default({ currentUserId });
      setNextPersonResponse(response);
    });
  }, [currentUserId]);

  const doAction = useCallback(
    (action: Action) => {
      import("../../api/action").then((mod) => {
        const response = mod.default({
          currentUserId,
          likedUserId: nextPersonResponse?.nextPerson?.id,
          action,
        });
        setActionResponse(response);

        if (response.errorCode === undefined) {
          setMainImageLoaded(false);
          fetchNextPerson();
        }
      });
    },
    [currentUserId, fetchNextPerson, nextPersonResponse?.nextPerson?.id]
  );

  const handleAction = (action: Action) => {
    if (nextPersonResponse?.nextPerson) {
      doAction(action);
    }
  };

  useEffect(() => {
    fetchNextPerson();
  }, [currentUserId, fetchNextPerson]);

  if (nextPersonResponse?.nextPerson === null) {
    return (
      <ErrorMessage
        message={translate(`error.${nextPersonResponse?.errorCode}`)}
      />
    );
  }

  return (
    <div className={styles.container}>
      {nextPersonResponse?.nextPerson ? (
        <ImageListItem component={"div"}>
          <MainImage
            imageSrc={nextPersonResponse.nextPerson.photo || ""}
            imageAlt={nextPersonResponse.nextPerson.name || ""}
            setMainImageLoaded={setMainImageLoaded}
            setHideInfoOnMouseOver={setHideInfoOnMouseOver}
          />
          {mainImageLoaded && !hideInfoOnMouseOver && (
            <ImageListItemBar
              title={`${nextPersonResponse.nextPerson.name}, ${nextPersonResponse.nextPerson.age}`}
              subtitle={nextPersonResponse.nextPerson.bio}
              sx={{ "& .MuiImageListItemBar-subtitle": { lineHeight: "1.2" } }}
            />
          )}
        </ImageListItem>
      ) : (
        <CircularProgress />
      )}

      <Actions
        loading={!mainImageLoaded}
        errorCode={actionResponse?.errorCode}
        handleAction={handleAction}
      />
    </div>
  );
};
