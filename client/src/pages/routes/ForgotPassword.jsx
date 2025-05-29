import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import SuccessCard from "../../successfull_card";
import NavAuth from "../../components/navbar_auth";
import Error from "../../components/error";


export default function ForgotPassword() {
    const [isResetting, setIsResetting] = useState(false);
    const [resetPasswordData, setResetPasswordData] = useState({
        username: "",
        password: "",
        new_password: "",
    });

    const [error, setError] = useState("");
    const [checkPasswordSame, setCheckPasswordSame] = useState(false);
    const [success, setSuccess] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [errorAppear, setErrorAppear] = useState(false)

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
        setResetPasswordData({ ...resetPasswordData, [name]: value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
    
        const { username, password, new_password } = resetPasswordData;
    
        // Prevent same old and new password
        if (password.trim() === new_password.trim()) {
            setError("✕ Your new password cannot be the same as your current password.");
            return;
        }
    
        setIsResetting(true);
        setError("");
    
        try {
            const url = import.meta.env.VITE_URL;
            const response = await axios.post(`${url}/reset_password`, resetPasswordData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
    
            const { data, status } = response;
            console.log("Password Reset Response:", data);
    
            // Consider it successful if status is 200 and success is not explicitly false
            if (status === 200 && data?.success !== false) {
                setSuccess(true);
            } else {
                const message = data?.message || "✕ Failed to reset password.";
                setError(message);
                setErrorAppear(true);
                setTimeout(() => setErrorAppear(false), 3000);
            }
    
        } catch (err) {
            console.error("Reset Password Error:", err);
    
            // Prioritize server message if available
            const message = err.response?.data?.message;
            setError(message);
            setErrorAppear(true);
            setTimeout(() => setErrorAppear(false), 3000);
            
        } finally {
            setIsResetting(false);
        }
    };
    

    useEffect(() => {
        document.title = "Chattrix - Reset Password";
    
        const password = resetPasswordData.password.trim();
        const newPassword = resetPasswordData.new_password.trim();
    
        // If either field is empty, reset error and border highlighting
        if (password === "" || newPassword === "") {
            setCheckPasswordSame(null);
            setError("");
            return;
        }
    
        // Check if passwords are the same
        if (password === newPassword) {
            setCheckPasswordSame(true);
            setError("✕ Your new password cannot be the same as your current password.");
        } else {
            setCheckPasswordSame(false);
            
            // Check for minimum length
            if (newPassword.length < 8) {
                setError("✕ Password must be at least 8 characters.");
            } else {
                setError(""); // No error
            }
        }
    }, [resetPasswordData.password, resetPasswordData.new_password, resetPasswordData.username]);
    

    return (
        <>
        <div className="blur-bg w-full h-screen "></div>
        <NavAuth />
        <div className="w-full h-screen flex flex-col justify-center items-center">
            {errorAppear && (
                <Error error={'Invalid Credentials'} />
            )}
            
            {success && (
                <SuccessCard 
                    title={"Changed password successful!"}
                    route={"/"}
                    linkTitle={"continue"}
                    description={"Your password has been changed. You can now log in to continue."}
                />
            )}
            <div className="flex flex-col text-center mb-6">
                <h1 className="text-2xl font-bold">Reset Password</h1>
            </div>

            <form
                onSubmit={handleChangePassword}
                className="w-[250px] min-w-[200px] max-w-[300px] flex flex-col gap-4"
            >
                <fieldset className={`border border-gray-300 rounded px-3 pb-3 pt-1`}>
                    <legend className="text-[12px] text-gray-500 px-2">Username</legend>
                    <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faUser} className="text-sm text-gray-500" />}
                        <input
                            type="text"
                            name="username"
                            value={resetPasswordData.username}
                            placeholder="e.g, johndoe"
                            onChange={handleChange}
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                </fieldset>

                <fieldset className={`border rounded px-3 pb-3 pt-1 ${checkPasswordSame === null
                                                                        ? "border-gray-300"
                                                                        : checkPasswordSame
                                                                        ? "border-red-500" 
                                                                        : "border-green-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">Current Password</legend>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type={show1 ? "text" : "password"}
                            name="password"
                            value={resetPasswordData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full border-none focus:outline-none text-sm"
                        />
                    </div>
                        <button type="button" onClick={handleShow1} className="cursor-pointer">
                            {!show1 ? <FontAwesomeIcon icon={faEye} className="text-gray-400" />
                                   : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400" />}
                        </button>
                    </div>
                </fieldset>

                <fieldset className={`border rounded px-3 pb-3 pt-1 ${checkPasswordSame === null
                                                                        ? "border-gray-300"
                                                                        : checkPasswordSame
                                                                        ? "border-red-500" 
                                                                        : "border-green-500"}`}>
                    <legend className="text-[12px] text-gray-500 px-2">New Password</legend>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center gap-2.5">
                        {<FontAwesomeIcon icon={faLock} className="text-sm text-gray-500" />}
                        <input
                            type={show2 ? "text" : "password"}
                            name="new_password"
                            value={resetPasswordData.new_password}
                            onChange={handleChange}
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
                    className={`${isResetting ? "bg-gray-500" : "bg-blue-500"} ${success && "bg-gray-500" } rounded-[7px] py-2 px-[32px] text-white cursor-pointer hover:bg-blue-600 transition`}
                >
                    {isResetting ? "Resetting..." : "Reset"}
                </button>
            </form>

            <Link to="/" className="mt-4 text-sm text-blue-600 hover:underline">
                Already have an account?
            </Link>
        </div>
        </>
    );
}
