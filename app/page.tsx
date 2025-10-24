'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const message = "Today, Jonathan, is your day. You gotta go to sleep. It's night.";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawLion = (mouthOpen: number) => {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % canvas.width;
        const y = (i * 73) % (canvas.height / 2);
        ctx.fillRect(x, y, 2, 2);
      }

      // Moon
      ctx.fillStyle = '#f0e68c';
      ctx.beginPath();
      ctx.arc(100, 100, 40, 0, Math.PI * 2);
      ctx.fill();

      // Lion face
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Mane
      ctx.fillStyle = '#d4a574';
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * 100;
        const y = centerY + Math.sin(angle) * 100;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // Head
      ctx.fillStyle = '#f4a460';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#2c1810';
      ctx.beginPath();
      ctx.arc(centerX - 30, centerY - 20, 12, 0, Math.PI * 2);
      ctx.arc(centerX + 30, centerY - 20, 12, 0, Math.PI * 2);
      ctx.fill();

      // Eye highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX - 26, centerY - 24, 4, 0, Math.PI * 2);
      ctx.arc(centerX + 34, centerY - 24, 4, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#2c1810';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 10);
      ctx.lineTo(centerX - 10, centerY);
      ctx.lineTo(centerX + 10, centerY);
      ctx.closePath();
      ctx.fill();

      // Mouth
      ctx.strokeStyle = '#2c1810';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 10);
      ctx.lineTo(centerX, centerY + 20);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX - 20, centerY + 30, 20, 0, Math.PI * (mouthOpen * 0.5));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + 20, centerY + 30, 20, Math.PI * (1 - mouthOpen * 0.5), Math.PI);
      ctx.stroke();

      // Whiskers
      ctx.strokeStyle = '#2c1810';
      ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY + i * 15);
        ctx.lineTo(centerX - 130, centerY + i * 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + 80, centerY + i * 15);
        ctx.lineTo(centerX + 130, centerY + i * 20);
        ctx.stroke();
      }
    };

    drawLion(0);
  }, []);

  const animate = (startTime: number, duration: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setProgress(progress);

      const mouthOpen = Math.sin(elapsed * 0.01) * 0.5 + 0.5;

      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % canvas.width;
        const y = (i * 73) % (canvas.height / 2);
        ctx.fillRect(x, y, 2, 2);
      }

      // Moon
      ctx.fillStyle = '#f0e68c';
      ctx.beginPath();
      ctx.arc(100, 100, 40, 0, Math.PI * 2);
      ctx.fill();

      // Lion face
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Mane
      ctx.fillStyle = '#d4a574';
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * 100;
        const y = centerY + Math.sin(angle) * 100;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      // Head
      ctx.fillStyle = '#f4a460';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#2c1810';
      ctx.beginPath();
      ctx.arc(centerX - 30, centerY - 20, 12, 0, Math.PI * 2);
      ctx.arc(centerX + 30, centerY - 20, 12, 0, Math.PI * 2);
      ctx.fill();

      // Eye highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX - 26, centerY - 24, 4, 0, Math.PI * 2);
      ctx.arc(centerX + 34, centerY - 24, 4, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.fillStyle = '#2c1810';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 10);
      ctx.lineTo(centerX - 10, centerY);
      ctx.lineTo(centerX + 10, centerY);
      ctx.closePath();
      ctx.fill();

      // Mouth
      ctx.strokeStyle = '#2c1810';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 10);
      ctx.lineTo(centerX, centerY + 20);
      ctx.stroke();

      const mouthSize = 15 + mouthOpen * 15;
      ctx.beginPath();
      ctx.arc(centerX - 20, centerY + 30, mouthSize, 0, Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + 20, centerY + 30, mouthSize, 0, Math.PI);
      ctx.stroke();

      // Whiskers
      ctx.strokeStyle = '#2c1810';
      ctx.lineWidth = 2;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY + i * 15);
        ctx.lineTo(centerX - 130, centerY + i * 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + 80, centerY + i * 15);
        ctx.lineTo(centerX + 130, centerY + i * 20);
        ctx.stroke();
      }

      // Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px system-ui';
      ctx.textAlign = 'center';
      const words = message.split(' ');
      const wordsToShow = Math.floor(progress * words.length);
      const currentText = words.slice(0, wordsToShow + 1).join(' ');

      const maxWidth = canvas.width - 100;
      const lineHeight = 35;
      const textLines: string[] = [];
      let currentLine = '';

      currentText.split(' ').forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          textLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) textLines.push(currentLine);

      const startY = canvas.height - 120;
      textLines.forEach((line, index) => {
        ctx.fillText(line, centerX, startY + index * lineHeight);
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(draw);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlay = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setProgress(0);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    speak();
    animate(performance.now(), 8000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '900px',
        width: '100%'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
          fontSize: '32px'
        }}>
          Lion's Bedtime Message for Jonathan
        </h1>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{
            width: '100%',
            height: 'auto',
            border: '3px solid #333',
            borderRadius: '10px',
            display: 'block',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={handlePlay}
          disabled={isPlaying}
          style={{
            width: '100%',
            padding: '15px 30px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            background: isPlaying ? '#999' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '10px',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            if (!isPlaying) {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {isPlaying ? '🦁 Lion is Speaking...' : '▶️ Play Lion\'s Message'}
        </button>

        {isPlaying && (
          <div style={{
            marginTop: '20px',
            background: '#f0f0f0',
            borderRadius: '10px',
            padding: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '10px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '5px',
              width: `${progress * 100}%`,
              transition: 'width 0.1s'
            }} />
          </div>
        )}
      </div>
    </div>
  );
}
