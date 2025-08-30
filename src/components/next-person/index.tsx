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

import { type CheckMatchResponse } from "../../api/check-match";
import { DialogMatch } from "../dialog-match";
import { DialogNoMoreProfiles } from "../dialog-no-more-profiles";
import styles from "./styles.module.css";

type NextPersonProps = {
  currentUserId: number;
  currentUserName: string;
  currentUserPhoto: string;
};

export const NextPerson: FC<NextPersonProps> = ({
  currentUserId,
  currentUserName,
  currentUserPhoto,
}) => {
  const [mainImageLoaded, setMainImageLoaded] = useState<boolean>(false);

  const [hideInfoOnMouseOver, setHideInfoOnMouseOver] =
    useState<boolean>(false);

  const [nextPersonResponse, setNextPersonResponse] = useState<
    NextPersonResponse | undefined | null
  >(undefined);

  const [actionResponse, setActionResponse] = useState<
    ActionResponse | undefined
  >(undefined);

  const [checkMatchResponse, setCheckMatchResponse] = useState<
    CheckMatchResponse | undefined
  >(undefined);

  const doNextPerson = useCallback(() => {
    import("../../api/next-person").then((mod) => {
      const response = mod.default({ currentUserId });
      setNextPersonResponse(response);
    });
  }, [currentUserId]);

  const doCheckMatch = useCallback(() => {
    import("../../api/check-match").then((mod) => {
      const response = mod.default({
        userAId: currentUserId,
        userBId: nextPersonResponse?.nextPerson?.id,
      });

      setCheckMatchResponse(response);

      if (!response.match) {
        doNextPerson();
      }
    });
  }, [currentUserId, doNextPerson, nextPersonResponse?.nextPerson?.id]);

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
          doCheckMatch();
        }
      });
    },
    [currentUserId, doCheckMatch, nextPersonResponse?.nextPerson?.id]
  );

  const handleAction = (action: Action) => {
    if (nextPersonResponse?.nextPerson) {
      doAction(action);
    }
  };

  useEffect(() => {
    doNextPerson();
  }, [currentUserId, doNextPerson]);

  if (nextPersonResponse?.nextPerson === null) {
    switch (nextPersonResponse?.errorCode) {
      case "noMoreProfilesAvailable":
        return (
          <DialogNoMoreProfiles
            open={true}
            onClick={() => window.location.reload()}
          />
        );
      default:
        return (
          <ErrorMessage
            message={translate(`error.${nextPersonResponse?.errorCode}`)}
          />
        );
    }
  }

  if (checkMatchResponse?.match) {
    return (
      <DialogMatch
        open={true}
        personAName={currentUserName}
        personAPhoto={currentUserPhoto}
        personBName={checkMatchResponse?.matchedPerson?.name ?? ""}
        personBPhoto={checkMatchResponse?.matchedPerson?.photo ?? ""}
        handleBack={() => {
          setCheckMatchResponse(undefined);
          doNextPerson();
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      {nextPersonResponse?.nextPerson ? (
        <ImageListItem component="div">
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
