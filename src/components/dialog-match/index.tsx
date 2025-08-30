import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type DialogMatchProps = {
  open: boolean;
  personAName: string;
  personAPhoto: string;
  personBName: string;
  personBPhoto: string;
  setOpen: (open: boolean) => void;
};

export const DialogMatch: FC<DialogMatchProps> = ({
  open,
  personAName,
  personAPhoto,
  personBName,
  personBPhoto,
  setOpen,
}) => {
  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {translate("match.itsAMatch")}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {translate("match.youAnd")}
          <strong> {personBName} </strong>
          {translate("match.haveLikedEachOther")}
        </Typography>
        <Box display="flex" gap={1} flexDirection="row">
          <Box flex={1}>
            <img
              src={personAPhoto}
              alt={personAName}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
          <Box flex={1}>
            <img
              src={personBPhoto}
              alt={personBName}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus>{translate("match.startChatting")}</Button>
      </DialogActions>
    </Dialog>
  );
};
