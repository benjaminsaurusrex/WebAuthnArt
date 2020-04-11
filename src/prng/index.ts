/**
 * Implementation of xoshiro128 PRNG.
 * Credit: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
 */
export const getRandomFuncFromSeeds = (
  a: number,
  b: number,
  c: number,
  d: number
) => {
  return () => {
    let t = b << 9,
      r = a * 5;
    r = ((r << 7) | (r >>> 25)) * 9;
    c ^= a;
    d ^= b;
    b ^= c;
    a ^= d;
    c ^= t;
    d = (d << 11) | (d >>> 21);
    return (r >>> 0) / 4294967296;
  };
};
