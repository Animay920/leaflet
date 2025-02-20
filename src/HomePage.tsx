import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavPage";
import { useEffect } from "react";
import { motion } from "framer-motion";
function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (!(location.state == "fromApp")) navigate("/", { replace: true });
  });
  return (
    <motion.div
      initial={{ x: "60%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw", transition: { duration: 0.2 } }}
      className="bg-black"
    >
      <div className="">
        <img src="bg.jpg" className="w-screen h-screen blur-2xl" />
      </div>
      <div className="absolute top-0">
        <NavBar />
      </div>
    </motion.div>
  );
}

export default Home;
