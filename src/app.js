"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
var Navbar_1 = require("./components/Navbar");
var react_router_dom_1 = require("react-router-dom");
var Booking_1 = require("./components/Booking");
var AgentLogin_1 = require("./components/AgentLogin");
var LoginOptions_1 = require("./components/LoginOptions");
var UserLogin_1 = require("./components/UserLogin");
var UserSign_1 = require("./components/UserSign");
var AgentSign_1 = require("./components/AgentSign");
function App() {
    return (<>
      <react_router_dom_1.BrowserRouter>
        <Navbar_1.default />
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Booking_1.default />}/>
          <react_router_dom_1.Route path="/login-options" element={<LoginOptions_1.default />}/>
          <react_router_dom_1.Route path="/user-login" element={<UserLogin_1.default />}/>
          <react_router_dom_1.Route path="/usersign" element={<UserSign_1.default />}/>
          <react_router_dom_1.Route path="/agent-login" element={<AgentLogin_1.default />}/>
          <react_router_dom_1.Route path="/agentsign" element={<AgentSign_1.default />}/>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </>);
}
exports.default = App;
