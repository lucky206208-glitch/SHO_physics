import React, { useRef, useEffect } from 'react';
import { getPositionAtTime } from '../utils/physics';

const TrajectoryGraph = ({ parameters, currentTime }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Fit to container (handle resize in a real app, here simple)
        const render = () => {
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            ctx.clearRect(0, 0, width, height);

            // Settings
            const timeScale = 50; // 50px per second
            const valueScale = 30; // 30px per meter
            const paddingLeft = 40;
            const centerY = height / 2;

            // Draw Axes
            ctx.strokeStyle = '#404040';
            ctx.lineWidth = 1;

            // X-axis (Time)
            ctx.beginPath();
            ctx.moveTo(paddingLeft, centerY);
            ctx.lineTo(width, centerY);
            ctx.stroke();

            // Y-axis (Position)
            ctx.beginPath();
            ctx.moveTo(paddingLeft, 0);
            ctx.lineTo(paddingLeft, height);
            ctx.stroke();

            // Plot function x(t)
            // We plot from t=0 to t_max that fits screen
            const maxT = (width - paddingLeft) / timeScale;

            ctx.beginPath();
            ctx.strokeStyle = '#3b82f6'; // Blue-500
            ctx.lineWidth = 2;

            let first = true;
            for (let t = 0; t <= maxT; t += 0.05) {
                const val = getPositionAtTime(t, parameters);
                const plotX = paddingLeft + t * timeScale;
                const plotY = centerY - val * valueScale; // -y for canvas coords

                if (first) {
                    ctx.moveTo(plotX, plotY);
                    first = false;
                } else {
                    ctx.lineTo(plotX, plotY);
                }
            }
            ctx.stroke();

            // Draw Current Time Marker
            // We only show marker if it's within the view window
            // For a scrolling graph we'd offset 't', but let's just loop the time or clamp?
            // Let's assume infinite scroll or fixed window? 
            // Fixed window [0, 10s] is easy.
            // If t > maxT, maybe wrap mod maxT or just let it go off screen?
            // Let's just draw it where it is.

            const currentX = paddingLeft + currentTime * timeScale;
            const currentVal = getPositionAtTime(currentTime, parameters);
            const currentY = centerY - currentVal * valueScale;

            if (currentX < width) {
                ctx.fillStyle = '#ef4444';
                ctx.beginPath();
                ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
                ctx.fill();

                // Dotted line to axis
                ctx.setLineDash([4, 4]);
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(currentX, centerY); // Vertical projection? No, to time axis
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(paddingLeft, currentY); // Horizontal projection to position axis
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Labels
            ctx.font = '10px Inter';
            ctx.fillStyle = '#a3a3a3';
            ctx.fillText('Time (s)', width - 40, centerY + 15);
            ctx.fillText('Position (m)', 5, 10);

            // Ticks? Maybe simple 1s ticks
            for (let t = 0; t < maxT; t += 1) {
                ctx.fillText(t.toString(), paddingLeft + t * timeScale, centerY + 15);
            }
        };

        render();
    }, [parameters, currentTime]);

    return <canvas ref={canvasRef} className="w-full h-full rounded-lg" />;
};

export default TrajectoryGraph;
