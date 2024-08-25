'use client';

import { downloadSpreadsheet } from "@/SpreadSheet";
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
    const [comparison, setComparison] = useState(false);
    const numIntervals = Math.floor(totalSeconds / interval);

    const [intervalSubjects, setIntervalSubjects] = useState<IntervalSubjects[]>([
        {
            id: uuidv4(),
            target: null,
            comparison: null
        }
    ])

    useEffect(() => {
        const competedIntervals = Math.floor((totalSeconds - 1) / interval)

        if (competedIntervals + 1 > intervalSubjects.length) {
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
    }, [totalSeconds, interval]);

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
            <div className="flex flex-col justify-center items-center mt-5 px-4 gap-2">
                <div className="flex gap-4">
                    <select defaultValue="15" disabled={shouldIncrement || totalSeconds > 0} className="select select-bordered w-36" onChange={e => setInterval(parseInt(e.target.value))}>
                        <option value="10">10 seconds</option>
                        <option value="15">15 seconds</option>
                        <option value="25">25 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="45">45 seconds</option>
                        <option value="60">60 seconds</option>
                    </select>
                    <button className="btn btn-neutral btn-outline" disabled={shouldIncrement} onClick={() => downloadSpreadsheet(intervalSubjects, comparison)}>
                        Download
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"><path d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z"/></svg>
                    </button>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer gap-2">
                        <span className="label-text">Comparison</span>
                        <input type="checkbox" className="toggle" disabled={shouldIncrement || totalSeconds > 0} checked={comparison} onChange={e => setComparison(prev => !prev)} />
                    </label>
                </div>
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
                        {
                            comparison &&
                            <span>Comparison: {oCount.comparisonOs} / {numIntervals} = {numIntervals === 0 ? 0 : ((oCount.comparisonOs / numIntervals) * 100).toFixed(2)}%</span>
                        }
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
                                        comparison={comparison}
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