"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function Mission4ModalInteraction({ onComplete }: { onComplete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [animation, setAnimation] = useState<"fade" | "slide" | "zoom">("fade");

    const getModalStyles = () => {
        const base = "fixed inset-0 z-50 flex items-center justify-center p-4 ";
        const backdrop = "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ";
        const content = "relative bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-white/10 transition-all duration-300 ";

        let animStyles = "";
        if (isOpen) {
            if (animation === "fade") animStyles = "opacity-100 scale-100";
            if (animation === "slide") animStyles = "opacity-100 translate-y-0";
            if (animation === "zoom") animStyles = "opacity-100 scale-100";
        } else {
            if (animation === "fade") animStyles = "opacity-0 pointer-events-none";
            if (animation === "slide") animStyles = "opacity-0 translate-y-10 pointer-events-none";
            if (animation === "zoom") animStyles = "opacity-0 scale-90 pointer-events-none";
        }

        return { base, backdrop: backdrop + (isOpen ? "opacity-100" : "opacity-0"), content: content + animStyles };
    };

    const styles = getModalStyles();

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                {["fade", "slide", "zoom"].map((a) => (
                    <button
                        key={a}
                        onClick={() => setAnimation(a as any)}
                        className={`px-4 py-2 rounded transition-colors ${animation === a ? "bg-purple-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                    >
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
                Open Modal
            </button>

            {/* Modal Overlay */}
            <div className={`${styles.base} ${isOpen ? "" : "pointer-events-none"}`}>
                <div className={styles.backdrop} onClick={() => setIsOpen(false)}></div>
                <div className={styles.content}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Modal Title</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-300 mb-6">
                        This is a demonstration of the {animation} animation style.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-300 hover:bg-white/10 rounded">
                            Cancel
                        </button>
                        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Master Interactions
            </button>
        </div>
    );
}
