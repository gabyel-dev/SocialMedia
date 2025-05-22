import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [isLogging, setIsLogging] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

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

            if (res.status === 200) {
                console.log("login successful")
            }
        } catch {
            console.log("registration failed")
        } finally {
            setIsLogging(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input  type="text" 
                        placeholder="username"
                        value={loginData.username}
                        onChange={handleChange}
                        name="username"
                        required
                />

                <input  type="password" 
                        placeholder="password"
                        value={loginData.password}
                        onChange={handleChange}
                        name="password"
                        required
                />  

                <button type="submit">Login</button>
            </form>

            <Link to={'/'}>Register</Link>
        </div>
    )
}