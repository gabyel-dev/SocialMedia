import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [isLogging, setIsLogging] = useState(false);
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLogging(true)
        try {   
            const res = await axios.post(`${url}/login`, loginData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            if (res.status === 200) {
                console.log("login successful")
            }
        } catch (e) {
            console.log(e)
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
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value})}
                        required
                />

                <input  type="password" 
                        placeholder="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value})}
                        required
                />  
            </form>
        </div>
    )
}