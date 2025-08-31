import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { type FC } from "react";
import { translate } from "../../i18n";

import styles from "./styles.module.css";

type HeaderProps = {
  currentUserName: string | undefined;
  currentUserPhoto: string | undefined;
};

export const Header: FC<HeaderProps> = ({
  currentUserName,
  currentUserPhoto,
}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            noWrap
            className={styles.title}
            role="heading"
          >
            {translate("title")}
          </Typography>

          {currentUserName && currentUserPhoto && (
            <Box className={styles.userBox}>
              <Typography noWrap component="div" variant="body1">
                {currentUserName}
              </Typography>
              <Avatar
                alt={`${translate("profileAlt")} ${currentUserName}`}
                src={currentUserPhoto}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
