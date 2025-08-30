import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type LikeButtonProps = {
  onClick: () => void;
};

export const LikeButton: FC<LikeButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<FavoriteIcon />}
      size="large"
      onClick={onClick}
    >
      {translate("like")}
    </Button>
  );
};
