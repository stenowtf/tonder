import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../i18n";

type DislikeButtonProps = {
  onClick: () => void;
};

export const DislikeButton: FC<DislikeButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<NotInterestedIcon />}
      size="large"
      onClick={onClick}
    >
      {translate("dislike")}
    </Button>
  );
};
