import LottoRunnerValidator from './validator/LottoRunnerValidator.js';

class LottoRunner {
  #numbersList;
  #winningNumbers;
  #bonusNumber;
  constructor() {
    this.#numbersList = [];
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
}

export default LottoRunner;
