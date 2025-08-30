import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { type FC } from "react";
import { translate } from "../../i18n";
import type { Person } from "../../types/person";

import styles from "./styles.module.css";

type HeaderProps = {
  currentUser: Person | null;
};

export const Header: FC<HeaderProps> = ({ currentUser }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            noWrap
            className={styles.title}
          >
            {translate("title")}
          </Typography>

          {currentUser && (
            <Box className={styles.userBox}>
              <Typography noWrap component="div" variant="body1">
                {currentUser.name}
              </Typography>
              <Avatar alt={currentUser.name} src={currentUser.photo} />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
