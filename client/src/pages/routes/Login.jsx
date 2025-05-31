import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import NavAuth from "../../components/navbar_auth";
import Error from "../../components/error";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [isLogging, setIsLogging] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)
    const [errorAppear, setErrorAppear] = useState(false)
    const navigate = useNavigate()

    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }

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
            navigate('/home')

            
        } catch (err) {
            if (err.response && (err.response.status === 401)) {
                setError("Invalid Credentials");
                setTimeout(() => setError(""), 3500)
                setErrorAppear(true)
                setTimeout(() => setErrorAppear(false), 3500)
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
        <div className="blur-bg w-full h-screen" />
            <NavAuth />
                <div className="w-full h-screen flex flex-col justify-center items-center">
                    {errorAppear && (
                        <Error error={'Invalid Credentials'} />
                    )}
                    <div className="flex flex-col text-center mb-6">
                        <h1 className="text-2xl font-bold">Sign In to Chattrix</h1>
                    </div>
        
                    <form
                        onSubmit={handleSubmit}
                        className="w-[250px] md:w-[280px] lg:w-[290px] xl:[300px] flex flex-col "
                    >
                        <fieldset className={`border rounded px-3 pb-3 pt-1 border-gray-300 focus-within:border-blue-500 mb-4`}>
                            <legend className="text-[12px] text-gray-500 px-2">Username</legend>
                            <div className="flex items-center justify-center gap-2.5">
                                {<FontAwesomeIcon icon={faUser} className="text-sm text-gray-500" />}
                                <input
                                    aria-label="username"
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
        
                        <fieldset className="border rounded px-3 pb-3 pt-1 border-gray-300 focus-within:border-blue-500">
                            <legend className="text-[12px] text-gray-500 px-2">Password</legend>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2.5 w-full">
                                    <FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />
                                    <input
                                        aria-label="password"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="flex-1 border-none focus:outline-none text-sm bg-transparent"
                                    />
                                </div>
                                <button type="button" onClick={handleShow} className="cursor-pointer pl-2">
                                    {!show
                                        ? <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                                        : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />}
                                </button>
                            </div>
                        </fieldset>

        
                            <div className="w-full relative flex justify-end py-1 pb-4 underline text-blue-500   ">
                                <Link to={'/forgot_password'} className=" text-[12px]">forgot password</Link>
                            </div>
        
                        <button
                            disabled={isLogging}
                            className={`${isLogging ? "bg-gray-500" : "bg-blue-500"} rounded-[7px] py-2 px-[32px] text-white cursor-pointer hover:bg-blue-600 transition`}
                        >
                            {isLogging ? "Logging in..." : "Login"}
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