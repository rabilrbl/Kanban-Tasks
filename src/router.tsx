import React from "react";
import { useRoutes, usePath } from "raviger";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Container from "./components/Container";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import Logout from "./pages/Logout";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/logout": () => <Logout />,
  "/signup": () => <Signup />,
};

const renderNav = (path: string) => {
  const hideNavPages = ["signup", "login"];
  if (hideNavPages.includes(path)) {
    return null;
  }
  return <NavBar />;
};

function App() {
  let route = useRoutes(routes);
  const path = usePath("/");
  return (
    <>
      <Container>
        {renderNav(path!)}
        {route || <PageNotFound />}
      </Container>
    </>
  );
}

export default App;
