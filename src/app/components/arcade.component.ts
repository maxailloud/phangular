import { BaseComponent } from '@components/base.component';

export class ArcadeComponent extends BaseComponent<{}> {
    public static NAME = 'Arcade';

    constructor() {
        super(ArcadeComponent.NAME, {});
    }
}
