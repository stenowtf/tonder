import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type DialogNoMoreProfilesProps = {
  open: boolean;
  onClick: () => void;
};

export const DialogNoMoreProfiles: FC<DialogNoMoreProfilesProps> = ({
  open,
  onClick,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-no-more-profiles-title"
      aria-describedby="dialog-no-more-profiles-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-no-more-profiles-title">
        {translate("noMoreProfiles.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-no-more-profiles-description">
          {translate("noMoreProfiles.description1")}
          <br />
          {translate("noMoreProfiles.description2")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClick}>
          {translate("noMoreProfiles.cta")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
