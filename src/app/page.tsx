'use client';

import BehaviorSelector from "@/components/BehaviorSelector";
import NavBar from "@/components/NavBar";
import Timer from "@/components/Timer";
import useTimer from "@/hooks/useTimer";
import { Behavior, IntervalSubjects } from "@/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const { totalSeconds, setTotalSeconds, shouldIncrement, setShouldIncrement } = useTimer();
    const [interval, setInterval] = useState(15);
    const numIntervals = Math.floor(totalSeconds / interval);

    const [intervalSubjects, setIntervalSubjects] = useState<IntervalSubjects[]>([
        {
            id: uuidv4(),
            target: null,
            comparison: null
        }
    ])

    useEffect(() => {
        if (numIntervals + 1 > intervalSubjects.length) {
            setIntervalSubjects(prev => {
                return [
                    ...prev,
                    {
                        id: uuidv4(),
                        target: null,
                        comparison: null
                    }
                ]
            })
        }
    }, [numIntervals]);

    const updateSubjects = (id: string, target: Behavior, comparison: Behavior) => {
        const newIntervalSubjects = intervalSubjects.map(subjects => {
            if (subjects.id === id) {
                subjects.target = target;
                subjects.comparison = comparison;
            }

            return subjects;
        })

        setIntervalSubjects(newIntervalSubjects);
    }

    const oCount = sumOs(intervalSubjects);
    
    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center mt-5 px-4">
                <select defaultValue="15" disabled={shouldIncrement || totalSeconds > 0} className="select select-bordered w-36 mb-4" onChange={e => setInterval(parseInt(e.target.value))}>
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
                        setIntervalSubjects([{
                            id: uuidv4(),
                            target: null,
                            comparison: null
                        }]);
                    }}
                />
                <div className="flex flex-col gap-5 my-5">
                    <div className="flex flex-wrap justify-between gap-x-8">
                        <span>Target: {oCount.targetOs} / {numIntervals} = {numIntervals === 0 ? 0 : ((oCount.targetOs / numIntervals) * 100).toFixed(2)}%</span>
                        <span>Comparison: {oCount.comparisonOs} / {numIntervals} = {numIntervals === 0 ? 0 : ((oCount.comparisonOs / numIntervals) * 100).toFixed(2)}%</span>
                    </div>
                    {
                        intervalSubjects.slice().reverse().map((subjects, i) => {
                            return (
                                <div key={subjects.id} className="border-2 border-solid border-neutral rounded-lg p-2 relative">
                                    <div className="absolute top-0 left-0 bg-neutral py-1 px-2 text-white rounded-br-lg">
                                        <span>{intervalSubjects.length - i}</span>
                                    </div>
                                    <BehaviorSelector
                                        subjects={subjects}
                                        updateSubjects={updateSubjects}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;

const sumOs = (intervalSubjects: IntervalSubjects[]) => {
    let targetOs = 0;
    let comparisonOs = 0;

    intervalSubjects.forEach(subjects => {
        if (subjects.target === 'o') {
            targetOs++;
        }

        if (subjects.comparison === 'o') {
            comparisonOs++;
        }
    })

    return {
        targetOs,
        comparisonOs
    }
}