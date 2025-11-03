import LottoRunner from '../src/service/LottoRunner.js';
import Lotto from '../src/model/Lotto.js';
import { LOTTO_PRIZE_RULE } from '../src/constants.js';

describe('당첨 번호 예외 테스트', () => {
  test('당첨 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 'j'];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 6, 7];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호의 개수가 6개보다 적으면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 5];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호에 범위를 넘어간 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 46];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });

  test('당첨 번호에 범위보다 작은 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 0];
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
    }).toThrow('[ERROR]');
  });
});

describe('보너스 번호 예외 테스트', () => {
  test('보너스 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      const bonusNumber = 'j';
      const lottoRunner = new LottoRunner();
      lottoRunner.setBonusNumber(bonusNumber);
    }).toThrow('[ERROR]');
  });

  test('당첨번호와 중복될 경우 예외가 발생한다.', () => {
    expect(() => {
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 1;
      const lottoRunner = new LottoRunner();
      lottoRunner.setWinningNumbers(winningNumbers);
      lottoRunner.setBonusNumber(bonusNumber);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호 범위를 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      const bonusNumber = 46;
      const lottoRunner = new LottoRunner();
      lottoRunner.setBonusNumber(bonusNumber);
    }).toThrow('[ERROR]');
  });

  test('보너스 번호 범위보다 작은 숫자면 예외가 발생한다.', () => {
    expect(() => {
      const bonusNumber = 0;
      const lottoRunner = new LottoRunner();
      lottoRunner.setBonusNumber(bonusNumber);
    }).toThrow('[ERROR]');
  });
});

describe('당첨 번호 기능 테스트', () => {
  test('정상적인 당첨 번호 입력 시 정상적으로 저장이 된다.', () => {
    const lottoRunner = new LottoRunner();
    lottoRunner.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    expect(lottoRunner.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('보너스 번호 기능 테스트', () => {
  test('정상적인 보너스 번호 입력 시 정상적으로 저장이 된다.', () => {
    const lottoRunner = new LottoRunner();
    lottoRunner.setBonusNumber(7);
    expect(lottoRunner.getBonusNumber()).toEqual(7);
  });
});

describe('로또 당첨 결과 조회 기능', () => {
  test('정상적인 로또 입력 시, 당첨 결과를 계산한다.', () => {
    const lottoRunner = new LottoRunner();
    lottoRunner.setBonusNumber(7);
    lottoRunner.setWinningNumbers([1, 2, 3, 4, 5, 6]);

    const lotto = new Lotto([1, 2, 3, 4, 5, 10]);
    const { matchCount, isMatchBonusNumber } =
      lottoRunner.calculateLottoMatchCount(lotto);

    expect(matchCount).toEqual(5);
    expect(isMatchBonusNumber).toEqual(false);
  });

  test('로또 당첨 번호 개수를 통해 등수를 계산한다.', () => {
    const lottoRunner = new LottoRunner();

    const matchCount = 4;
    const isMatchBonusNumber = false;

    const matchedPrize = LOTTO_PRIZE_RULE.find((prizeRule) =>
      lottoRunner.isValidLottoPrizeRule(
        prizeRule,
        matchCount,
        isMatchBonusNumber,
      ),
    );

    expect(matchedPrize.rank).toEqual(4);
  });

  test('보너스 여부 결과에 따라 등수가 결정된다.', () => {
    const lottoRunner = new LottoRunner();

    const expectPrizeThird = LOTTO_PRIZE_RULE.find((prizeRule) =>
      lottoRunner.isValidLottoPrizeRule(prizeRule, 5, false),
    );

    const expectPrizeTwo = LOTTO_PRIZE_RULE.find((prizeRule) =>
      lottoRunner.isValidLottoPrizeRule(prizeRule, 5, true),
    );

    expect(expectPrizeThird.rank).toEqual(3);
    expect(expectPrizeTwo.rank).toEqual(2);
  });

  test('수익률이 정상적으로 계산된다.', () => {
    const lottoRunner = new LottoRunner();
    const profitRate = lottoRunner.calculateProfitRate([0, 0, 0, 0, 0, 1], 8);

    expect(profitRate).toEqual('62.5');
  });
});
