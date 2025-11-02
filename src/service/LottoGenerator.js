import LottoGeneratorValidator from './validator/LottoGeneratorValidator.js';

class LottoGenerator {
  static sellLottos(purchaseAmount) {
    LottoGeneratorValidator.validatePurchaseAmount(purchaseAmount);
  }
}

export default LottoGenerator;
