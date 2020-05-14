import { BaseComponent } from '@components/base.component';
import { AnimatedSet } from '@data-set/animated.set';

export class AnimatedComponent extends BaseComponent<AnimatedSet> {
    public static NAME = 'Animated';

    constructor() {
        super(AnimatedComponent.NAME, {
            started: false,
            current: '',
            key: '',
            frameRate: 0,
            repeat: 0,
        });
    }
}

