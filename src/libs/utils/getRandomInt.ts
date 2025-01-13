// ランダムな値を取得 (0 ~ max-1)
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// ランダムな値を取得 (1 ~ max)
const getRandomIntNotZero = (max: number) => {
  return Math.floor(Math.random() * max + 1);
};

export { getRandomInt, getRandomIntNotZero };
