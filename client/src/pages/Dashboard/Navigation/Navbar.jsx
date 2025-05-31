import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useEffect, useState } from 'react';

export default function NavHome() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                const fetchData = async () => {
                    try {
                        const url = import.meta.env.VITE_URL;
                        const res = await axios.get(`${url}/search?query=${query}`);
                        setResult(res.data.users);
                        setShowResults(true);
                    } catch (err) {
                        console.error("Error searching:", err);
                        setError("Something went wrong.");
                        setResult([]);
                        setShowResults(false);
                    }
                };
                fetchData();
            } else {
                setShowResults(false);
                setResult([]);
            }
        }, 300); // debounce time

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <>
        <div className="blur-bg w-full h-screen" />
        <div className="relative w-full h-[60px] md:h-[70px] flex items-center shadow-lg justify-between pr-[2vw]">
            <div className='flex justify-center items-center'>
                <img src="/logo.png" alt="company logo" className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" />
            </div>

            <div className='flex gap-3'>
            <div className="flex gap-3 justify-center items-center relative">
                <div className="w-[270px] md:w-[300px] h-[40px] md:h-[45px] p-3 rounded-full bg-gray-200 flex justify-start items-center gap-2 pl-5">
                    <FontAwesomeIcon icon={faSearch} className='text-gray-500' />
                    <input
                        type="text"
                        placeholder="Search Chattrix"
                        className="outline-none w-full bg-transparent"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {showResults && result.length > 0 && (
                    <div className="absolute top-[50px] md:top-[58px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-50">
                        {result.map((user) => (
                            <div key={user.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {user.first_name}  {user.last_name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="__home__ rounded-full w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex justify-center items-center bg-gray-200">
                <FontAwesomeIcon icon={faHome} className='text-md md:text-lg' />
            </div>
            <div className="__message__ rounded-full w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex justify-center items-center bg-gray-200">
                <FontAwesomeIcon icon={faFacebookMessenger} className='text-md md:text-lg' />
            </div>
            <div className="__profile__">
                <img src="/default-avatar.png" alt="profile" className='w-[40px] h-[40px] rounded-full border border-black' />
            </div>
            </div>
        </div>
        </>
    );
}
