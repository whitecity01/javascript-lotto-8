import LottoGenerator from '../src/service/LottoGenerator.js';

const isDuplication = (numbers) => {
  const set = new Set([...numbers]);
  if (set.size !== numbers.length) {
    return true;
  }
  return false;
};

describe('로또 구매 예외 테스트', () => {
  test('로또 구입 금액이 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      const purchaseAmount = '1000j';
      LottoGenerator.sellLottos(purchaseAmount);
    }).toThrow('[ERROR]');
  });

  test('로또 구입 금액이 1000원 단위가 아니면 예외가 발생한다.', () => {
    expect(() => {
      const purchaseAmount = 1001;
      LottoGenerator.sellLottos(purchaseAmount);
    }).toThrow('[ERROR]');
  });

  test('로또 구입 금액이 1000원 단위일 경우 에러가 발생하지 않는다', () => {
    const purchaseAmounts = [1000, 2000, 3000, 4000, 5000];

    for (const purchaseAmount of purchaseAmounts) {
      expect(() => LottoGenerator.sellLottos(purchaseAmount)).not.toThrow();
    }
  });
});

describe('로또 구매 기능 테스트', () => {
  test('로또 구입 금액이 정상이라면 금액에 대한 개수의 로또가 반환된다.', () => {
    const lotto = LottoGenerator.sellLottos(3000);
    expect(lotto.length).toEqual(3);
  });

  test('구입한 로또는 중복되지 않는 숫자 6개를 가진다.', () => {
    const lottos = LottoGenerator.sellLottos(10000);
    for (const lotto of lottos) {
      expect(isDuplication(lotto.getNumbers())).toEqual(false);
    }
  });
});
