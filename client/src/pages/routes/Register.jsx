import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegistering(true);

        try {
            const url = import.meta.env.VITE_URL;
            const res = await axios.post(`${url}/register`, registerData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.status === 200) {
                console.log("registration successful");
            }
            navigate("/login");
        } catch {
            console.log("registration failed");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col text-center mb-6">
                <p>Start your journey</p>
                <h1 className="text-2xl font-bold">Sign Up to Chattrix</h1>
            </div>

            <form
                onSubmit={handleRegister}
                className="w-[250px] min-w-[200px] max-w-[300px] flex flex-col gap-4"
            >
                <fieldset className="border border-gray-300 focus-within:border-blue-400  rounded px-3 pb-3 pt-1">
                    <legend className="text-[12px] text-gray-500 ">Username</legend>
                    <input
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={handleChange}
                        placeholder="john doe"
                        required
                        className="w-full border-none focus:outline-none text-sm"
                    />
                </fieldset>

                <fieldset className="border border-gray-300 focus-within:border-blue-400 rounded px-3 pb-3 pt-1">
                    <legend className="text-[12px] text-gray-500">Password</legend>
                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        className="w-full border-none focus:outline-none text-sm"
                    />
                </fieldset>

                <button
                    type="submit"
                    disabled={isRegistering}
                    className={`${isRegistering ? "bg-gray-500" : "bg-blue-500"} rounded-[7px] py-2 px-[32px] text-white`}
                >
                    {isRegistering ? "Registering..." : "Register"}
                </button>
            </form>

            <Link to="/login" className="mt-4 text-sm text-blue-600 hover:underline">
                Already have an account?
            </Link>
        </div>
    );
}
