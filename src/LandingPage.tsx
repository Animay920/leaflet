import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function LandingPage() {
  return (
    <motion.div
      className="home static bg-black h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: "-100vw", transition: { duration: 0.2 } }}
    >
      <div className="z-1 absolute top-0 w-full blur-2xl">
        <img src="./bg.jpg" className="h-screen w-full" />
      </div>
      <div className="z-2 h-[calc(70%)] absolute top-20 w-full flex flex-col justify-center items-center">
        <img src="./logo.png" className="z-0 h-140" />

        <h1 className=" text-white text-7xl tracking-wide font-bold drop-shadow-[0px_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Leaflet
        </h1>
        <div className="text-white font-semibold text-lg m-4">
          A Collaborative Note Taking App Like No Other
        </div>
        <div className="flex w-full justify-center gap-20 text-xl text-white font-semibold m-15">
          <Link to="/signin">
            <button className="border-3 py-2 px-8 border-white rounded-3xl cursor-pointer hover:bg-green-700 hover:border-green-800">
              SIGN IN
            </button>
          </Link>
          <Link to="/signup">
            <button className="border-3 py-2 px-8 border-white rounded-3xl cursor-pointer hover:bg-green-700 hover:border-green-800">
              SIGN UP
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default LandingPage;
