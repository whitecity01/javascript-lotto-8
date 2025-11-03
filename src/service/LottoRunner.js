import {
  LOTTO_PRIZE_RULE,
  LOTTO_PROFIT_RATE_RULE,
  LOTTO_RULE,
} from '../constants.js';
import LottoRunnerValidator from './validator/LottoRunnerValidator.js';

class LottoRunner {
  #winningNumbers;
  #bonusNumber;
  constructor() {
    this.#winningNumbers = [];
    this.#bonusNumber = null;
  }

  setWinningNumbers(winningNumbers) {
    LottoRunnerValidator.validateWinningNumbers(winningNumbers);

    this.#winningNumbers = winningNumbers;
  }

  setBonusNumber(bonusNumber) {
    LottoRunnerValidator.validateBonusNumber(
      this.getWinningNumbers(),
      bonusNumber,
    );
    this.#bonusNumber = bonusNumber;
  }

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  run(lottos) {
    const lottoResults = this.generateEmptyLottoResults();
    this.calculateLottoRanks(lottoResults, lottos);
    const profitRate = this.calculateProfitRate(lottoResults, lottos.length);
    return { lottoResults, profitRate };
  }

  generateEmptyLottoResults() {
    return Array(LOTTO_PRIZE_RULE.length + 1).fill(0); // 각 인덱스는 등수를 뜻한다.(0등은 꽝)
  }

  calculateLottoRanks(lottoResults, lottos) {
    lottos.forEach((lotto) => {
      const rank = this.calculateLottoRank(lotto);
      lottoResults[rank] += 1;
    });
  }

  calculateLottoRank(lotto) {
    const { matchCount, isMatchBonusNumber } =
      this.calculateLottoMatchCount(lotto); // {적중 번호 개수(보너스 포함), 보너스 적중 여부}
    const matchedPrize = LOTTO_PRIZE_RULE.find((prizeRule) =>
      this.isValidLottoPrizeRule(prizeRule, matchCount, isMatchBonusNumber),
    );

    if (!matchedPrize) {
      return 0; // 0등은 꽝입니다~
    }
    return matchedPrize.rank;
  }

  calculateLottoMatchCount(lotto) {
    const lottoNumbers = lotto.getNumbers();
    const numbersMatchCount = this.calculateNumbersMatchCount(lottoNumbers);
    const isMatchBonusNumber = this.isMatch(lottoNumbers, this.#bonusNumber);

    const matchCount = numbersMatchCount + Number(isMatchBonusNumber);
    return { matchCount, isMatchBonusNumber };
  }

  calculateNumbersMatchCount(lottoNumbers) {
    const matchNumbers = this.#winningNumbers.filter((winNum) =>
      this.isMatch(lottoNumbers, winNum),
    );
    return matchNumbers.length;
  }

  isMatch(numbers, target) {
    return numbers.includes(target);
  }

  isValidLottoPrizeRule(prizeRule, matchCount, isMatchBonusNumber) {
    const isValidMatchCount = prizeRule.matchCount === matchCount;
    if (prizeRule.needBonus) {
      return isValidMatchCount && isMatchBonusNumber;
    }
    return isValidMatchCount;
  }

  calculateProfitRate(lottoResults, totalLottosCount) {
    const totalPrize = this.calculateTotalPrize(lottoResults);
    const totalPurchaseAmount = totalLottosCount * LOTTO_RULE.PRICE;
    const profitRate = (totalPrize / totalPurchaseAmount) * 100;
    return Number(profitRate).toFixed(LOTTO_PROFIT_RATE_RULE.DECIMAL_SCALE);
  }

  calculateTotalPrize(lottoResults) {
    let totalPrize = 0;
    for (let i = 0; i < LOTTO_PRIZE_RULE.length; i++) {
      const rankCount = lottoResults[LOTTO_PRIZE_RULE[i].rank];
      totalPrize += rankCount * LOTTO_PRIZE_RULE[i].prize;
    }
    return totalPrize;
  }
}

export default LottoRunner;
