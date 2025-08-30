import { Alert, Grid } from "@mui/material";
import { useEffect, useRef, type FC } from "react";
import toast from "react-hot-toast";
import { translate } from "../../i18n";
import { type Action } from "../../types/action";
import { DislikeButton } from "../dislike-button";
import { LikeButton } from "../like-button";

type ActionsProps = {
  loading: boolean;
  errorCode: string | undefined;
  handleAction: (action: Action) => void;
};

export const Actions: FC<ActionsProps> = ({
  loading,
  errorCode,
  handleAction,
}) => {
  const lastErrorTimestamp = useRef<number>(0);

  useEffect(() => {
    if (errorCode) {
      lastErrorTimestamp.current = Date.now();

      toast.custom(
        <Alert severity="error">{translate(`error.${errorCode}`)}</Alert>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCode, lastErrorTimestamp.current]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <LikeButton onClick={() => handleAction("like")} />
        <DislikeButton onClick={() => handleAction("dislike")} />
      </Grid>
    </>
  );
};
