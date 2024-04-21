'use client';
import { useState } from "react";

interface props {
    btnColor: string,
    removeSelf: () => void
}
const RateCounter = ({ btnColor, removeSelf }: props) => {
    const [count, setCount] = useState(0);

    return (
        <div className="flex justify-center items-center">
            <button className="btn btn-error btn-outline rounded-r-none" onClick={() => setCount(0)}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" /></svg>
            </button>
            <button className={`btn w-52 ${btnColor} rounded-none text-lg`} onClick={() => setCount(prev => prev + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                {count}
            </button>
            <button className="btn btn-error btn-outline rounded-l-none" onClick={() => removeSelf()}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" /></svg>
            </button>
        </div >
    )
}

export default RateCounter;