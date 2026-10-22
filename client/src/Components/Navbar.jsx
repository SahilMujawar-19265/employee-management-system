// import { NavLink } from "react-router-dom";
// import { NavLink, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h2 className="text-xl font-bold text-slate-800">
        Employee Management System
      </h2>

      {/* <NavLink
        to="/login"
        className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
      >
        Login
      </NavLink> */}

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
      >
        Logout
      </button>

    </header>
  );
}

export default Navbar;





























// import { NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav>
//       <h2>Employee Management System</h2>

//       <NavLink to="/login">Login</NavLink>
//     </nav>
//   );
// }

// export default Navbar;









// function Navbar() {
//     return (
//         <nav>
//             <h2>Employee Management System</h2>
//         </nav>
//     );
// }

// export default Navbar;