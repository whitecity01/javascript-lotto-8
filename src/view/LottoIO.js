import { Console } from '@woowacourse/mission-utils';
import { LOTTO_IO_MESSAGES, LOTTO_PRIZE_RULE } from '../constants.js';
import { getMoneyFormat } from '../utils/format.js';

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

  static printLottoResults(lottoResults, profitRate) {
    this.printLottoResultTitle();
    this.printLottoResultsDetails(lottoResults);
    this.printLottoProfitRate(profitRate);
  }

  static printLottoResultTitle() {
    Console.print(LOTTO_IO_MESSAGES.RESULT_STATISTICS_TITLE);
    Console.print(LOTTO_IO_MESSAGES.RESULT_DIVIDER);
  }

  static printLottoResultsDetails(lottoResults) {
    const reversedPrizeRules = [...LOTTO_PRIZE_RULE].reverse();

    reversedPrizeRules.forEach((prizeRule) => {
      this.printLottoResultsDetail(lottoResults, prizeRule);
    });
  }

  static printLottoResultsDetail(lottoResults, prizeRule) {
    const matchCount = prizeRule.matchCount;

    let detailMessage = `${matchCount}${LOTTO_IO_MESSAGES.RESULT_MATCHED_COUNT}`;
    const isNeedBonusMessage = prizeRule.needBonus;
    if (isNeedBonusMessage) {
      detailMessage += LOTTO_IO_MESSAGES.RESULT_BONUS_MATCHED;
    }

    const rankCount = lottoResults[prizeRule.rank];
    detailMessage += ` (${getMoneyFormat(prizeRule.prize)}원) - ${rankCount}개`;
    Console.print(detailMessage);
  }

  static printLottoProfitRate(profitRate) {
    Console.print(
      `${LOTTO_IO_MESSAGES.RESULT_PROFIT_RATE_PREFIX}${profitRate}${LOTTO_IO_MESSAGES.RESULT_PROFIT_RATE_POSTFIX}`,
    );
  }

  static printErrorMessage(error) {
    Console.print(error.message);
  }
}

export default LottoIO;
