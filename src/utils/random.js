import { Random } from '@woowacourse/mission-utils';

export const getSortedRandomNumbers = (min, max, count) => {
  const randomNumbers = getRandomNumbers(min, max, count);
  randomNumbers.sort((a, b) => a - b);
  return randomNumbers;
};

export const getRandomNumbers = (min, max, count) => {
  return Random.pickUniqueNumbersInRange(min, max, count);
};
