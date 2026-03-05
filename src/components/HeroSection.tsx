import TypedText from "./TypedText";
import { GridScan } from "./GridScan";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative flex items-center justify-center h-screen px-6 pb-16 md:pl-24 overflow-hidden"
            style={{ background: "#080612" }}
        >
            {/* GridScan fills the entire hero background */}
            <div className="absolute inset-0 z-0">
                <GridScan
                    linesColor="#1e1333"
                    scanColor="#a855f7"
                    lineThickness={1}
                    gridScale={0.1}
                    lineStyle="solid"
                    lineJitter={0}
                    scanOpacity={0.4}
                    scanDirection="pingpong"
                    scanSoftness={2}
                    scanGlow={0.5}
                    scanPhaseTaper={0.9}
                    scanDuration={2.0}
                    scanDelay={2.0}
                    scanOnClick
                    enablePost
                    bloomIntensity={0}
                    bloomThreshold={0}
                    bloomSmoothing={0}
                    chromaticAberration={0.002}
                    noiseIntensity={0.01}
                    enableWebcam={false}
                    showPreview={false}
                    sensitivity={0.55}
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
