import { BaseComponent } from '@components/base.component';
import { DisplayableSet } from '@data-set/displayable.set';

export class DisplayableComponent extends BaseComponent<DisplayableSet> {
    public static NAME = 'Displayable';

    constructor() {
        super(DisplayableComponent.NAME, {
            active: true,
        });
    }
}
