import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type ButtonLikeProps = {
  disabled?: boolean;
  onClick: () => void;
};

export const ButtonLike: FC<ButtonLikeProps> = ({
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<FavoriteIcon />}
      size="large"
      onClick={onClick}
      sx={{ flexGrow: 1 }}
      disabled={disabled}
      aria-label={translate("button.like")}
    >
      {translate("button.like")}
    </Button>
  );
};
