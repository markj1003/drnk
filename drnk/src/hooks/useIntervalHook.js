import {useEffect, useRef } from 'react';

export default function useIntervalHook(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    return useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            // first render, then callback every delay seconds.
            tick();
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}