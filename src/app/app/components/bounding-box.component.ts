import { BaseComponent } from '@components/base.component';
import { BoundingBoxSet } from '@data-set/bounding-box.set';

export class BoundingBoxComponent extends BaseComponent<BoundingBoxSet> {
    public static NAME = 'BoudingBox';

    constructor() {
        super(BoundingBoxComponent.NAME, {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
    }
}
