import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import SuccessCard from "../../successfull_card";
import NavAuth from "../../components/navbar_auth";

export default function Register() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (registerData.password !== confirmPassword) {
            setError("✕ Password must be the same")
            return;
        } 

        setIsRegistering(true);
        setError("")

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
                setSuccess(true)
            }

            
        } catch (err) {
                console.log("registration failed");
                if (err.response?.status === 409) {
                    setError("✕ Username Already Taken");
                    setCheckUsername(true)
                } else {
                    setError("✕ Something went wrong. Please try again.");
                }
        } finally {
            setIsRegistering(false);
        }
    };

    useEffect(() => {
        document.title = "Chattrix - Register";
        const isEmpty = registerData.password === "" || confirmPassword === "";
        if (isEmpty) {
            setCheckPassword(null); // null = no highlight yet
            setError("")
        } else {
            setCheckPassword(registerData.password === confirmPassword);
        }

        if (registerData.username === "") {
            setCheckUsername(null); // no highlight yet
            setError("")
        }
    }, [registerData.password, confirmPassword, registerData.username]);

    return (
        <>
        <div className="blur-bg w-full h-screen "></div>
        <NavAuth />
        <div className="w-full h-screen flex flex-col justify-center items-center">
            
            {success && (
                <SuccessCard 
                    title={"Registration successful!"}
                    route={"/login"}
                    linkTitle={"continue"}
                    description={"Your account has been created successfully. You can now log in to continue."}
                />
            )}
            <div className="flex flex-col text-center mb-6">
                <p>Start your journey</p>
                <h1 className="text-2xl font-bold">Sign Up to Chattrix</h1>
            </div>

            <form
                onSubmit={handleRegister}
                className="w-[250px] min-w-[200px] max-w-[300px] flex flex-col gap-4"
            >
                <fieldset className={`border   rounded px-3 pb-3 pt-1 ${checkUsername === null
                                                                        ? "border-gray-300"
                                                                        : checkUsername
                                                                        ? "border-red-500" 
                                                                        : "border-green-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">Username</legend>
                    <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faUser} className="text-sm text-gray-500" />}
                        <input
                            type="text"
                            name="username"
                            value={registerData.username}
                            placeholder="e.g, johndoe"
                            onChange={handleChange}
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                </fieldset>

                <fieldset className={`border   rounded px-3 pb-3 pt-1 ${checkPassword === null
                                                                        ? "border-gray-300"
                                                                        : checkPassword
                                                                        ? "border-green-500" 
                                                                        : "border-red-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">Password</legend>
                    <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                </fieldset>

                <fieldset className={`border rounded px-3 pb-3 pt-1 ${checkPassword === null
                                                                        ? "border-gray-300"
                                                                        : checkPassword
                                                                        ? "border-green-500" 
                                                                        : "border-red-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">Confirm Password</legend>
                    <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                </fieldset>

                <div className="text-red-500 text-[12px]">
                {error}
                </div>

                <button
                    type="submit"
                    disabled={isRegistering}
                    className={`${isRegistering ? "bg-gray-500" : "bg-blue-500"} rounded-[7px] py-2 px-[32px] text-white cursor-pointer hover:bg-blue-600 transition`}
                >
                    {isRegistering ? "Registering..." : "Register"}
                </button>
            </form>

            <Link to="/" className="mt-4 text-sm text-blue-600 hover:underline">
                Already have an account?
            </Link>
        </div>
        </>
    );
}
