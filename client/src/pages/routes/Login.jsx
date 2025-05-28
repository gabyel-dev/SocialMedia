import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import NavAuth from "../../components/navbar_auth";


export default function Login() {
    const [isLogging, setIsLogging] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("")

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLogging(true)
        try {   
            const url = import.meta.env.VITE_URL;
            const res = await axios.post(`${url}/login`, loginData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            if (res.status === 200 ) {
                console.log("login successful")
            }

            
        } catch (err) {
            if (err.response && (err.response.status === 401)) {
                setError("Invalid Credentials");
            } else {
                setError("Something went wrong. Please try again.");
            }
            console.log("Login Failed", err);
        } finally {
            setIsLogging(false)
        }
    }

    useEffect(() => {
        document.title = "Chattrix - Login";
        if (loginData.password === "" || loginData.username === "") {
            setError("")
        }
    }, [loginData.password, loginData.username])

    return (
        <>
        <div className="blur-bg w-full h-screen "></div>
            <NavAuth />
                <div className="w-full h-screen flex flex-col justify-center items-center">
                    <div className="flex flex-col text-center mb-6">
                        <h1 className="text-2xl font-bold">Sign In to Chattrix</h1>
                    </div>
        
                    <form
                        onSubmit={handleSubmit}
                        className="w-[250px] min-w-[200px] max-w-[300px] flex flex-col gap-4"
                    >
                        <fieldset className={`border rounded px-3 pb-3 pt-1 border-gray-300 focus-within:border-blue-500`}>
                            <legend className="text-[12px] text-gray-500 px-2">Username</legend>
                            <div className="flex items-center justify-center gap-2.5">
                                {<FontAwesomeIcon icon={faUser} className="text-sm text-gray-500" />}
                                <input
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    placeholder="e.g, johndoe"
                                    onChange={handleChange}
                                    required
                                    className="w-full border-none focus:outline-none text-sm"
                                />
                            </div>
                        </fieldset>
        
                        <fieldset className={`border rounded px-3 pb-3 pt-1 border-gray-300 focus-within:border-blue-500`}>
                            <legend className="text-[12px] text-gray-500 px-2">Password</legend>
                            <div className="flex items-center justify-center gap-2.5">
                                {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
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
                            disabled={isLogging}
                            className={`${isLogging ? "bg-gray-500" : "bg-blue-500"} rounded-[7px] py-2 px-[32px] text-white cursor-pointer hover:bg-blue-600 transition`}
                        >
                            {isLogging ? "LoggingIn..." : "Login"}
                        </button>
                    </form>
        
                    <div className="mt-4 text-sm flex gap-2">
                        <p className="">New to Chattrix?</p>
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </div>
                </div>
        </>
    )
}