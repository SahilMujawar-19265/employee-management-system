// import { Users } from "lucide-react";
// import { Users, UserCheck, UserX, Building2 } from "lucide-react";
import { Users, UserCheck, UserX, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // fetch("http://localhost:5000/api/employees")

        fetch("http://localhost:5000/api/employees", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

            // .then((response) => response.json())
            // .then((data) => {
            //     setEmployees(data.employees);
            //     setIsLoading(false);
            // })

            .then((response) => {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return null;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }

                return response.json();
            })

            // .then((data) => {
            //     setEmployees(data.employees);
            //     setIsLoading(false);
            // })

            .then((data) => {
                if (data === null) {
                    return;
                }
                setEmployees(data.employees);
                setIsLoading(false);
            })

            .catch((error) => {
                console.error("Failed to fetch employees:", error);
                setErrorMessage(
                    "Unable to load dashboard data. Please check your connection and try again."
                );
                setIsLoading(false);
            });
    }, [navigate]);

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        (employee) => employee.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        (employee) => employee.status === "Inactive"
    ).length;

    const departments = new Set(
        employees.map((employee) => employee.department)
    ).size;

    const recentEmployees = [...employees]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const departmentCounts = {};

    employees.forEach((employee) => {
        if (departmentCounts[employee.department]) {
            departmentCounts[employee.department]++;
        } else {
            departmentCounts[employee.department] = 1;
        }
    });

    return (
        <section>
            <h1 className="text-3xl font-bold text-slate-800">
                Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
                Welcome to the Employee Management System.
            </p>

            {errorMessage && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </div>
            )}

            {isLoading && (
                <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                    Loading dashboard data...
                </div>
            )}

            {!isLoading && !errorMessage && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Users size={26} className="text-blue-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mt-3">
                            {totalEmployees}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Total Employees
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <UserCheck size={26} className="text-green-600" />
                        </div>


                        <h2 className="text-3xl font-bold text-slate-800 mt-3">
                            {activeEmployees}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Active Employees
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                            <UserX size={26} className="text-red-600" />
                        </div>


                        <h2 className="text-3xl font-bold text-slate-800 mt-3">
                            {inactiveEmployees}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Inactive Employees
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Building2 size={26} className="text-purple-600" />
                        </div>


                        <h2 className="text-3xl font-bold text-slate-800 mt-3">
                            {departments}
                        </h2>

                        <p className="mt-1 text-slate-500">
                            Departments
                        </p>
                    </div>

                </div>
            )}

            <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        Department Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Employees by department
                    </p>
                </div>

                <div className="p-6">
                    {!isLoading && !errorMessage && Object.keys(departmentCounts).length === 0 ? (
                        <p className="text-sm text-slate-500">
                            No departments to display yet.
                        </p>
                    ) : (
                        !isLoading &&
                        !errorMessage &&
                        Object.keys(departmentCounts).map((department) => (
                            <div
                                key={department}
                                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0"
                            >
                                <span className="text-sm font-medium text-slate-700">
                                    {department}
                                </span>

                                <span className="text-sm font-semibold text-slate-800">
                                    {departmentCounts[department]}
                                </span>
                            </div>
                        ))
                    )}
                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                            {Object.keys(departmentCounts)[0]}
                        </span>

                        <span className="text-sm font-semibold text-slate-800">
                            {departmentCounts.IT || 0}
                        </span>
                    </div> */}
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        Recent Employees
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Recently added employees
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Position
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-slate-500"
                                    >
                                        Loading employees...
                                    </td>
                                </tr>
                                // ) : !errorMessage && recentEmployees.length === 0 ? (
                                //     <tr>
                                //         <td
                                //             colSpan="5"
                                //             className="px-6 py-8 text-center text-slate-500"
                                //         >
                                //             No employees found.
                                //         </td>
                                //     </tr>
                                // ) : ( 

                            ) : errorMessage ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-red-500"
                                    >
                                        Unable to load employees.
                                    </td>
                                </tr>
                            ) : recentEmployees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-slate-500"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                recentEmployees.map((employee) => (
                                    <tr key={employee._id} className="border-b border-slate-200">
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {employee.name}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {employee.email}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {employee.department}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {employee.position}
                                        </td>

                                        <td className="px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${employee.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {employee.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {/* <tr className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm text-slate-800">
                                    Rahul Sharma
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500">
                                    rahul@example.com
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500">
                                    IT
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-500">
                                    Software Developer
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                        Active
                                    </span>
                                </td>
                            </tr> */}

                        </tbody>
                    </table>

                    <div className="p-6 border-t border-slate-200">
                        <NavLink
                            to="/employees"
                            className="inline-block px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700"
                        >
                            View All Employees
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;









// function Dashboard() {
//   return (
//     <section>
//       <h1 className="text-3xl font-bold text-slate-800">
//         Dashboard
//       </h1>

//       <p className="mt-2 text-slate-500">
//         Welcome to the Employee Management System.
//       </p>
//     </section>
//   );
// }

// export default Dashboard;





















// function Dashboard() {
//     return (
//         <main>
//             <h1>DashBoard</h1>

//             <p>Welcome To the Employee Managemet System</p>

//             <div>
//                 <h2>0</h2>
//                 <p>Total Employees</p>
//             </div>
//         </main>
//     );
// }

// export default Dashboard;