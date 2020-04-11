import { useEffect } from "react";

export const useArt = (opts: {
  active: boolean;
  canvasRef: HTMLCanvasElement | null;
  random: () => number;
  getRandomColor: () => { r: number; g: number; b: number; a: number };
}) => {
  const { active, canvasRef, getRandomColor, random } = opts;

  /**
   * Gradient-filled squares.
   */
  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const ctx = canvasRef?.getContext("2d");

        if (!ctx) {
          return;
        }

        const size = Math.floor(random() * 250) + 12;
        const x = Math.floor(random() * window.innerWidth);
        const y = Math.floor(random() * window.innerHeight);

        const colorA = getRandomColor();
        const colorB = getRandomColor();

        // ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;

        const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
        gradient.addColorStop(0, `rgb(${colorA.r}, ${colorA.g}, ${colorA.b})`);
        gradient.addColorStop(1, `rgb(${colorB.r}, ${colorB.g}, ${colorB.b})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [active, getRandomColor, canvasRef, random]);

  /**
   * Clearing the canvas using squares.
   */
  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const ctx = canvasRef?.getContext("2d");

        if (!ctx) {
          return;
        }

        const size = Math.floor(random() * 250) + 12;
        const x = Math.floor(random() * window.innerWidth);
        const y = Math.floor(random() * window.innerHeight);
        ctx.clearRect(x, y, size, size);
      });
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, [active, getRandomColor, canvasRef, random]);

  /**
   * Slicing lines of colors across the canvas.
   */
  useEffect(() => {
    if (!active) {
      return;
    }

    const ctx = canvasRef?.getContext("2d");
    if (!ctx) {
      return;
    }

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const ctx = canvasRef?.getContext("2d");

        if (!ctx) {
          return;
        }

        const startX = Math.floor(random() * window.innerWidth);
        const startY = Math.floor(random() * window.innerHeight);
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        const x = Math.floor(random() * window.innerWidth);
        const y = Math.floor(random() * window.innerHeight);
        ctx.quadraticCurveTo(
          Math.floor(random() * window.innerWidth),
          Math.floor(random() * window.innerHeight),
          x,
          y
        );

        const color = getRandomColor();
        ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.lineWidth = Math.floor(random() * 15) + 1;
        ctx.stroke();
        ctx.closePath();
      });
    }, 75);

    return () => {
      clearInterval(interval);
    };
  }, [active, getRandomColor, canvasRef, random]);

  /**
   * Random HEX strings, cause why not?
   */
  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = setInterval(() => {
      requestAnimationFrame(() => {
        const ctx = canvasRef?.getContext("2d");

        if (!ctx) {
          return;
        }

        const size = Math.floor(random() * 350) + 20;
        const x = Math.floor(random() * window.innerWidth);
        const y = Math.floor(random() * window.innerHeight);
        const color = getRandomColor();
        ctx.font = `${size}px Fira Code`;
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.fillText(getHexString(32, random), x, y);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [active, getRandomColor, canvasRef, random]);
};

/**
 * Returns a hex string filled with random values.
 */
const getHexString = (maxLength: number, random: () => number) => {
  const filledByteArray = crypto.getRandomValues(
    new Uint8Array(Math.floor(random() * maxLength))
  );
  const hexString = Array.from(filledByteArray)
    .map((byte) => "0" + byte.toString(16))
    .join("");
  return hexString;
};
