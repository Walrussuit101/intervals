'use client';

import NavBar from "@/components/NavBar";
import Timer from "@/components/Timer";
import useTimer from "@/hooks/useTimer";
import { useState } from "react";

interface XO {
    x: number
    o: number
}

const Home = () => {
    const { totalSeconds, setTotalSeconds, shouldIncrement, setShouldIncrement } = useTimer();
    const [interval, setInterval] = useState(15);

    const [target, setTarget] = useState({
        x: 0,
        o: 0
    });
    const [comparison, setComparison] = useState({
        x: 0,
        o: 0
    });

    const addToTarget = (toAdd: XO) => {
        setTarget(prev => {
            return {
                x: prev.x + toAdd.x,
                o: prev.o + toAdd.o
            }
        })
    }

    const addToComparison = (toAdd: XO) => {
        setComparison(prev => {
            return {
                x: prev.x + toAdd.x,
                o: prev.o + toAdd.o
            }
        })
    }
    
    const numIntervals = Math.floor(totalSeconds / interval);

    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center mt-5 px-4">
                <select defaultValue="15" className="select select-bordered w-36 mb-4" onChange={e => setInterval(parseInt(e.target.value))}>
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
                        setTarget({
                            x: 0,
                            o: 0
                        });
                        setComparison({
                            x: 0,
                            o: 0
                        });
                    }}
                />
                <div className="flex flex-wrap justify-center items-center gap-10 mt-4 mb-4">
                    <div className="flex flex-col items-center">
                        <p className="text-lg">Target Student</p>
                        <div className="flex w-56">
                            <button className="btn btn-lg w-1/2 btn-active rounded-r-none text-xl" onClick={() => addToTarget({ x: 1, o: 0})}>X</button>
                            <button className="btn btn-lg w-1/2 btn-active rounded-l-none text-xl" onClick={() => addToTarget({ x: 0, o: 1})}>O</button>
                        </div>
                        <div className="flex w-56 mb-5">
                            <span className="w-1/2 text-center">{target.x}</span>
                            <span className="w-1/2 text-center">{target.o}</span>
                        </div>
                        <span>{target.o} / {numIntervals} = {numIntervals === 0 ? 0 : ((target.o / numIntervals) * 100).toFixed(2)}%</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-lg">Comparison</p>
                        <div className="flex w-56">
                            <button className="btn btn-lg w-1/2 btn-active rounded-r-none text-xl" onClick={() => addToComparison({x: 1, o: 0})}>X</button>
                            <button className="btn btn-lg w-1/2 btn-active rounded-l-none text-xl" onClick={() => addToComparison({x: 0, o: 1})}>O</button>
                        </div>
                        <div className="flex w-56 mb-4">
                            <span className="w-1/2 text-center">{comparison.x}</span>
                            <span className="w-1/2 text-center">{comparison.o}</span>
                        </div>
                        <span>{comparison.o} / {numIntervals} = {numIntervals === 0 ? 0 : ((comparison.o / numIntervals) * 100).toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;