"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Mission6CodeSnippet({ onComplete }: { onComplete: () => void }) {
    const [selectedVariant, setSelectedVariant] = useState<"primary" | "secondary" | "danger">("primary");
    const [copied, setCopied] = useState(false);

    const snippets = {
        primary: `<button className="bg-blue-500 text-white px-4 py-2 rounded">\n  Primary Action\n</button>`,
        secondary: `<button className="bg-gray-200 text-gray-800 px-4 py-2 rounded">\n  Secondary Action\n</button>`,
        danger: `<button className="bg-red-500 text-white px-4 py-2 rounded">\n  Delete Item\n</button>`,
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[selectedVariant]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
                {(["primary", "secondary", "danger"] as const).map((v) => (
                    <button
                        key={v}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 rounded capitalize transition-colors ${selectedVariant === v ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                    >
                        {v}
                    </button>
                ))}
            </div>

            <div className="w-full relative group">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                    >
                        {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                    </button>
                </div>
                <pre className="bg-gray-950 p-6 rounded-xl border border-white/10 overflow-x-auto text-sm font-mono text-gray-300">
                    {snippets[selectedVariant]}
                </pre>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Unlock Code
            </button>
        </div>
    );
}
