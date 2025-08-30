import { Alert, Button } from "@mui/material";
import { type FC } from "react";
import { translate } from "../../i18n";

type ErrorMessageProps = {
  message: string;
  showReload?: boolean;
  onClick?: () => void;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({
  message,
  showReload,
  onClick,
}) => {
  return (
    <Alert
      severity="error"
      action={
        showReload && onClick ? (
          <Button color="inherit" size="small" onClick={onClick}>
            {translate("reload")}
          </Button>
        ) : null
      }
      sx={{ marginTop: 2 }}
    >
      {message}
    </Alert>
  );
};
