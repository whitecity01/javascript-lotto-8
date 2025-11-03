import { LOTTO_RULE } from '../constants.js';
import Lotto from '../model/Lotto.js';
import { getSortedRandomNumbers } from '../utils/random.js';
import LottoGeneratorValidator from './validator/LottoGeneratorValidator.js';

class LottoGenerator {
  static sellLottos(purchaseAmount) {
    LottoGeneratorValidator.validatePurchaseAmount(purchaseAmount);

    const lottoCount = this.calculateLottoCount(purchaseAmount);
    return this.generateLottos(lottoCount);
  }

  static generateLottos(lottoCount) {
    const lottos = [];
    for (let i = 0; i < lottoCount; i++) {
      const lotto = this.generateLotto();
      lottos.push(lotto);
    }
    return lottos;
  }

  static generateLotto() {
    const randomNumbers = getSortedRandomNumbers(
      LOTTO_RULE.MIN_NUMBER,
      LOTTO_RULE.MAX_NUMBER,
      LOTTO_RULE.NUMBERS_LENGTH,
    );

    const lotto = new Lotto(randomNumbers);
    return lotto;
  }

  static calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO_RULE.PRICE;
  }
}

export default LottoGenerator;
