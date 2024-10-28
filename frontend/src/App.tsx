import "./index.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {authUser, isLoading} = useAuthContext();

  if (isLoading) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"}/>}></Route>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />}></Route>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"} />}></Route>
      </Routes>
    </>
  );
}

export default App;
