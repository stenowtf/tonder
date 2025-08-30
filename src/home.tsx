import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ErrorMessage } from "./components/error-message";
import { Header } from "./components/header";
import { Loader } from "./components/loader";
import { NextPerson } from "./components/next-person";
import { translate } from "./i18n";
import { type Person } from "./types/person";

const App = () => {
  const [currentUser, setCurrentUser] = useState<Person | undefined | null>(
    undefined
  );

  const init = useCallback(() => {
    import("./api/init").then((mod) => {
      const res = mod.default();
      setCurrentUser(res.currentUser);
    });
  }, []);

  useEffect(() => init(), [init]);

  if (currentUser === undefined) {
    return <Loader />;
  }

  return (
    <>
      <CssBaseline />
      <Header
        currentUserName={currentUser?.name}
        currentUserPhoto={currentUser?.photo}
      />
      <Container maxWidth="xs">
        {currentUser ? (
          <NextPerson
            currentUserId={currentUser.id}
            currentUserName={currentUser.name}
            currentUserPhoto={currentUser.photo}
          />
        ) : (
          <ErrorMessage
            message={translate("error.noUsersAvailable")}
            showReload
            onClick={init}
          />
        )}
        <Toaster />
      </Container>
    </>
  );
};

export default App;
