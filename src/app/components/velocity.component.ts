import { BaseComponent } from '@components/base.component';
import { VelocitySet } from '@data-set/velocity.set';

export class VelocityComponent extends BaseComponent<VelocitySet> {
    public static NAME = 'Velocity';

    constructor() {
        super(VelocityComponent.NAME, {
            x: 0,
            y: 0,
        });
    }
}
