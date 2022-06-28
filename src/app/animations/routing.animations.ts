import {
  animate,
  AnimationGroupMetadata,
  AnimationQueryMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export namespace RoutingAnimations {
  export function slideTrigger(triggerName: string) {
    return trigger(triggerName, [
      transition(':increment', slideTo('right')),
      transition(':decrement', slideTo('left')),
    ]);
  }

  export const defaultSlideAnimationSpeed: number = 400;

  export function slideTo(
    direction: 'left' | 'right',
    animationSpeed: number = defaultSlideAnimationSpeed, // ms
  ): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
    return [
      query(
        ':enter, :leave',
        [
          style({
            position: 'absolute',
            top: 0,
            [direction]: 0,
            opacity: 1,
            width: '100%',
            overflow: 'hidden',
          }),
        ],
        { optional: true },
      ),
      query(':enter', [style({ [direction]: `-100%`, opacity: 0 })], {
        optional: true,
      }),
      group([
        query(
          ':leave',
          [
            animate(
              `${animationSpeed}ms ease-in-out`,
              style({ [direction]: `100%`, opacity: 0 }),
            ),
          ],
          {
            optional: true,
          },
        ),
        query(
          ':enter',
          [
            animate(
              `${animationSpeed}ms ease-in-out`,
              style({ [direction]: `0`, opacity: 1 }),
            ),
          ],
          {
            optional: true,
          },
        ),
      ]),
    ];
  }
}
