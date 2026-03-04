import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/* ── Styled input ── */
const Field = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    multiline = false,
    disabled = false,
}: {
    label: string;
    name: keyof FormData;
    type?: string;
    value: string;
    onChange: (name: keyof FormData, val: string) => void;
    multiline?: boolean;
    disabled?: boolean;
}) => (
    <div className="flex flex-col gap-2">
        {/* comment-style label */}
        <label
            className="text-sm font-mono"
            style={{ color: "rgba(192,132,252,0.9)" }}
        >
            {`// ${label}`}
        </label>
        {multiline ? (
            <textarea
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                disabled={disabled}
                rows={6}
                placeholder="Value"
                className="w-full resize-none rounded text-sm font-mono text-gray-100 placeholder-gray-500 outline-none transition-colors duration-150"
                style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "12px 14px",
                }}
                onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)")
                }
                onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.15)")
                }
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                disabled={disabled}
                placeholder="Value"
                className="w-full rounded text-sm font-mono text-gray-100 placeholder-gray-500 outline-none transition-colors duration-150"
                style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "12px 14px",
                }}
                onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(168,85,247,0.6)")
                }
                onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.15)")
                }
            />
        )}
    </div>
);

/* ── Main component ── */
const ContactSection = () => {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<FormState>("idle");

    const handleChange = (name: keyof FormData, val: string) => {
        setForm((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        /* Replace the URL below with your own form endpoint (Formspree, Netlify, etc.) */
        try {
            const res = await fetch("https://formspree.io/f/xqedrnkg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus("sent");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const isBusy = status === "sending";

    return (
        <section
            id="contact"
            className="flex flex-col"
            style={{ height: "100vh", paddingTop: "56px" }}
        >
            <div
                className="flex flex-1 overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* ── Col 1: Sidebar (desktop only) ── */}
                <div
                    className="hidden md:flex shrink-0 flex-col overflow-hidden"
                    style={{
                        width: "190px",
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.7)",
                    }}
                >
                    <div
                        className="px-3 py-2 text-sm font-mono text-gray-600 tracking-widest uppercase select-none shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        explorer
                    </div>

                    <div className="overflow-y-auto flex-1 pt-2 pb-4">
                        {/* Folder row */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 text-sm font-mono text-gray-300 select-none">
                            <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="currentColor"
                                className="rotate-90 text-gray-500 shrink-0"
                            >
                                <path d="M3 2l4 3-4 3V2z" />
                            </svg>
                            <span>contact-me</span>
                        </div>

                        {/* File row — active */}
                        <div
                            className="flex items-center py-0.5 text-sm font-mono text-white bg-white/10 select-none cursor-default"
                            style={{ paddingLeft: "22px" }}
                        >
                            <span className="w-2.5 shrink-0" />
                            send_a_message
                        </div>
                    </div>
                </div>

                {/* ── Col 2: Editor area ── */}
                <div
                    className="flex flex-col flex-1 overflow-hidden"
                    style={{ background: "rgba(10,8,22,0.55)" }}
                >
                    {/* Tab bar */}
                    <div
                        className="flex items-stretch shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-white bg-white/5 cursor-default"
                            style={{
                                borderRight: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            <span>send_a_message</span>
                            <span className="text-gray-600 ml-1">×</span>
                        </div>
                    </div>

                    {/* Editor content */}
                    <div className="flex flex-1 overflow-y-auto justify-center items-start">
                        <div className="w-full max-w-2xl px-4 sm:px-8 md:px-14 py-6 sm:py-12">
                            {status === "sent" ? (
                                /* Success state */
                                <div className="flex flex-col items-center gap-5 text-center px-6">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{
                                            background: "rgba(168,85,247,0.15)",
                                            border: "1px solid rgba(168,85,247,0.3)",
                                        }}
                                    >
                                        <svg
                                            width="28"
                                            height="28"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#a855f7"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <p className="text-base font-mono text-gray-100">
                                        message sent!
                                    </p>
                                    <p className="text-sm font-mono text-gray-400">
                                        {"// I'll get back to you soon"}
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-2 text-sm font-mono text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        send another →
                                    </button>
                                </div>
                            ) : (
                                /* Form */
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5 w-full"
                                >
                                    {/* Header comment */}
                                    <div className="mb-2">
                                        <p className="text-base font-mono text-gray-500">
                                            {"/* send_a_message */"}
                                        </p>
                                    </div>

                                    <Field
                                        label="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={isBusy}
                                    />
                                    <Field
                                        label="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={isBusy}
                                    />
                                    <Field
                                        label="subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        disabled={isBusy}
                                    />
                                    <Field
                                        label="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        multiline
                                        disabled={isBusy}
                                    />

                                    {status === "error" && (
                                        <p className="text-sm font-mono text-red-400">
                                            {
                                                "// error sending — please try again"
                                            }
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={
                                            isBusy ||
                                            !form.name ||
                                            !form.email ||
                                            !form.message
                                        }
                                        className="w-full py-3 text-sm font-mono tracking-widest transition-all duration-200 rounded disabled:opacity-40 disabled:cursor-not-allowed"
                                        style={{
                                            background: isBusy
                                                ? "rgba(168,85,247,0.3)"
                                                : "rgba(168,85,247,0.9)",
                                            color: "white",
                                            border: "1px solid rgba(168,85,247,0.5)",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isBusy)
                                                e.currentTarget.style.background =
                                                    "rgba(168,85,247,1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isBusy)
                                                e.currentTarget.style.background =
                                                    "rgba(168,85,247,0.9)";
                                        }}
                                    >
                                        {isBusy ? "sending..." : "submit"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
