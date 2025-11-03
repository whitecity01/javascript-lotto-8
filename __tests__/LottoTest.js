import Lotto from '../src/model/Lotto';

describe('로또 클래스 예외 테스트', () => {
  test('로또 번호가 정수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 'j']);
    }).toThrow('[ERROR]');
  });

  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호의 개수가 6개보다 적으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 범위를 넘어간 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 46, 5, 6]);
    }).toThrow('[ERROR]');
  });

  test('로또 번호에 범위보다 작은 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 0, 5, 6]);
    }).toThrow('[ERROR]');
  });
});

describe('로또 기능 테스트', () => {
  test('로또 번호 저장이 정상적으로 작동하는가', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.getNumbers()).toEqual(lottoNumbers);
  });
});
