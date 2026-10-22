// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { Eye, Pencil, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    const [editingEmployee, setEditingEmployee] = useState(null);
    const [viewingEmployee, setViewingEmployee] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        position: "",
        status: "Active",
    });

    useEffect(() => {
        // fetch("http://localhost:5000/api/employees")

        fetch("http://localhost:5000/api/employees", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })


            // .then((response) => response.json())

            // .then((response) => {
            //     if (!response.ok) {
            //         throw new Error("Failed to fetch employees");
            //     }

            //     return response.json();
            // })

            .then((response) => {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return null;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch employees");
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
                    "Unable to load employees. Please check your connection and try again."
                );

                setIsLoading(false);
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            if (editingEmployee) {
                const response = await fetch(
                    `http://localhost:5000/api/employees/${editingEmployee._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(formData),
                    }
                );

                const data = await response.json();

                // if (!response.ok) {
                //     console.error(data);
                //     return;
                // }


                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return;
                }

                if (!response.ok) {
                    setErrorMessage(data.message);
                    return;
                }

                setEmployees(
                    employees.map((employee) =>
                        employee._id === editingEmployee._id
                            ? data.employee
                            : employee
                    )
                );

                setEditingEmployee(null);
            } else {
                const response = await fetch("http://localhost:5000/api/employees", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                // if (!response.ok) {
                //     console.error(data);
                //     return;
                // }


                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return;
                }


                if (!response.ok) {
                    setErrorMessage(data.message);
                    return;
                }

                setEmployees([...employees, data.employee]);
            }

            setFormData({
                name: "",
                email: "",
                department: "",
                position: "",
                status: "Active",
            });
        } catch (error) {
            console.error("Failed to save employee:", error);

            setErrorMessage(
                "Unable to save employee. Please check your connection and try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // const filteredEmployees = employees.filter((employee) =>
    //     employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch = employee.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesDepartment =
            departmentFilter === "" ||
            employee.department === departmentFilter;

        return matchesSearch && matchesDepartment;
    });

    const indexOfLastEmployee = currentPage * employeesPerPage;

    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

    const currentEmployees = filteredEmployees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    const totalPages = Math.ceil(
        filteredEmployees.length / employeesPerPage
    );

    // const departmentsList = [
    //     ...new Set(employees.map((employee) => employee.department)),
    // ];
    const departmentsList = useMemo(
        () => [...new Set(employees.map((employee) => employee.department))],
        [employees]
    );

    useEffect(() => {
        if (
            departmentFilter !== "" &&
            !departmentsList.includes(departmentFilter)
        ) {
            setDepartmentFilter("");
        }
    }, [employees, departmentFilter, departmentsList]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, departmentFilter]);

    return (
        <section>

            {viewingEmployee && (
                <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-slate-800">
                        Employee Details
                    </h2>

                    {/* <p className="mt-2 text-slate-600">
                        Name: {viewingEmployee.name}
                    </p> */}

                    <p className="mt-3 text-slate-600">
                        <span className="font-medium text-slate-800">
                            Name :
                        </span>{" "}
                        {viewingEmployee.name}
                    </p>

                    {/* <p className="mt-2 text-slate-600">
                        Email: {viewingEmployee.email}
                    </p> */}

                    <p className="mt-3 text-slate-600">
                        <span className="font-medium text-slate-800">
                            Email :
                        </span>{" "}
                        {viewingEmployee.email}
                    </p>

                    {/* <p className="mt-2 text-slate-600">
                        Department: {viewingEmployee.department}
                    </p> */}
                    <p className="mt-3 text-slate-600">
                        <span className="font-medium text-slate-800">
                            Department :
                        </span>{" "}
                        {viewingEmployee.department}
                    </p>

                    {/* <p className="mt-2 text-slate-600">
                        Position: {viewingEmployee.position}
                    </p> */}

                    <p className="mt-3 text-slate-600">
                        <span className="font-medium text-slate-800">
                            Position :
                        </span>{" "}
                        {viewingEmployee.position}
                    </p>

                    {/* <p className="mt-2 text-slate-600">
                        Status: {viewingEmployee.status}
                    </p> */}

                    <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-600">
                                Status :
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${viewingEmployee.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {viewingEmployee.status}
                            </span>
                        </div>

                        <button
                            onClick={() => setViewingEmployee(null)}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* {viewingEmployee && (
                <p className="mt-4 text-green-600">
                    Selected employee: {viewingEmployee.name}
                </p>
            )} */}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Employees
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your employee records.
                    </p>
                </div>

                {/* <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700">
                    Add Employee
                </button> */}

                <button
                    // onClick={() => {
                    //     document.getElementById("employee-form").scrollIntoView({
                    //         behavior: "smooth",
                    //     });
                    // }}
                    onClick={() => {
                        setShowForm(true);

                        setErrorMessage("");

                        setTimeout(() => {
                            document.getElementById("employee-form").scrollIntoView({
                                behavior: "smooth",
                            });
                        }, 0);
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700"
                >
                    Add Employee
                </button>
            </div>

            {errorMessage && !showForm && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </div>
            )}

            <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-4">

                    {/* <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}

                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pr-20 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-800"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select> */}

                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Departments</option>

                        {departmentsList.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            {/* <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6"> */}
            {showForm && (
                <div
                    id="employee-form"
                    className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
                >
                    <h2 className="text-lg font-semibold text-slate-800">
                        {editingEmployee ? "Edit Employee" : "Add New Employee"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter the employee information below.
                    </p>

                    {/* {errorMessage && (
                        <p className="mb-4 text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )} */}

                    {errorMessage && (
                        <div className="mt-4 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"  // something@something.something
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Department
                            </label>

                            <select
                                value={formData.department}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        department: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Operations">Operations</option>
                                <option value="Administration">Administration</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="QA / Testing">QA / Testing</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Position
                            </label>

                            <input
                                type="text"
                                placeholder="Enter position"
                                value={formData.position}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        position: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Status
                            </label>

                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end items-center gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700"
                            >
                                {/* {editingEmployee ? "Update Employee" : "Add Employee"} */}
                                {isSubmitting
                                    ? "Saving..."
                                    : editingEmployee
                                        ? "Update Employee"
                                        : "Add Employee"}
                            </button>

                            {showForm && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setErrorMessage("");

                                        setEditingEmployee(null);

                                        setFormData({
                                            name: "",
                                            email: "",
                                            department: "",
                                            position: "",
                                            status: "Active",
                                        });
                                    }}
                                    className="px-5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            )}

            <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    #
                                </th>

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

                                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-8 text-center text-slate-500"
                                    >
                                        Loading employees...
                                    </td>
                                </tr>

                                // ) : currentEmployees.length === 0 ? (    

                            ) : !errorMessage && currentEmployees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-4 py-8 text-center text-slate-500"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                // filteredEmployees.map((employee, index) => (

                                currentEmployees.map((employee, index) => (
                                    <tr
                                        key={employee._id}
                                        className="border-b border-slate-200 hover:bg-slate-50"
                                    >
                                        {/* <td className="px-4 py-3 text-slate-400 text-sm">{index + 1}</td> */}

                                        <td className="px-4 py-3 text-slate-400 text-sm">
                                            {indexOfFirstEmployee + index + 1}
                                        </td>

                                        <td className="px-4 py-3">{employee.name}</td>

                                        <td className="px-4 py-3">{employee.email}</td>

                                        <td className="px-4 py-3">{employee.department}</td>

                                        <td className="px-4 py-3">{employee.position}</td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${employee.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {employee.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    // onClick={() => console.log(employee)}
                                                    onClick={() => setViewingEmployee(employee)}
                                                    className="text-slate-500 hover:text-slate-800"
                                                    title="View employee"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setShowForm(true);
                                                        setErrorMessage("");

                                                        setEditingEmployee(employee);

                                                        setFormData({
                                                            name: employee.name,
                                                            email: employee.email,
                                                            department: employee.department,
                                                            position: employee.position,
                                                            status: employee.status,
                                                        });
                                                    }}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit employee"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                <button
                                                    onClick={async () => {
                                                        if (!window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
                                                            return;
                                                        }
                                                        try {
                                                            const response = await fetch(
                                                                `http://localhost:5000/api/employees/${employee._id}`,
                                                                {
                                                                    method: "DELETE",
                                                                    headers: {
                                                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                                                    },
                                                                }
                                                            );

                                                            const data = await response.json();

                                                            // if (!response.ok) {
                                                            //     console.error(data);
                                                            //     return;
                                                            // }


                                                            if (response.status === 401) {
                                                                localStorage.removeItem("token");
                                                                localStorage.removeItem("user");

                                                                navigate("/login");

                                                                return;
                                                            }


                                                            if (!response.ok) {
                                                                setErrorMessage(data.message);
                                                                return;
                                                            }

                                                            // setErrorMessage("");

                                                            // setEmployees(
                                                            //     employees.filter((item) => item._id !== employee._id)
                                                            // );

                                                            setErrorMessage("");

                                                            const updatedEmployees = employees.filter(
                                                                (item) => item._id !== employee._id
                                                            );

                                                            setEmployees(updatedEmployees);

                                                            const updatedTotalPages = Math.ceil(
                                                                updatedEmployees.length / employeesPerPage
                                                            );

                                                            setCurrentPage((page) =>
                                                                Math.min(page, Math.max(updatedTotalPages, 1))
                                                            );
                                                        } catch (error) {
                                                            console.error("Failed to delete employee:", error);

                                                            setErrorMessage(
                                                                "Unable to delete employee. Please check your connection and try again."
                                                            );
                                                        }
                                                        // } catch (error) {
                                                        //     console.error("Failed to delete employee:", error);
                                                        // }
                                                    }}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete employee"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        {/* <span className="text-sm text-slate-500">
                            Page {currentPage} of {totalPages}
                        </span> */}

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    type="button"
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium ${currentPage === index + 1
                                        ? "bg-slate-900 text-white"
                                        : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Employees;




























// function Employees(){
//     return(
//         <div>
//             <h1>Employees</h1>
//             <p>Employee list will appear here.</p>
//         </div>
//     );
// }

// export default Employees;