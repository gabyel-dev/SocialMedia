import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const check = <FontAwesomeIcon icon={faCircleCheck} className="text-[4em] text-green-700 font-thin" />  

export default function SuccessCard({ title, route, linkTitle, description }) {
    return (
        <div className="w-full h-screen absolute flex justify-center items-center bg-black/30 z-50">
            <div className="w-[300px] h-fit p-8 flex flex-col gap-4  justify-center items-center text-center bg-gray-100 border border-gray-300 rounded-xl shadow-md">
                {check}
                <p className="text-green-600 text-xl mb-2 font-semibold">
                    {title}
                </p>
                <p className="text-gray-500 text-sm">
                    {description}
                </p>
                <Link
                    to={route}
                    className="bg-green-500 w-full text-white px-4 py-2 rounded-full hover:bg-green-600 transition text-center"
                >
                    {linkTitle}
                </Link>
            </div>
        </div>
    );
}
