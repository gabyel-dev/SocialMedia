import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false)
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value})
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        setIsRegistering(true)
        
        try {
            const url = import.meta.env.VITE_URL;
            const res = await axios.post(`${url}/register`, registerData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            if(res.status == 200) {
                console.log('registration successful')
            }
        } catch {
            console.log("registration failed")
        } finally {
            setIsRegistering(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input  type="text" 
                        placeholder="username"
                        value={registerData.username}
                        onChange={handleChange}
                        name="username"
                        required
                />

                <input  type="password" 
                        placeholder="password"
                        value={registerData.password}
                        onChange={handleChange}
                        name="password"
                        required
                />  
                <button type="submit" disabled={isRegistering} className={`${isRegistering ? "bg-gray-500" : "bg-blue-500"} `}> {isRegistering ? "Disabled" : "Register"}</button>
            </form>

            <Link to={'/login'}>Login</Link>
        </div>
    )
}