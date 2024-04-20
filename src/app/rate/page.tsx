'use client';

import NavBar from "@/components/NavBar";
import Timer from "@/components/Timer";
import useTimer from "@/hooks/useTimer";

const Rate = () => {
    const { totalSeconds, setTotalSeconds, shouldIncrement, setShouldIncrement } = useTimer();

    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center mt-5">
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
                <p>work in progress :)</p>
            </div>
        </>
    )
}

export default Rate;