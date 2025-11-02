const LOTTO_RULE = Object.freeze({
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_LENGTH: 6,
});

const LOTTO_RULE_ERROR = Object.freeze({
  INVALID_NUMBERS_LENGTH: '[ERROR] 로또 번호는 6개여야 합니다.',
  INVALID_NUMBER_RANGE: '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.',
  INVALID_IS_DUPLICATION_NUMBERS:
    '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
});

const LOTTO_IO_MESSAGES = Object.freeze({
  INPUT_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.\n',
  INPUT_WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
  INPUT_BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
});

export { LOTTO_RULE, LOTTO_RULE_ERROR, LOTTO_IO_MESSAGES };
