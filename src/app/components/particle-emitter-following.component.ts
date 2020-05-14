import { BaseComponent } from '@components/base.component';
import { ParticleEmitterFollowingSet } from '@data-set/particle-emitter-following.set';

export class ParticleEmitterFollowingComponent extends BaseComponent<ParticleEmitterFollowingSet> {
    static NAME = 'ParticleEmitterFollowing';

    constructor() {
        super(ParticleEmitterFollowingComponent.NAME, {
            following: 0,
        });
    }
}
