import { BaseComponent } from '@components/base.component';
import { SpriteSet } from '@data-set/sprite.set';

export class SpriteComponent extends BaseComponent<SpriteSet> {
    static NAME = 'Sprite';

    constructor() {
        super(SpriteComponent.NAME, {
            texture: '',
        });
    }
}
