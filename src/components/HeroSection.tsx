import TypedText from "./TypedText";
import DotGrid from "./DotGrid";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative flex items-center justify-center h-screen pl-24 pb-16 overflow-hidden"
        >
            {/* DotGrid fills the entire hero background */}
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={4}
                    gap={28}
                    baseColor="#1e1333"
                    activeColor="#a855f7"
                    proximity={180}
                    speedTrigger={80}
                    shockRadius={280}
                    shockStrength={4}
                    resistance={700}
                    returnDuration={1.5}
                    className="w-full h-full"
                />
            </div>

            {/* Subtle radial vignette to darken edges and help text legibility */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 30% 50%, transparent 30%, rgba(10,8,20,0.85) 100%)",
                }}
            />

            {/* Hero text content */}
            <div className="relative z-[2] max-w-lg text-center">
                <h1
                    className="text-5xl font-extrabold text-white leading-tight tracking-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Martim Mendes
                </h1>

                <TypedText />

                <p
                    className="mt-5 text-sm leading-relaxed font-mono max-w-sm"
                    style={{ color: "rgba(200, 190, 220, 0.75)" }}
                >
                    I'm a programming student.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
