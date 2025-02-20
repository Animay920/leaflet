import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./assets/components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
// export { auth };
// export { setAuth };
