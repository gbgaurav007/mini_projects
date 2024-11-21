import React, { useState, useEffect } from 'react';

function CountdownTimer() {
    const [inputMinutes, setInputMinutes] = useState(0); 
    const [timeLeft, setTimeLeft] = useState(0); 
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false); 
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    const startTimer = () => {
        if (timeLeft === 0 && inputMinutes > 0) {
            setTimeLeft(inputMinutes * 60); 
        }
        setIsRunning(true);
    };


    const pauseTimer = () => {
        setIsRunning(false);
    };


    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setInputMinutes(0);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="p-6 bg-gray-800 text-white rounded-full shadow-lg max-w-sm text-center w-full">
                <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>
                <div className="mb-4">
                    <label htmlFor="minutesInput" className="block mb-2 text-lg">
                        Enter Minutes:
                    </label>
                    <input
                        id="minutesInput"
                        type="number"
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(Number(e.target.value))}
                        className="p-2 rounded border w-full text-gray-800"
                        min="0"
                    />
                </div>
                <div className="text-3xl font-mono mb-4">{formatTime(timeLeft)}</div>
                <div className="space-x-2">
                    <button
                        onClick={startTimer}
                        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition text-white"
                    >
                        Start
                    </button>
                    <button
                        onClick={pauseTimer}
                        className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition text-white"
                    >
                        Pause
                    </button>
                    <button
                        onClick={resetTimer}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CountdownTimer;