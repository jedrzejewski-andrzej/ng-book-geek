import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export namespace MenuAnimations {
  export const expandable: AnimationTriggerMetadata = trigger('expandable', [
    state('collapsed', style({ height: '0' })),
    state('expanded', style({ height: '*' })),
    transition('collapsed <=> expanded', [animate(300)]),
  ]);
}
