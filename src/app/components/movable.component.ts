import { BaseComponent } from '@components/base.component';
import { MovableSet } from '@data-set/movable.set';

export class MovableComponent extends BaseComponent<MovableSet> {
    public static NAME = 'Movable';

    constructor() {
        super(MovableComponent.NAME, {
            dx: 0,
            dy: 0,
            goingRight: false,
            jumpAllowed: false,
        });
    }
}
