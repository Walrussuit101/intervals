interface props {
    totalSeconds: number,
    playAction: () => void,
    pauseAction: () => void,
    resetAction: () => void,
    shouldIncrement: boolean
}
const Timer = ({ totalSeconds, playAction, pauseAction, resetAction, shouldIncrement }: props) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds - (minutes * 60);

    return (
        <div className="flex">
            <div className="flex flex-col">
                <button onClick={playAction} className={`btn btn-square ${!shouldIncrement ? 'btn-outline' : '' } btn-success rounded-none rounded-tl-md`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"><path d="M3 22v-20l18 10-18 10z"/></svg>
                </button>
                <button onClick={pauseAction} className={`btn btn-square ${shouldIncrement ? 'btn-outline' : '' } btn-info rounded-none`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>                </button>
                <button onClick={resetAction} className="btn btn-square btn-outline btn-error rounded-none rounded-bl-md">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/></svg>                </button>
            </div>
            <div className="border-[1px] border-l-0 border-solid border-black flex justify-center items-center px-7 rounded-r-lg">
                <span className="text-7xl font-mono text-center">{zeroPad(minutes)}:{zeroPad(remainingSeconds)}</span>
            </div>
        </div>


    )
}

const zeroPad = (value: number) => {
    if (value < 10) {
        return `0${value}`;
    } else {
        return value;
    }
}

export default Timer;