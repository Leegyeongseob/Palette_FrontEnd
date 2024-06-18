import "./App.css";
import OpenBook from "./common/background/OpenBook";
import CloseBook from "./common/background/CloseBook";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import NotLogin from "./pages/main/NotLogin";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignupPage";
import FindEmail from "./pages/login/FindEmail";
import FindPassword from "./pages/login/FindPassword";
import ChatMain from "./pages/chat/chat";

import GlobalStyle from "./global/GlobalStyle";
function App() {
  return (
    <>
      {/* 전역스타일적용 */}
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<OpenBook />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/chat" element={<ChatMain />}></Route>
          </Route>
          <Route element={<CloseBook />}>
            <Route path="/not-login" element={<NotLogin />} />
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
