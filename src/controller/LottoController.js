import LottoIO from '../view/LottoIO.js';

class LottoController {
  async run() {
    const lottos = await LottoIO.inputPurchaseAmount();
    const winningNumbers = await LottoIO.inputWinningNumbers();
    const bonusNumber = await LottoIO.inputBonusNumber();
  }
}

export default LottoController;
