import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavHome() {
    return (
        <>
        <div className="blur-bg w-full h-screen " />
        <div className="relative w-full h-[60px] md:h-[70px] flex items-center shadow-lg justify-between pr-[2vw]">
            <div className='flex'>
                <img src="/logo.png" alt="company logo" className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] " />
                <div className="__search__ w-[45px] h-[45px]">

                </div>
            </div>

            <div className="flex gap-3 justify-center items-center ">
                <div className="__home__ rounded-full w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex justify-center items-center bg-gray-200">
                    <FontAwesomeIcon icon={faHome} className='text-md md:text-lg' />
                </div>
                <div className="__message__ rounded-full w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex justify-center items-center bg-gray-200">
                    <FontAwesomeIcon icon={faFacebookMessenger} className='text-md md:text-lg' />
                </div>
                <div className="__profile__">
                    <img src={``} alt="profile" className='w-[40px] h-[40px] rounded-full border border-black' />
                </div>
            </div>
        </div>
        </>
    )
}