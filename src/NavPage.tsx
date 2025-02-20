import { Link } from "react-router-dom";

function NavItems() {
  return (
    <div className="flex justify-evenly items-center w-[calc(60%)]">
      <Link
        to="/account"
        className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]"
      >
        Account
      </Link>
      <Link to="/courses">
        <div className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
          Courses
        </div>
      </Link>
      <Link to="/my-notes">
        <div className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
          My Notes
        </div>
      </Link>
      <Link to="/pages">
        <div className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
          Pages
        </div>
      </Link>
    </div>
  );
}

function NavBar() {
  return (
    <div className="fixed w-full flex justify-center">
      <div className="mt-2 w-[calc(90%)] bg-linear-to-br from-green-900 from-10% via-green-700 via-40% to-green-400 to-95% rounded-full shadow-gray-900 shadow-md">
        <div className="px-10 flex text-white  justify-between items-center text-lg font-semibold">
          <div className="flex justify-center items-center text-3xl drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)] cursor-pointer">
            <img src="./logo.png" className="h-20" />
            <h1>Leaflet</h1>
          </div>
          <NavItems />
          <div className="drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
            Profile
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
