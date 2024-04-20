'use client';

import Timer from "@/components/Timer";
import useTimer from "@/hooks/useTimer";
import { useState } from "react";

const Home = () => {
    const { totalSeconds, setTotalSeconds, shouldIncrement, setShouldIncrement } = useTimer();
    const [interval, setInterval] = useState(15);
    const [targetOs, setTargetOs] = useState(0);
    const [comparisonOs, setComparisonOs] = useState(0);
    
    const numIntervals = Math.floor(totalSeconds / interval);

    return (
        <>
            <div className="navbar bg-base-200 drop-shadow-lg">
                <div className="navbar-start" />
                <div className="navbar-center">
                    <p className="text-3xl">Interval Recording</p>
                </div>
                <div className="navbar-end" />
            </div>
            <div className="flex flex-col justify-center items-center mt-5">
                <select defaultValue="15" className="select select-bordered w-36" onChange={e => setInterval(parseInt(e.target.value))}>
                    <option value="10">10 seconds</option>
                    <option value="15">15 seconds</option>
                    <option value="25">25 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="45">45 seconds</option>
                    <option value="60">60 seconds</option>
                </select>
                <Timer
                    totalSeconds={totalSeconds}
                    shouldIncrement={shouldIncrement}
                    playAction={() => setShouldIncrement(true)}
                    pauseAction={() => setShouldIncrement(false)}
                    resetAction={() => {
                        setShouldIncrement(false);
                        setTotalSeconds(0);
                        setTargetOs(0);
                        setComparisonOs(0);
                    }}
                />
                <div className="flex w-full justify-center items-center gap-10">
                    <div className="flex flex-col items-center">
                        <p className="text-lg">Target Student</p>
                        <div className="flex w-56">
                            <button className="btn btn-lg w-1/2 btn-active rounded-r-none text-xl">X</button>
                            <button className="btn btn-lg w-1/2 btn-active rounded-l-none text-xl" onClick={() => setTargetOs(prev => prev + 1)}>O</button>
                        </div>
                        <span>{targetOs} / {numIntervals} = {numIntervals === 0 ? 0 : ((targetOs / numIntervals) * 100).toFixed(2)}%</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-lg">Comparison</p>
                        <div className="flex w-56">
                            <button className="btn btn-lg w-1/2 btn-active rounded-r-none text-xl">X</button>
                            <button className="btn btn-lg w-1/2 btn-active rounded-l-none text-xl" onClick={() => setComparisonOs(prev => prev + 1)}>O</button>
                        </div>
                        <span>{comparisonOs} / {numIntervals} = {numIntervals === 0 ? 0 : ((comparisonOs / numIntervals) * 100).toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;