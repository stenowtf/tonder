import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type ButtonDislikeProps = {
  onClick: () => void;
};

export const ButtonDislike: FC<ButtonDislikeProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<NotInterestedIcon />}
      size="large"
      onClick={onClick}
      sx={{ flexGrow: 1 }}
    >
      {translate("button.dislike")}
    </Button>
  );
};
