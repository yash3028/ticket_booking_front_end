import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./components/Booking";
import AgentLogin from "./components/AgentLogin";
import LoginOptions from "./components/LoginOptions";
import UserLogin from "./components/UserLogin";
import UserSign from "./components/UserSign";
import AgentSign from "./components/AgentSign";
import AgentHome from "./components/AgentHome";
import ProtectedRoute from "./components/protected_routes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/agenthome" element={<AgentHome />}/>
        </Route>
        <Route path="/" element={<Booking />}/>
          <Route path="/login-options" element={<LoginOptions />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/usersign" element={<UserSign />} />
          <Route path="/agent-login" element={<AgentLogin />} />
          <Route path="/agentsign" element={<AgentSign />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
