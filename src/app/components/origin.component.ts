import { BaseComponent } from '@components/base.component';
import { OriginSet } from '@data-set/origin.set';

export class OriginComponent extends BaseComponent<OriginSet> {
    public static NAME = 'Origin';

    constructor() {
        super(OriginComponent.NAME, {
            x: 0,
            y: 0,
        });
    }
}
