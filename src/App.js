// import { BrowserRouter as Router } from "react-router-dom";

// import "./index.css";
// import Main from "./Main";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Main/>
//       </Router>

//     </div>
//   );
// }

// export default App;

import { Outlet, Route, Routes } from "react-router-dom";

import Root from "./components/Root";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("./components/Profile"));
const Chats = lazy(() => import("./components/Chats"));
const Chat = lazy(() => import("./components/Chat"));
const Contacts = lazy(() => import("./components/Contacts"));
const Setting = lazy(() => import("./components/Settings"));
// import Profile from "./components/Profile";
// import Chats from "./components/Chats";
// import Setting from "./components/Settings";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Contacts from "./components/Contacts";
// import Chat from "./components/Chat";

export default function App() {
  return (
    <Routes>
      <Route element={<SuspenseLayout />}>
        <Route element={<Root />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Profile />} />
            <Route path="chats" element={<Chats />}>
              <Route path=":phone" element={<Chat />} />
            </Route>
            <Route path="contacts" element={<Contacts />} />
            <Route path="settings" element={<Setting />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}
const SuspenseLayout = () => (
  <Suspense fallback={<Loading />}>
    <Outlet />
  </Suspense>
);
