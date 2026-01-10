import React from 'react';
import { RotateCcw, Play, Pause } from 'lucide-react';

const ControlGroup = ({ label, value, onChange, min, max, step, unit }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            <span className="text-sm font-mono text-blue-400">{value} {unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full"
        />
    </div>
);

const Controls = ({ params, setParams, onReset, isPaused, setIsPaused }) => {
    const updateParam = (key, value) => {
        setParams(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="card h-full flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">Configuration</h2>

                <ControlGroup
                    label="Initial Position (x₀)"
                    value={params.x0}
                    onChange={(v) => updateParam('x0', v)}
                    min={-3.5} max={4} step={0.1} unit="m"
                />
                <ControlGroup
                    label="Initial Velocity (v₀)"
                    value={params.v0}
                    onChange={(v) => updateParam('v0', v)}
                    min={-5} max={5} step={0.1} unit="m/s"
                />
                <ControlGroup
                    label="Mass (m)"
                    value={params.m}
                    onChange={(v) => updateParam('m', v)}
                    min={0.1} max={5} step={0.1} unit="kg"
                />
                <ControlGroup
                    label="Spring Constant (k)"
                    value={params.k}
                    onChange={(v) => updateParam('k', v)}
                    min={1} max={20} step={0.5} unit="N/m"
                />
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={onReset}
                    className="btn flex-1 justify-center bg-gray-700 hover:bg-gray-600"
                >
                    <RotateCcw size={18} /> Reset
                </button>
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`btn flex-1 justify-center ${isPaused ? 'bg-green-600 hover:bg-green-500' : 'bg-amber-600 hover:bg-amber-500'}`}
                >
                    {isPaused ? <><Play size={18} /> Resume</> : <><Pause size={18} /> Pause</>}
                </button>
            </div>
        </div>
    );
};

export default Controls;
