import { LOTTO_RULE, LOTTO_RULE_ERROR } from '../../constants.js';

class LottoGeneratorValidator {
  static validatePurchaseAmount(purchaseAmount) {
    this.validateIsNotNumber(purchaseAmount);
    this.validateHasNotEnoughMoney(purchaseAmount);
    this.validateIsNotDivisibleByPrice(purchaseAmount);
  }

  static validateIsNotNumber(value) {
    if (Number.isNaN(value)) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_PURCHASE_COUNT);
    }
  }

  static validateHasNotEnoughMoney(money) {
    if (money < LOTTO_RULE.PRICE) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_PURCHASE_COUNT);
    }
  }

  static validateIsNotDivisibleByPrice(money) {
    if (money % LOTTO_RULE.PRICE !== 0) {
      throw new Error(LOTTO_RULE_ERROR.INVALID_PURCHASE_COUNT);
    }
  }
}

export default LottoGeneratorValidator;
