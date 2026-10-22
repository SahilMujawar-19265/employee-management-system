import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h3 className="text-xl font-bold mb-8">
        Menu
      </h3>

      <nav>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employees"
              className="block px-4 py-3 rounded-lg hover:bg-slate-700"
            >
              Employees
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;













// import { NavLink } from "react-router-dom";

// function Sidebar() {
//   return (
//     <aside>
//       <h3>Menu</h3>

//       <nav>
//         <ul>
//           <li>
//             <NavLink to="/">Dashboard</NavLink>
//           </li>

//           <li>
//             <NavLink to="/employees">Employees</NavLink>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;




























// // function Sidebar() {
// //     return (
// //         <aside>
// //             <h3>Menu</h3>

// //             <nav>
// //                 <ul>
// //                     <li>Dashboard</li>
// //                     <li>Employees</li>
// //                     <li>Department</li>
// //                 </ul>
// //             </nav>
// //         </aside>
// //     );
// // }

// // export default Sidebar;