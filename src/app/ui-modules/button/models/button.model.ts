export namespace ButtonModel {
  export const DISABLED_FONT_COLOR: string = 'rgba(0,0,0,.26)';
  export const BUTTON_RIPPLE_COLOR: string = 'rgba(255,255,255, 0.15)';
  export const SECONDARY_FONT_COLOR: string = '#5a316c'; // primary color

  export type APPEARANCE = 'primary' | 'secondary';

  export type SIZE = 'normal' | 'small';

  export type ALIGN_TEXT = 'center' | 'left' | 'right';
  export enum ICON {
    PLUS = 'PLUS',
    EDIT = 'EDIT',
    DELETE = 'DELETE',
    ARROW_RIGHT = 'ARROW_RIGHT',
    ARROW_LEFT = 'ARROW_LEFT',
    CLOSE = 'CLOSE',
    SAVE = 'SAVE',
    EYE = 'EYE',
    EYE_CROSSED = 'EYE_CROSSED',
    PADLOCK_OPENED = 'PADLOCK_OPENED',
    PADLOCK_CLOSED = 'PADLOCK_CLOSED',
    LOCK = 'LOCK',
    PUBLISH = 'PUBLISH',
    MOVE = 'MOVE',
    CHECK = 'CHECK',
    PACKAGE = 'PACKAGE',
    RETURN = 'RETURN',
    DOWNLOAD_FILE = 'DOWNLOAD_FILE',
    REPEAT = 'REPEAT',
    USER_PLUS = 'USER_PLUS',
    RESTORE = 'RESTORE',
    TIMER = 'TIMER',
    PEOPLE = 'PEOPLE',
    HOME = 'HOME',
    GIFT_CARD = 'GIFT_CARD',
    BOOK = 'BOOK',
    PRIZE = 'PRIZE',
    CATEGORY = 'CATEGORY',
  }
}
