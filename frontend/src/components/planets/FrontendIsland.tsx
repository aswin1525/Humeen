"use client";

import { useState } from "react";
import { Layout, Type, Image as ImageIcon, MousePointer2 } from "lucide-react";

export default function FrontendIsland() {
    const [elements, setElements] = useState<string[]>([]);

    const addElement = (type: string) => {
        setElements([...elements, type]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            {/* Toolbox */}
            <div className="bg-zinc-900/80 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                    <Layout className="w-5 h-5" /> UI Toolbox
                </h3>
                <div className="space-y-4">
                    <button
                        onClick={() => addElement("button")}
                        className="w-full p-4 bg-zinc-800 hover:bg-cyan-900/50 border border-zinc-700 hover:border-cyan-500/50 rounded-xl transition-all flex items-center gap-3 group"
                    >
                        <MousePointer2 className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
                        <span>Action Button</span>
                    </button>
                    <button
                        onClick={() => addElement("card")}
                        className="w-full p-4 bg-zinc-800 hover:bg-cyan-900/50 border border-zinc-700 hover:border-cyan-500/50 rounded-xl transition-all flex items-center gap-3 group"
                    >
                        <Layout className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
                        <span>Info Card</span>
                    </button>
                    <button
                        onClick={() => addElement("text")}
                        className="w-full p-4 bg-zinc-800 hover:bg-cyan-900/50 border border-zinc-700 hover:border-cyan-500/50 rounded-xl transition-all flex items-center gap-3 group"
                    >
                        <Type className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
                        <span>Text Block</span>
                    </button>
                </div>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-2 bg-zinc-950 rounded-2xl border border-zinc-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-mono border border-cyan-500/30">
                    LIVE PREVIEW
                </div>

                <div className="p-12 h-full overflow-y-auto space-y-6 flex flex-col items-center justify-center">
                    {elements.length === 0 && (
                        <div className="text-center text-zinc-600">
                            <Layout className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>Drag elements here to build your interface</p>
                        </div>
                    )}

                    {elements.map((el, i) => (
                        <div key={i} className="animate-in fade-in zoom-in duration-300 w-full max-w-md">
                            {el === "button" && (
                                <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
                                    Click Me
                                </button>
                            )}
                            {el === "card" && (
                                <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl">
                                    <div className="h-4 w-1/3 bg-zinc-700 rounded mb-4"></div>
                                    <div className="h-2 w-full bg-zinc-800 rounded mb-2"></div>
                                    <div className="h-2 w-2/3 bg-zinc-800 rounded"></div>
                                </div>
                            )}
                            {el === "text" && (
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                                    Futuristic Headline
                                </h2>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
