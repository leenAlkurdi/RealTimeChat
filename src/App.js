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
import { Suspense } from "react";
import Loading from "./components/Loading";
import Profile from "./components/Profile";
// const Login = lazy(() => import("./Components/Login"));
// const Register = lazy(() => import("./components/Register"));
// const Profile = lazy(() => import("./components/Profile"));
// const Chats = lazy(() => import("./Components/Chats"));
// const Contactas = lazy(() => import("./Components/Contacts"));
// const Setting = lazy(() => import("./Components/Setting"));
import Chats from "./components/Chats";
import Setting from "./components/Settings";
import Register from "./components/Register";
import Login from "./components/Login";
import Contacts from "./components/Contacts";

export default function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route element={<SuspenseLayout />}>
          <Route path="/" element={<Profile />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/settings" element={<Setting />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
const SuspenseLayout = () => (
  <Suspense fallback={<Loading />}>
    <Outlet />
  </Suspense>
);
