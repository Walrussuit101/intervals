'use client';

import NavBar from "@/components/NavBar";
import RateCounter from "@/components/RateCounter";
import Timer from "@/components/Timer";
import useTimer from "@/hooks/useTimer";
import { useId, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Counter {
    id: string,
    color: string
}

const Rate = () => {
    const { totalSeconds, setTotalSeconds, shouldIncrement, setShouldIncrement } = useTimer();
    const [rateCounters, setRateCounters] = useState<Counter[]>([]);

    const removeCounter = (id: string) => {
        setRateCounters(prev => {
            return prev.filter(counter => counter.id !== id);
        })
    }

    const addCounter = () => {
        if (rateCounters.length < counterColors.length) {
            setRateCounters(prev => {
                const newCounters = [
                    ...prev,
                    {
                        id: uuidv4(),
                        color: counterColors[prev.length]
                    }
                ];

                return newCounters;
            })
        }
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col justify-center items-center">
                <button className="btn btn-success my-6 btn-outine text-lg" onClick={addCounter}>New Counter ({rateCounters.length} / {counterColors.length})</button>
                <Timer
                    totalSeconds={totalSeconds}
                    shouldIncrement={shouldIncrement}
                    playAction={() => setShouldIncrement(true)}
                    pauseAction={() => setShouldIncrement(false)}
                    resetAction={() => {
                        setShouldIncrement(false);
                        setTotalSeconds(0);
                    }}
                />
                <div className="flex flex-col justify-center items-center gap-5 mt-8">
                    {
                        rateCounters.map(rateCounter => {
                            return (
                                <RateCounter
                                    key={rateCounter.id}
                                    btnColor={rateCounter.color}
                                    removeSelf={() => removeCounter(rateCounter.id)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Rate;

const counterColors = [
    'btn-success',
    'btn-primary',
    'btn-secondary',
    'btn-info',
    'btn-neutral',
    'btn-warning',
    'btn-accent'
]