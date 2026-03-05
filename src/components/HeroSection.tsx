import TypedText from "./TypedText";
import Waves from "./Waves";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative flex items-center justify-center h-screen px-6 pb-16 md:pl-24 overflow-hidden"
            style={{ background: "#080612" }}
        >
            {/* Waves fills the entire hero background */}
            <div className="absolute inset-0 z-0">
                <Waves
                    lineColor="rgba(168, 85, 247, 0.2)"
                    backgroundColor="transparent"
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={40}
                    waveAmpY={20}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={120}
                    xGap={12}
                    yGap={36}
                    className="w-full h-full"
                />
            </div>

            {/* Hero text content */}
            <div className="relative z-[2] max-w-lg text-center">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
                    style={{ fontFamily: "monospace" }}
                >
                    Martim Mendes
                </h1>

                <TypedText />

                <p
                    className="mt-5 text-xs sm:text-sm leading-relaxed font-mono max-w-xs sm:max-w-sm mx-auto"
                    style={{ color: "rgba(200, 190, 220, 0.75)" }}
                >
                    I'm a programming student.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
