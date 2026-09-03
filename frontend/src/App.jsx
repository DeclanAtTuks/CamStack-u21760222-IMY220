//u21670022
import PostP from "./pages/PostP";
import Home from "./pages/Home";
import ProfileP from "./pages/ProfileP";
import Navigation from "./components/Navigation";
import NotFound from './pages/NotFound';
import Splash from "./pages/Splash";
import Feed from "./components/Feed";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

function AppRoutes() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <Navigation />}
      <main>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/global" element={<Feed title="Global" />} />
          <Route path="/friends" element={<Feed title="Friends" />} />
          <Route path="/profile" element={<ProfileP />} />
          <Route path="/post/:id" element={<PostP />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;