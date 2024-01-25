import { useState } from "react";
const SelectListHook = () => {
  const [listnum, setListNum] = useState(0);
  const [registerdata, setRegister] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [logindata, setLogin] = useState({
    email: "",
    confirmpassword: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));
  return {
    setListNum,
    listnum,
    setRegister,
    registerdata,
    logindata,
    setLogin,
    token,
    setToken,
  };
};
export { SelectListHook };
