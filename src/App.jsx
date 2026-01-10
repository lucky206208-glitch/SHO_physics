import React, { useState, useEffect, useRef } from 'react';
import { Activity, Clock, Zap } from 'lucide-react';
import OscillatorCanvas from './components/OscillatorCanvas';
import Controls from './components/Controls';
import TrajectoryGraph from './components/TrajectoryGraph';
import { calculateParameters, getPositionAtTime, getVelocityAtTime, getEnergy } from './utils/physics';

function App() {
  const [params, setParams] = useState({
    m: 1.0,
    k: 5.0,
    x0: 2.0,
    v0: 0.0
  });

  const [simState, setSimState] = useState({
    time: 0,
    paused: true // Start paused so user can set up
  });

  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Derived Physics Parameters (Static based on config)
  const physics = calculateParameters(params.m, params.k, params.x0, params.v0);

  // Derived Current State
  const currentX = getPositionAtTime(simState.time, physics);
  const currentV = getVelocityAtTime(simState.time, physics);
  const energy = getEnergy(currentX, currentV, physics.mass, physics.springK);

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = (time - previousTimeRef.current) / 1000;

      // Limit dt to prevent jumps if tab was inactive
      const dt = Math.min(deltaTime, 0.1);

      setSimState(prev => ({
        ...prev,
        time: prev.time + dt
      }));
    }
    previousTimeRef.current = time;
    if (!simState.paused) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!simState.paused) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      previousTimeRef.current = undefined;
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [simState.paused]);

  const handleReset = () => {
    setSimState({ time: 0, paused: true });
    previousTimeRef.current = undefined;
  };

  // Reset time if initial conditions change significantly? 
  // Design choice: No, let user experiment "live" with m/k, 
  // but x0/v0 implies a new experiment usually.
  // For now, let's keep it manual.

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8 font-inter">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/40">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Harmonic Oscillator
            </h1>
            <p className="text-stone-400 text-sm">Interactive Physics Simulation</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Visualization Col */}
          <div className="lg:col-span-2 space-y-6">

            {/* Simulation Canvas */}
            <div className="card bg-stone-900 border-stone-800">
              <OscillatorCanvas x={currentX} parameters={physics} />
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card bg-stone-900 border-stone-800 p-4 flex flex-col items-center justify-center text-center">
                <Zap className="text-yellow-400 mb-2" size={20} />
                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Total Energy</span>
                <span className="text-xl font-mono mt-1 text-white">{energy.total.toFixed(2)} J</span>
              </div>
              <div className="card bg-stone-900 border-stone-800 p-4 flex flex-col items-center justify-center text-center">
                <Clock className="text-emerald-400 mb-2" size={20} />
                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Period (T)</span>
                <span className="text-xl font-mono mt-1 text-white">{(2 * Math.PI / physics.omega).toFixed(2)} s</span>
              </div>
              <div className="card bg-stone-900 border-stone-800 p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-blue-400 font-bold font-mono">ω</div>
                <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider">Angular Freq</span>
                <span className="text-xl font-mono mt-1 text-white">{physics.omega.toFixed(2)} rad/s</span>
              </div>
            </div>

            {/* Trajectory Graph */}
            <div className="card bg-stone-900 border-stone-800 h-64 overflow-hidden relative">
              <div className="absolute top-3 left-4 text-xs font-bold text-stone-500 z-10">POSITION vs TIME</div>
              <TrajectoryGraph parameters={physics} currentTime={simState.time} />
            </div>

          </div>

          {/* Controls Col */}
          <div className="lg:col-span-1">
            <Controls
              params={params}
              setParams={setParams}
              onReset={handleReset}
              isPaused={simState.paused}
              setIsPaused={(p) => setSimState(s => ({ ...s, paused: p }))}
            />

            {/* Instructions / Info */}
            <div className="mt-6 p-4 rounded-xl bg-blue-900/20 border border-blue-800/50 text-sm text-blue-200/80">
              <h3 className="font-semibold text-blue-200 mb-2">Did you know?</h3>
              <p>
                In a simple harmonic oscillator, the total mechanical energy is conserved.
                As the mass moves, energy transforms between kinetic energy (velocity) and potential energy (spring stretch).
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
