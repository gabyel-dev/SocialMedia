import { useParams } from "react-router-dom";
import Post from "./Post";
import NavHome from "./Navigation/Navbar";

export default function Home() {
    const { id } = useParams(); // Get the "id" from the URL

    return (
        <>
            <NavHome />
            <div className="blur-bg w-full h-screen" />
            <div className="w-full h-screen">
                <Post userId={id} /> 
            </div>
        </>
    );
}
