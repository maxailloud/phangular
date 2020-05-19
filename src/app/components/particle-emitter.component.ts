import { BaseComponent } from '@components/base.component';
import { ParticleEmitterSet } from '@data-set/particle-emitter.set';

export class ParticleEmitterComponent extends BaseComponent<ParticleEmitterSet> {
    static NAME = 'ParticleEmitter';

    constructor() {
        super(ParticleEmitterComponent.NAME, {
            manager: undefined,
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: Phaser.BlendModes.ADD
        });
    }
}
