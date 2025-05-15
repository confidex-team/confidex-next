'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  hoverColor: string;
  isMoving: boolean;
  opacity: number;
  character: string;
  drop: number;
}

const MatrixBackground: React.FC<{ hover: boolean }> = ({ hover }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Fill with black background immediately on resize
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Combined configuration
    const spacing = 18;
    const fontSize = 16;
    let isPhone = window.innerWidth <= 768;
    
    const rows = isPhone? Math.ceil(window.innerHeight / spacing) + 10 : Math.ceil(window.innerHeight / spacing) + 2;
    const cols = Math.ceil(window.innerWidth / spacing) + 2;
    const maxTravelDistance = spacing / 3;
    const influenceRadius = 125;
    const matrix = 'CONFIDEXbaseH{}*></"$@&';

    const dimmedBlue = 'rgba(100, 100, 100, 0.030)';
    const fullBlue = 'rgba(189, 230, 246, 0.050)';

    const getRandomCharacter = (): string => {
      return matrix.charAt(Math.floor(Math.random() * matrix.length));
    };

    // Initialize points with both hover and drop behavior
    const points: Point[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        points.push({
          x: j * spacing,
          y: i * spacing,
          originalX: j * spacing,
          originalY: i * spacing,
          color: dimmedBlue,
          hoverColor: fullBlue,
          isMoving: false,
          opacity: 1,
          character: getRandomCharacter(),
          drop: 1
        });
      }
    }

    let mousePos = { x: 0, y: 0 };

    const animate = () => {
      // Use a more opaque black for the background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isMouseOutside = mousePos.x <= 0 || mousePos.y <= 0 || 
                            mousePos.x > canvas.width || mousePos.y > canvas.height;
      const currentInfluenceRadius = isMouseOutside ? 0 : influenceRadius;
      const influenceRadiusSquared = currentInfluenceRadius * currentInfluenceRadius;

      points.forEach((point) => {
        // Mouse interaction effect - optimized distance calculation
        const dx = mousePos.x - point.x;
        const dy = mousePos.y - point.y;
        const distanceSquared = dx * dx + dy * dy;

        // Only apply hover effects if hover prop is true
        if (hover) {
          // Handle hover effect - only calculate if within influence radius
          if (distanceSquared < influenceRadiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const force = (currentInfluenceRadius - distance) / currentInfluenceRadius;
            const forceFactor = force * 0.05;
            
            let newX = point.x + dx * forceFactor;
            let newY = point.y + dy * forceFactor;

            // Optimized travel distance calculation
            const dxTravel = newX - point.originalX;
            const dyTravel = newY - point.originalY;
            const travelDistanceSquared = dxTravel * dxTravel + dyTravel * dyTravel;

            if (travelDistanceSquared > maxTravelDistance * maxTravelDistance) {
              const angle = Math.atan2(dyTravel, dxTravel);
              newX = point.originalX + Math.cos(angle) * maxTravelDistance;
              newY = point.originalY + Math.sin(angle) * maxTravelDistance;
            }

            point.isMoving = newX !== point.x || newY !== point.y;
            point.x = newX;
            point.y = newY;
            point.color = point.isMoving ? point.hoverColor : fullBlue;
          } else {
            // Optimized reset position calculation
            const dxReset = point.originalX - point.x;
            const dyReset = point.originalY - point.y;
            point.x += dxReset * 0.1;
            point.y += dyReset * 0.1;
            point.isMoving = Math.abs(dxReset) > 0.01 || Math.abs(dyReset) > 0.01;
            point.color = point.isMoving ? point.hoverColor : dimmedBlue;
          }
        } else {
          // When hover is false, keep points in their original position
          point.x = point.originalX;
          point.y = point.originalY;
          point.color = dimmedBlue;
        }

        // Optimized character change logic
        if ((point.isMoving || Math.random() < 0.02) && Math.random() < 0.2) {
          point.character = getRandomCharacter();
        }

        // Draw the character
        ctx.fillStyle = point.color;
        ctx.globalAlpha = point.opacity;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(point.character, point.x, point.y);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPhone && hover) {
        mousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleResize = () => {
      resizeCanvas();
      isPhone = window.innerWidth <= 768;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [year, hover]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
    />
  );
};

export default MatrixBackground;