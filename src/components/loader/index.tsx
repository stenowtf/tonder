import { Backdrop, CircularProgress } from "@mui/material";
import { type FC } from "react";

export const Loader: FC = () => {
  return (
    <Backdrop style={{ color: "#ffffff" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
