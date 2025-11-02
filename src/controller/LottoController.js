import LottoGenerator from '../service/LottoGenerator.js';
import LottoRunner from '../service/LottoRunner.js';
import LottoIO from '../view/LottoIO.js';

class LottoController {
  async run() {
    const lottos = await this.getLottos();

    const lottoRunner = new LottoRunner();
    await this.setWinningNumbers(lottoRunner);
    await this.setBonusNumber(lottoRunner);
  }

  async getLottos() {
    while (true) {
      try {
        const purchaseAmount = await LottoIO.inputPurchaseAmount();
        const lottos = LottoGenerator.sellLottos(purchaseAmount);
        return lottos;
      } catch (error) {
        LottoIO.printErrorMessage(error);
      }
    }
  }

  async setWinningNumbers(lottoRunner) {
    while (true) {
      try {
        const winningNumbers = await LottoIO.inputWinningNumbers();
        lottoRunner.setWinningNumbers(winningNumbers);
        return;
      } catch (error) {
        LottoIO.printErrorMessage(error);
      }
    }
  }

  async setBonusNumber(lottoRunner) {
    while (true) {
      try {
        const bonusNumber = await LottoIO.inputBonusNumber();
        lottoRunner.setBonusNumber(bonusNumber);
        return;
      } catch (error) {
        LottoIO.printErrorMessage(error);
      }
    }
  }
}

export default LottoController;
