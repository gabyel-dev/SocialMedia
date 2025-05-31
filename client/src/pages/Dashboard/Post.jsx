export default function Post() {
    return (
        <>
        <div className="w-[500px] p-3 rounded-xl bg-gray-100 shadow-md flex gap-2 cursor-pointer">
            <img src={``} alt="profile" className='w-[40px] h-[40px] rounded-full border border-black cursor-pointer' />
            <div className="w-full h-[45px] p-3 rounded-full bg-gray-200">
                <p>What's on your mind username?</p>
            </div>
        </div>
        </>
    )
}