import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "../../LandingPage";
import SignInPage from "../../SignInPage";
import SignUpPage from "../../SignUpPage";
import Home from "../../HomePage";
import { AnimatePresence } from "framer-motion";
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/*"
          element={
            <Navigate
              to="/home"
              state={() => {
                console.log(location.state);
                return location.state;
              }}
            />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
