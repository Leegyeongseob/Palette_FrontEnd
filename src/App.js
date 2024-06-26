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
import DateClothes from "./pages/dateclothes/DateClothes";
import DatePlanner from "./pages/dateplanner/DatePlanner";
import DateAlbum from "./pages/datealbum/DateAlbum";
import DateDiary from "./pages/datediary/DateDiary";
import DateAlbum2 from "./pages/datealbum/DateAlbum2";
import DateAlbum3 from "./pages/datealbum/DateAlbum3";
import BoardGuestbook from "./pages/board/BoardGuestbook";
import BoardDetails from "./pages/board/BoardDetails";
import BoardWrite from "./pages/board/BoardWrite";
import Modify from "./pages/setting/Modify";
import Withdrawal from "./pages/setting/Withdrawal";
import PalettePage from "./pages/palette/PalettePage";
import GuestBoardGuestbook from "./pages/board/GuestBoardGuestbook";
import GuestBoardDetails from "./pages/board/GuestBoardDetails";
import PaletteHelp from "./pages/palette/PaletteHelp";
import PaletteNotice from "./pages/palette/PaletteNotice";
import PaletteInquiry from "./pages/palette/PaletteInquiry";
import PaletteAd from "./pages/palette/PaletteAd";
import PaletteCustomer from "./pages/palette/PaletteCustomer"
function App() {
  return (
    <>
      {/* 전역스타일적용 */}
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<PalettePage />} />
          <Route path="/customer" element={<PaletteCustomer />} />
          <Route path="/customer/help" element={<PaletteHelp />} />
          <Route path="/customer/inquiry" element={<PaletteInquiry />} />
          <Route path="/customer/ad" element={<PaletteAd />} />
          <Route path="/customer/notice" element={<PaletteNotice />} />
          <Route element={<OpenBook />}>
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/date-clothes" element={<DateClothes />} />
            <Route path="/date-album" element={<DateAlbum />} />
            <Route path="/date-album2" element={<DateAlbum2 />} />
            <Route path="/date-album3" element={<DateAlbum3 />} />
            <Route path="/date-diary" element={<DateDiary />} />
            <Route path="/chat" element={<ChatMain />} />
            <Route path="/dateplanner" element={<DatePlanner />} />
            <Route path="/board-guestbook" element={<BoardGuestbook />} />
            <Route path="/board-details" element={<BoardDetails />} />
            <Route path="/board-write" element={<BoardWrite />} />
            <Route
              path="/guest-board-guestbook"
              element={<GuestBoardGuestbook />}
            />
            <Route
              path="/guest-board-details"
              element={<GuestBoardDetails />}
            />
          </Route>
          <Route element={<CloseBook />}>
            <Route path="/not-login" element={<NotLogin />} />
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/signup-page" element={<SignupPage />} />
            <Route path="/find-email" element={<FindEmail />} />
            <Route path="/find-password" element={<FindPassword />} />
          </Route>
          <Route element={<CloseBook modify={true} />}>
            <Route path="/modify" element={<Modify />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
