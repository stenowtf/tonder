import { Grid } from "@mui/material";
import { type FC } from "react";
import { DislikeButton } from "../dislike-button";
import { LikeButton } from "../like-button";

type ActionsProps = {
  loading: boolean;
  handleAction: (action: boolean) => void;
};

export const Actions: FC<ActionsProps> = ({ loading, handleAction }) => {
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
        <LikeButton onClick={() => handleAction(true)} />
        <DislikeButton onClick={() => handleAction(false)} />
      </Grid>
    </>
  );
};
