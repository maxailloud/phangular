import { BaseComponent } from '@components/base.component';
import { BounceSet } from '@data-set/bounce.set';

export class BounceComponent extends BaseComponent<BounceSet> {
    public static NAME = 'Bounce';

    constructor() {
        super(BounceComponent.NAME, {
            x: 1,
            y: 1,
            collide: true,
        });
    }
}
