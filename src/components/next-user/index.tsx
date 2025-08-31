import {
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { type ActionResponse } from "../../api/action";
import { type CheckMatchResponse } from "../../api/check-match";
import { type NextUserResponse } from "../../api/next-user";
import { translate } from "../../i18n";
import { type Action } from "../../types/action";
import { Actions } from "../actions";
import { DialogMatch } from "../dialog-match";
import { DialogNoMoreProfiles } from "../dialog-no-more-profiles";
import { ErrorMessage } from "../error-message";
import { MainImage } from "../main-image";
import styles from "./styles.module.css";

type NextUserProps = {
  currentUserId: number;
  currentUserName: string;
  currentUserPhoto: string;
};

export const NextUser: FC<NextUserProps> = ({
  currentUserId,
  currentUserName,
  currentUserPhoto,
}) => {
  const [mainImageLoaded, setMainImageLoaded] = useState<boolean>(false);

  const [hideInfoOnMouseOver, setHideInfoOnMouseOver] =
    useState<boolean>(false);

  const [nextUserResponse, setNextUserResponse] = useState<
    NextUserResponse | undefined | null
  >(undefined);

  const [actionResponse, setActionResponse] = useState<
    ActionResponse | undefined
  >(undefined);

  const [checkMatchResponse, setCheckMatchResponse] = useState<
    CheckMatchResponse | undefined
  >(undefined);

  const doNextUser = useCallback(() => {
    import("../../api/next-user").then((mod) => {
      const response = mod.default({ currentUserId });
      setNextUserResponse(response);
    });
  }, [currentUserId]);

  const doCheckMatch = useCallback(() => {
    import("../../api/check-match").then((mod) => {
      const response = mod.default({
        userId: currentUserId,
        targetId: nextUserResponse?.nextUser?.id,
      });

      setCheckMatchResponse(response);

      if (!response.match) {
        doNextUser();
      }
    });
  }, [currentUserId, doNextUser, nextUserResponse?.nextUser?.id]);

  const doAction = useCallback(
    (action: Action) => {
      import("../../api/action").then((mod) => {
        const response = mod.default({
          currentUserId,
          likedUserId: nextUserResponse?.nextUser?.id,
          action,
        });
        setActionResponse(response);

        if (response.errorCode === undefined) {
          setMainImageLoaded(false);
          doCheckMatch();
        }
      });
    },
    [currentUserId, doCheckMatch, nextUserResponse?.nextUser?.id]
  );

  const handleAction = (action: Action) => {
    if (nextUserResponse?.nextUser) {
      doAction(action);
    }
  };

  useEffect(() => {
    doNextUser();
  }, [currentUserId, doNextUser]);

  if (nextUserResponse?.nextUser === null) {
    switch (nextUserResponse?.errorCode) {
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
            message={translate(`error.${nextUserResponse?.errorCode}`)}
          />
        );
    }
  }

  if (checkMatchResponse?.match) {
    return (
      <DialogMatch
        open={true}
        userAName={currentUserName}
        userAPhoto={currentUserPhoto}
        userBName={checkMatchResponse?.matchedUser?.name ?? ""}
        userBPhoto={checkMatchResponse?.matchedUser?.photo ?? ""}
        handleBack={() => {
          setCheckMatchResponse(undefined);
          doNextUser();
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      {nextUserResponse?.nextUser ? (
        <ImageListItem component="div">
          <MainImage
            imageSrc={nextUserResponse.nextUser.photo}
            imageAlt={`${translate("profileAlt")} ${
              nextUserResponse.nextUser.name
            }`}
            setMainImageLoaded={setMainImageLoaded}
            setHideInfoOnMouseOver={setHideInfoOnMouseOver}
          />
          {mainImageLoaded && !hideInfoOnMouseOver && (
            <ImageListItemBar
              title={`${nextUserResponse.nextUser.name}, ${nextUserResponse.nextUser.age}`}
              subtitle={nextUserResponse.nextUser.bio}
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
