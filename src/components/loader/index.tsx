import { Backdrop, CircularProgress } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

export const Loader: FC = () => {
  return (
    <Backdrop
      style={{ color: "#ffffff" }}
      open={true}
      aria-busy="true"
      aria-label={translate("loading")}
    >
      <CircularProgress color="inherit" data-testid="progressbar" />
    </Backdrop>
  );
};
