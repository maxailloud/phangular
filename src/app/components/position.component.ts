import { BaseComponent } from '@components/base.component';
import { PositionSet } from '@data-set/position.set';

export class PositionComponent extends BaseComponent<PositionSet> {
    public static NAME = 'Position';

    constructor() {
        super(PositionComponent.NAME, {
            x: 100,
            y: 100
        });
    }
}
