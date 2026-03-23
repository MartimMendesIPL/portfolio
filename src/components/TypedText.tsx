import { useEffect, useRef, useState } from "react";

const PHRASES = ["Programmer", "Prompt Engineer", "Vibe Coder"];

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(() => 
        typeof window !== "undefined" && 
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);

        if (mq.addEventListener) {
            mq.addEventListener("change", update);
            return () => mq.removeEventListener("change", update);
        }

        mq.addListener(update);
        return () => mq.removeListener(update);
    }, []);

    return reduced;
};

const TypedText = () => {
    const [displayed, setDisplayed] = useState(PHRASES[0]);
    const phraseIndex = useRef(0);
    const charIndex = useRef(0);
    const deleting = useRef(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        phraseIndex.current = 0;
        charIndex.current = 0;
        deleting.current = false;

        let timeout: ReturnType<typeof setTimeout>;

        const tick = () => {
            const current = PHRASES[phraseIndex.current];

            if (!deleting.current && charIndex.current < current.length) {
                charIndex.current += 1;
                setDisplayed(current.slice(0, charIndex.current));
                timeout = setTimeout(tick, 60);
            } else if (
                !deleting.current &&
                charIndex.current === current.length
            ) {
                timeout = setTimeout(() => {
                    deleting.current = true;
                    tick();
                }, 2000);
            } else if (deleting.current && charIndex.current > 0) {
                charIndex.current -= 1;
                setDisplayed(current.slice(0, charIndex.current));
                timeout = setTimeout(tick, 35);
            } else if (deleting.current && charIndex.current === 0) {
                deleting.current = false;
                phraseIndex.current =
                    (phraseIndex.current + 1) % PHRASES.length;
                timeout = setTimeout(tick, 200);
            }
        };

        timeout = setTimeout(tick, 100);
        return () => clearTimeout(timeout);
    }, [prefersReducedMotion]);

    return (
        <p className="text-xl font-mono mt-2" style={{ color: "#a855f7" }}>
            {"> "}
            <span>{displayed}</span>
            <span
                className={`inline-block w-0.5 h-5 ml-0.5 align-middle ${
                    prefersReducedMotion ? "" : "animate-pulse"
                }`}
                style={{ background: "#a855f7" }}
            />
        </p>
    );
};

export default TypedText;
