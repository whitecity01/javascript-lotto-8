import { Console } from '@woowacourse/mission-utils';
import { LOTTO_IO_MESSAGES } from '../constants.js';

class LottoIO {
  static async inputPurchaseAmount() {
    const input = await Console.readLineAsync(
      LOTTO_IO_MESSAGES.INPUT_PURCHASE_AMOUNT,
    );
    const purchaseAmount = Number(input);
    return purchaseAmount;
  }

  static async inputWinningNumbers() {
    const input = await Console.readLineAsync(
      LOTTO_IO_MESSAGES.INPUT_WINNING_NUMBERS,
    );
    const winningNumbers = input.split(',').map(Number);
    return winningNumbers;
  }

  static async inputBonusNumber() {
    const input = await Console.readLineAsync(
      LOTTO_IO_MESSAGES.INPUT_BONUS_NUMBER,
    );
    const bonusNumber = Number(input);
    return bonusNumber;
  }

  static printPurchasedLottos(lottos) {
    this.printLottosCount(lottos);
    this.printLottosNumbers(lottos);
  }

  static printLottosCount(lottos) {
    const lottoCount = lottos.length;
    Console.print(`\n${lottoCount}${LOTTO_IO_MESSAGES.PURCHASED_LOTTO_COUNT}`);
  }

  static printLottosNumbers(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  }

  static printErrorMessage(error) {
    Console.print(error.message);
  }
}

export default LottoIO;
