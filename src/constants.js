const LOTTO_RULE = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_LENGTH: 6,
  PRICE: 1_000,
});

const LOTTO_RULE_ERROR = Object.freeze({
  INVALID_NUMBERS_LENGTH: '[ERROR] 로또 번호는 6개여야 합니다.',
  INVALID_NUMBER_RANGE: '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.',
  INVALID_IS_DUPLICATION_NUMBERS: '[ERROR] 중복된 숫자가 있습니다.',
  INVALID_IS_MATCHED_WINNING_NUMBERS:
    '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
  INVALID_PURCHASE_COUNT: '[ERROR] 구입 금액은 1,000원 단위로 입력해야 합니다.',
});

const LOTTO_PRIZE_RULE = Object.freeze([
  { prize: 2_000_000_000, matchCount: 6, needBonus: false, rank: 1 },
  { prize: 30_000_000, matchCount: 5, needBonus: true, rank: 2 },
  { prize: 1_500_000, matchCount: 5, needBonus: false, rank: 3 },
  { prize: 50_000, matchCount: 4, needBonus: false, rank: 4 },
  { prize: 5_000, matchCount: 3, needBonus: false, rank: 5 },
]);

const LOTTO_PROFIT_RATE_RULE = Object.freeze({
  DECIMAL_SCALE: 1,
});

const LOTTO_IO_MESSAGES = Object.freeze({
  INPUT_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.\n',
  INPUT_WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
  INPUT_BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
  PURCHASED_LOTTO_COUNT: '개를 구매했습니다.',
});

export {
  LOTTO_RULE,
  LOTTO_RULE_ERROR,
  LOTTO_PRIZE_RULE,
  LOTTO_PROFIT_RATE_RULE,
  LOTTO_IO_MESSAGES,
};
