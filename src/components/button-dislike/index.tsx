import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type ButtonDislikeProps = {
  disabled?: boolean;
  onClick: () => void;
};

export const ButtonDislike: FC<ButtonDislikeProps> = ({
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<NotInterestedIcon />}
      size="large"
      onClick={onClick}
      sx={{ flexGrow: 1 }}
      disabled={disabled}
      aria-label={translate("button.dislike")}
    >
      {translate("button.dislike")}
    </Button>
  );
};
