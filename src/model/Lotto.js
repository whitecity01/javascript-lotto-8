import { LOTTO_RULE, LOTTO_RULE_ERROR } from '../constants';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateNumbersLength(numbers);
    this.#validateNumbersRange(numbers);
    this.#validateDuplication(numbers);
  }

  #validateNumbersLength(numbers) {
    if (numbers.length !== LOTTO_RULE.NUMBERS_LENGTH) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBERS_LENGTH);
    }
  }

  #validateNumberRange(number) {
    if (number < LOTTO_RULE.MIN_NUMBER || LOTTO_RULE.MAX_NUMBER < number) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_NUMBER_RANGE);
    }
  }

  #validateNumbersRange(numbers) {
    numbers.forEach((number) => this.#validateNumberRange(number));
  }

  #validateDuplication(numbers) {
    const set = new Set(numbers);
    if (set.size !== numbers.length) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_IS_DUPLICATION_NUMBERS);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
