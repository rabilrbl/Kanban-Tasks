import React from "react";
import { useRoutes, usePath } from "raviger";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Container from "./components/Container";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import Logout from "./pages/Logout";
import HomeIcon from "./components/icons/HomeIcon";
import Category from "./components/icons/Category";
import TaskSquare from "./components/icons/TaskSquare";
import HorizNavBar from "./components/HorizNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Boards from "./pages/Boards";
import Board from "./pages/Board";
import Todo from "./pages/Todo";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/logout": () => <Logout />,
  "/signup": () => <Signup />,
  "/boards": () => <Boards />,
  "/board/:id": ({id}: {id:string}) => <Board id={Number(id)} />,
  "/todo": () => <Todo />,
};

const navLinks = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon h="16" w="16" />,
  },
  {
    name: "Boards",
    path: "/boards",
    icon: <Category h="16" w="16" />,
  },
  {
    name: "To Do",
    path: "/todo",
    icon: <TaskSquare h="20" w="20" />,
  },
];

const hideNavBar = (path: string) => {
  const hideNavPages = ["signup", "login"];
  if (hideNavPages.includes(path)) {
    return false;
  }
  return true;
};
function App() {
  let route = useRoutes(routes);
  const path = usePath("/");
  const hideNav = hideNavBar(path!);

  return (
    <>
      <div className="flex">
        {hideNav && <NavBar navLinks={navLinks} />}
        <div className="flex-auto">
          {hideNav && <HorizNavBar />}
          <Container>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              style={{marginTop: "3rem"}}
              limit={3}
            />
            {route || <PageNotFound />}
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
