import TypedText from "./TypedText";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative flex items-center justify-center h-screen px-6 pb-16 md:pl-24 overflow-hidden"
        >
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
