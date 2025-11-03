import { LOTTO_RULE, LOTTO_RULE_ERROR } from '../../constants.js';

class LottoRunnerValidator {
  static validateWinningNumbers(winningNumbers) {
    this.validateIsNumbersType(winningNumbers);
    this.validateNumbersLength(winningNumbers);
    this.validateIsNotNumbers(winningNumbers);
    this.validateNumbersInRange(winningNumbers);
    this.validateDuplication(winningNumbers);
  }

  static validateBonusNumber(winningNumbers, bonusNumber) {
    this.validateIsNumberType(bonusNumber);
    this.validateIsNotNumber(bonusNumber);
    this.validateNumberInRange(bonusNumber);
    this.validateIsMatchedWinningNumbers(winningNumbers, bonusNumber);
  }

  static validateIsNumbersType(numbers) {
    for (const number of numbers) {
      this.validateIsNumberType(number);
    }
  }

  static validateIsNumberType(number) {
    if (!Number.isInteger(number)) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBER_RANGE);
    }
  }

  static validateNumbersLength(numbers) {
    if (numbers.length !== LOTTO_RULE.NUMBERS_LENGTH) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBERS_LENGTH);
    }
  }

  static validateIsNotNumbers(numbers) {
    numbers.forEach((number) => {
      this.validateIsNotNumber(number);
    });
  }

  static validateIsNotNumber(number) {
    if (Number.isNaN(number)) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBER_RANGE);
    }
  }

  static validateNumbersInRange(numbers) {
    numbers.forEach((number) => {
      this.validateNumberInRange(number);
    });
  }

  static validateNumberInRange(number) {
    if (number < LOTTO_RULE.MIN_NUMBER || LOTTO_RULE.MAX_NUMBER < number) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBER_RANGE);
    }
  }

  static validateDuplication(numbers) {
    const set = new Set(numbers);
    if (set.size !== numbers.length) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_IS_DUPLICATION_NUMBERS);
    }
  }

  static validateIsMatchedWinningNumbers(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_IS_MATCHED_WINNING_NUMBERS);
    }
  }
}

export default LottoRunnerValidator;
