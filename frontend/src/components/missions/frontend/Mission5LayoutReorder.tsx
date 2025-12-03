"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function Mission5LayoutReorder({ onComplete }: { onComplete: () => void }) {
    const [items, setItems] = useState(["Block A", "Block B", "Block C"]);

    const moveItem = (index: number, direction: "up" | "down") => {
        const newItems = [...items];
        if (direction === "up" && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
        } else if (direction === "down" && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        }
        setItems(newItems);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
            <div className="w-full space-y-4">
                {items.map((item, index) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <span className="font-bold text-lg">{item}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => moveItem(index, "up")}
                                disabled={index === 0}
                                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => moveItem(index, "down")}
                                disabled={index === items.length - 1}
                                className="p-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ArrowDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full p-6 bg-black/40 rounded-xl border border-white/5">
                <h3 className="text-sm text-gray-400 mb-4">Live Preview</h3>
                <div className="flex gap-4">
                    {items.map((item) => (
                        <div key={item} className="flex-1 h-32 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 rounded-lg">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={onComplete}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-white shadow-lg hover:shadow-green-500/25 transition-all hover:scale-105"
            >
                Submit Layout
            </button>
        </div>
    );
}
