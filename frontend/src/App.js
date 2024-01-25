import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainBody from "./pages/mainBody";
import RegisterLogin from "./pages/login";
import Error from "./pages/error";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        {/*     <NavLink to="/">
        <p className="">Demo</p>
      </NavLink>
      <NavLink to="*">Demo2</NavLink> */}
        <Routes>
          <Route path="/" element={<MainBody />} />
          <Route path="/registrationlogin" element={<RegisterLogin />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
