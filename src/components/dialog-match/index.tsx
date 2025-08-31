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
  handleBack: () => void;
};

export const DialogMatch: FC<DialogMatchProps> = ({
  open,
  personAName,
  personAPhoto,
  personBName,
  personBPhoto,
  handleBack,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="dialog-match-title"
      aria-describedby="dialog-match-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="dialog-match-title">
        {translate("match.title")}
      </DialogTitle>
      <DialogContent dividers id="dialog-match-description">
        <Typography gutterBottom>
          {translate("match.message1")}
          <strong> {personBName} </strong>
          {translate("match.message2")}
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
        <Box
          display="flex"
          flexDirection={{ xs: "column-reverse", sm: "row" }}
          justifyContent="space-between"
          width="100%"
          gap={1}
        >
          <Button
            variant="text"
            sx={{ sm: { width: "auto", flex: 1 } }}
            onClick={handleBack}
          >
            {translate("match.ctaBack")}
          </Button>
          <Button
            variant="contained"
            autoFocus
            sx={{ sm: { width: "auto", flex: 1 } }}
          >
            {translate("match.ctaStart")}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
