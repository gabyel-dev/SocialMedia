import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Post from './Post';
import NavHome from './Navigation/Navbar';

export default function Home() {
    return (
        <>
            <NavHome />
            <div className="blur-bg w-full h-screen " />
                <div className="w-full h-screen">
                    <Post />
                </div>
        </>
    )
}