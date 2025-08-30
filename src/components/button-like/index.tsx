import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type ButtonLikeProps = {
  onClick: () => void;
};

export const ButtonLike: FC<ButtonLikeProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<FavoriteIcon />}
      size="large"
      onClick={onClick}
      sx={{ flexGrow: 1 }}
    >
      {translate("button.like")}
    </Button>
  );
};
