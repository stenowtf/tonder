import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { NextPerson } from "./components/next-person";
import { translate } from "./i18n";
import { type Person } from "./types/person";

const App = () => {
  const [currentUser, setCurrentUser] = useState<Person | null>(null);

  const init = useCallback(() => {
    import("./api/init").then((mod) => {
      const res = mod.default();
      setCurrentUser(res.currentUser);
    });
  }, []);

  useEffect(() => init(), [init]);

  return (
    <>
      <CssBaseline />
      <Header currentUser={currentUser} />
      {currentUser ? (
        <NextPerson currentUserId={currentUser.id} />
      ) : (
        <div>{translate("error.noUsersAvailable")}</div>
      )}
    </>
  );
};

export default App;
