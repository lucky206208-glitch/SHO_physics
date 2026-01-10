import React, { useRef, useEffect } from 'react';

const OscillatorCanvas = ({ x, parameters }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const render = () => {
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            ctx.clearRect(0, 0, width, height);

            // Configuration
            const centerY = height / 2;
            const wallX = 60; // Fixed wall position
            // Equilibrium point should be far enough from wall to accommodate max amplitude
            // Let's center it more to the right if width is small, or just give it a fixed offset from wall
            const centerX = Math.max(width / 2 + 50, wallX + 250);
            const scale = 45; // Slightly smaller scale to fit more range
            const massSize = 44;

            const massCenterScreenX = centerX + x * scale;

            // Draw Floor
            ctx.strokeStyle = '#262626';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, centerY + massSize / 2);
            ctx.lineTo(width, centerY + massSize / 2);
            ctx.stroke();

            // Draw Grid/Guides (Equilibrium)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, height);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw Wall
            const gradient = ctx.createLinearGradient(wallX - 40, 0, wallX, 0);
            gradient.addColorStop(0, '#171717');
            gradient.addColorStop(1, '#404040');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, centerY - 60, wallX, 120);

            // Wall Edge Line
            ctx.strokeStyle = '#525252';
            ctx.lineWidth = 2;
            ctx.strokeRect(wallX - 2, centerY - 60, 2, 120);

            // Draw Spring
            const startX = wallX;
            const endX = massCenterScreenX - massSize / 2;

            ctx.beginPath();
            ctx.strokeStyle = '#10b981'; // Emerald-500
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const springSegments = 25;
            const springLength = endX - startX;
            const springWidth = 20;

            ctx.moveTo(startX, centerY);
            for (let i = 0; i <= springSegments; i++) {
                const segX = startX + (springLength * i) / springSegments;
                let offset = 0;
                if (i > 0 && i < springSegments) {
                    offset = i % 2 === 0 ? springWidth / 2 : -springWidth / 2;
                    // Compress the zigzag width slightly if spring is very short
                    if (springLength < 50) offset *= (springLength / 50);
                }
                ctx.lineTo(segX, centerY + offset);
            }
            ctx.stroke();

            // Draw Mass (Box with rounded corners style)
            ctx.fillStyle = '#ef4444';
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';

            // Draw as a rounded rectangle
            const r = 4;
            const mx = massCenterScreenX - massSize / 2;
            const my = centerY - massSize / 2;
            ctx.beginPath();
            ctx.moveTo(mx + r, my);
            ctx.lineTo(mx + massSize - r, my);
            ctx.quadraticCurveTo(mx + massSize, my, mx + massSize, my + r);
            ctx.lineTo(mx + massSize, my + massSize - r);
            ctx.quadraticCurveTo(mx + massSize, my + massSize, mx + massSize - r, my + massSize);
            ctx.lineTo(mx + r, my + massSize);
            ctx.quadraticCurveTo(mx, my + massSize, mx, my + massSize - r);
            ctx.lineTo(mx, my + r);
            ctx.quadraticCurveTo(mx, my, mx + r, my);
            ctx.closePath();
            ctx.fill();

            ctx.shadowBlur = 0;

            // Draw Labels
            ctx.font = '600 13px Inter';
            ctx.fillStyle = '#ededed';
            ctx.textAlign = 'center';
            ctx.fillText(`${x.toFixed(2)}m`, massCenterScreenX, centerY - massSize / 2 - 15);

            ctx.font = '500 11px Inter';
            ctx.fillStyle = '#737373';
            ctx.fillText('Equilibrium', centerX, centerY + massSize / 2 + 25);
        };

        render();
    }, [x, parameters]);


    return (
        <canvas
            ref={canvasRef}
            className="w-full h-64 bg-stone-900/50 rounded-xl"
            style={{ background: 'rgba(23, 23, 23, 0.5)' }}
        />
    );
};

export default OscillatorCanvas;
