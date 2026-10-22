import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // console.log("Login form submitted");
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // const data = await response.json();
        // console.log("Login response:", data);

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful:", data);

            // setError("");
            setEmail("");
            setPassword("");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/");
            
        } else {
            console.log("Login failed:", data);
            setError(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <p className="text-red-600 text-sm mb-4">
                            {error}
                        </p>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // onChange={(e) => {
                            //     setPassword(e.target.value);
                            //     setError("");
                            // }}

                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;





// function Login() {
//     return (
//         <div>
//             <h1>Login</h1>
//             <p>Login page will appear here.</p>
//         </div>
//     );
// }

// export default Login;
