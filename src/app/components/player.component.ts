import { BaseComponent } from '@components/base.component';
import { PlayerSet } from '@data-set/player.set';

export class PlayerComponent extends BaseComponent<PlayerSet> {
    public static NAME = 'Player';

    constructor() {
        super(PlayerComponent.NAME, {
            life: 100,
            strength: 18,
            charisma: 3,
        });
    }
}
