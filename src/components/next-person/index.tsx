import { ImageListItem, ImageListItemBar } from "@mui/material";
import { useCallback, useEffect, useState, type FC } from "react";
import { updateUserLikes } from "../../api/db";
import { type NextPersonResponse } from "../../api/next-person";
import { translate } from "../../i18n";
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
  const [response, setResponse] = useState<
    NextPersonResponse | undefined | null
  >(undefined);

  const fetchNextPerson = useCallback(() => {
    import("../../api/next-person").then((mod) => {
      const res = mod.default({ currentUserId });
      setResponse(res);
    });
  }, [currentUserId]);

  const handleAction = (action: boolean) => {
    if (response?.nextPerson) {
      updateUserLikes(currentUserId, response.nextPerson.id, action);
      fetchNextPerson();
    }
  };

  useEffect(() => {
    fetchNextPerson();
  }, [currentUserId, fetchNextPerson]);

  if (response?.nextPerson === null) {
    return (
      <ErrorMessage
        message={response?.error || translate("error.noMoreProfilesAvailable")}
      />
    );
  }

  return (
    <div className={styles.container}>
      <ImageListItem component={"div"}>
        <MainImage
          imageSrc={response?.nextPerson?.photo || ""}
          imageAlt={response?.nextPerson?.name || ""}
          setMainImageLoaded={setMainImageLoaded}
          setHideInfoOnMouseOver={setHideInfoOnMouseOver}
        />
        {mainImageLoaded && !hideInfoOnMouseOver && (
          <ImageListItemBar
            title={`${response?.nextPerson?.name}, ${response?.nextPerson?.age}`}
            subtitle={response?.nextPerson?.bio}
            sx={{
              "& .MuiImageListItemBar-subtitle": {
                lineHeight: "1.2",
              },
            }}
          />
        )}
      </ImageListItem>

      <Actions loading={!mainImageLoaded} handleAction={handleAction} />
    </div>
  );
};
