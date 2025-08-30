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
};

export const DialogMatch: FC<DialogMatchProps> = ({
  open,
  personAName,
  personAPhoto,
  personBName,
  personBPhoto,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-match-title"
      aria-describedby="dialog-match-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-match-title">
        {translate("match.itsAMatch")}
      </DialogTitle>
      <DialogContent dividers id="dialog-match-description">
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
        <Button variant="text">{translate("match.back")}</Button>
        <Button variant="outlined" autoFocus>
          {translate("match.startChatting")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
