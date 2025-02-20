import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function SignInPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const navigate = useNavigate();
  const [givenUser, setGivenUser] = useState("");
  const [givenPass, setGivenPass] = useState("");
  const [credsCorrect, setCredsCorrect] = useState("hidden");
  const [bennettEmail, setBennettEmail] = useState("hidden");
  function Login() {
    const username = "admin@bennett.edu.in";
    const password = "123456";
    if (!givenUser.endsWith("@bennett.edu.in")) setBennettEmail("");
    else if (givenUser == username && givenPass == password)
      navigate("/home", { state: "fromApp" });
    else {
      setBennettEmail("hidden");
      setCredsCorrect("");
    }
  }
  return (
    <motion.div
      className="static flex h-screen"
      initial={{ x: "60%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw", transition: { duration: 0.2 } }}
    >
      <div className="bg-black w-[calc(60%)]">
        <div className="h-screen blur-2xl">
          <img src="./bg.jpg" className="h-screen w-full" />
        </div>
        <div className="absolute w-[calc(60%)] top-0 flex flex-col items-center mt-50">
          <img src="/logo.png" className="h-90" />
          <h1 className=" text-white text-7xl tracking-wide font-bold drop-shadow-[0px_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Leaflet
          </h1>
          <div className="text-white font-semibold text-lg m-4">
            A Collaborative Note Taking App Like No Other
          </div>
        </div>
      </div>
      <div className="flex min-w-[calc(40%)] justify-center items-center">
        <section className="grid text-center max-w-[calc(60%)] items-center px-10 py-30 border-2 h-fit rounded-2xl border-gray-100 shadow-2xl">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Sign Up
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign up
            </Typography>
            <form action="#" className="mx-auto max-w-[24rem] text-left">
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Your Email
                  </Typography>
                </label>
                <div className={bennettEmail}>
                  <p className="text-red-500 text-sm -mt-2 mb-1">
                    Please use a bennett email
                  </p>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="abc@example.com"
                  onChange={(val) => setGivenUser(val.target.value)}
                  className="border-black border-1 rounded-md p-2 w-full focus:border-2"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Password
                  </Typography>
                </label>
                <div className="flex items-center border-black border-1 rounded-md w-full focus:border-2">
                  <input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    placeholder="******"
                    className="w-full p-2"
                    onChange={(val) => setGivenPass(val.target.value)}
                  />
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5 m-2" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 m-2" />
                    )}
                  </i>
                </div>
              </div>
              <div className={credsCorrect}>
                <p className="text-red-500 text-sm -my-4">
                  Incorrect username or password
                </p>
              </div>
              <Button
                color="gray"
                size="lg"
                className="mt-6"
                fullWidth
                onClick={Login}
              >
                sign up
              </Button>
              <Typography
                variant="small"
                color="gray"
                className="!mt-4 text-center font-normal"
              >
                Already registered?{" "}
                <Link to="/signin" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </form>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default SignInPage;
