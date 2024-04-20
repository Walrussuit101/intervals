import { useEffect, useState } from "react"

const useTimer = () => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [shouldIncrement, setShouldIncrement] = useState(false);

    useEffect(() => {
        if (shouldIncrement) {
            const interval = setInterval(() => {
                setTotalSeconds(prev => prev + 1);
            }, 1000);
    
            return () => clearInterval(interval);
        }
        
    }, [shouldIncrement]);

    return {
        totalSeconds,
        setTotalSeconds,
        shouldIncrement,
        setShouldIncrement
    };
}

export default useTimer;