import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
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
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleShow1 = (e) => {
        e.preventDefault();
        setShow1(!show1)
    }
    const handleShow2 = (e) => {
        e.preventDefault();
        setShow2(!show2)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const { username, password } = registerData;

        if (password !== confirmPassword) {
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
    
        const { username, password } = registerData;
    
        const isEmpty = password.trim() === "" || confirmPassword.trim() === "";
    
        if (isEmpty) {
            setCheckPassword(null);
            setError(""); // No error if fields are empty
        } else {
            if (password.length < 8) {
                setError("Password must be at least 8 characters");
                setCheckPassword(false);
            } else if (password !== confirmPassword) {
                setError("✕ Password must be the same");
                setCheckPassword(false);
            } else {
                setError("");
                setCheckPassword(true);
            }
        }
    
        // Username check (optional visual cue logic)
        if (username === "") {
            setCheckUsername(null);
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
                    route={"/"}
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type={show1 ? "text" : "password"}
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                        <button onClick={handleShow1} className="cursor-pointer">
                            {!show1 ? <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                                   : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />}
                        </button>
                    </div>
                </fieldset>

                <fieldset className={`border rounded px-3 pb-3 pt-1 ${checkPassword === null
                                                                        ? "border-gray-300"
                                                                        : checkPassword
                                                                        ? "border-green-500" 
                                                                        : "border-red-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">Confirm Password</legend>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type={show2 ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                        <button type="button" onClick={handleShow2} className="cursor-pointer">
                            {!show2 ? <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                                   : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />}
                        </button>
                    </div>
                </fieldset>

                <div className="text-red-500 text-[12px]">
                {error}
                </div>

                <button
                    type="submit"
                    disabled={success}
                    className={`${isRegistering ? "bg-gray-500" : "bg-blue-500"} ${success && "bg-gray-500"} rounded-[7px] py-2 px-[32px] text-white cursor-pointer hover:bg-blue-600 transition`}
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
