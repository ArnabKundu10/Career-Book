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
  const [statusBg, setStatusBg] = useState(0);
  const [goaldata, setGoalData] = useState([]);
  const [status, setStatus] = useState(true);
  const [editdisplay, setEditDisplay] = useState(-1);
  return {
    setListNum,
    listnum,
    setRegister,
    registerdata,
    logindata,
    setLogin,
    statusBg,
    setStatusBg,
    goaldata,
    setGoalData,
    status,
    setStatus,
    editdisplay,
    setEditDisplay,
  };
};
export { SelectListHook };
