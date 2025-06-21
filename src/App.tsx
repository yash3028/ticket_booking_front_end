import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./components/Booking";
import UserSign from "./components/UserSign";
import AgentSign from "./components/AgentSign";
import ProtectedRoute from "./components/protected_routes";
import SearchBus from "./components/SearchBus";
import TabForm from "./components/TabFom";
import AgnetTab from "./components/AgentTab";
import AgentHome from "./components/AgentHome";
import MyBookings from "./components/Mybookings";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/agenthome" element={<AgnetTab  />} />
          </Route>
          <Route path="/" element={<Booking />} />
          <Route path="/login-options" element={<TabForm />} />
          {/* <Route path="/user-login" element={<UserLogin />} /> */}
          <Route path="/usersign" element={<UserSign />} />
          {/* <Route path="/agent-login" element={<AgentLogin />} /> */}
          <Route path="/agentsign" element={<AgentSign />} />
          <Route path="/bus-result" element={<SearchBus />} />
          <Route path="/agent/edit" element={<AgentHome />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
