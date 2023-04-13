import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ToDo from "./ToDo";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/to-do" element={<ToDo />} />
      </Routes>
      {/* <Login /> */}
    </>
  );
}

export default App;
