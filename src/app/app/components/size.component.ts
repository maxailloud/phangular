import { BaseComponent } from '@components/base.component';
import { SizeSet } from '@data-set/size.set';

export class SizeComponent extends BaseComponent<SizeSet> {
    public static NAME = 'Size';

    constructor() {
        super(SizeComponent.NAME, {
            width: 0,
            height: 0
        });
    }
}
