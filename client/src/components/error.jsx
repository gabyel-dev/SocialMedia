import { useEffect, useState } from "react";

export default function Error({ error }) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger slide down after component mounts
        setMounted(true);
        const slideDown = setTimeout(() => setVisible(true), 50); // short delay to trigger transition
        const slideUp = setTimeout(() => setVisible(false), 3050); // stay visible for 3s

        return () => {
            clearTimeout(slideDown);
            clearTimeout(slideUp);
        };
    }, []);

    return (
        <div className="w-full h-screen flex justify-center absolute">
            <div className={`__alert__ w-fit h-[70px] px-6 flex justify-center items-center shadow-md rounded-lg text-red-500
                transition-all duration-500
                ${mounted ? (visible ? "translate-y-12 opacity-100" : "-translate-y-20 opacity-0") : "-translate-y-20 opacity-0"}`}>
                {error}
            </div>
        </div>
    );
}