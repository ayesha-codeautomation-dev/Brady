export const lerp = (start: number, end: number, amount: number, allowNegatives = false) => {
  const result = start * (1 - amount) + end * amount;
  if (!allowNegatives && result < 0.0001) return 0;
  return result;
};

export const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

// http://indiegamr.com/generate-repeatable-random-numbers-in-js/
export const seededRandom = (seed = 6, max = 0, min = 1) => {
  max = max || 1;
  min = min || 0;
  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;
  return min + rnd * (max - min);
};
