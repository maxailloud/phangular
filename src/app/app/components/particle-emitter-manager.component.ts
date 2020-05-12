import { BaseComponent } from '@components/base.component';
import { ParticleEmitterManagerSet } from '@data-set/particle-emitter-manager.set';

export class ParticleEmitterManagerComponent extends BaseComponent<ParticleEmitterManagerSet> {
    static NAME = 'ParticleEmitterManager';

    constructor() {
        super(ParticleEmitterManagerComponent.NAME, {
            texture: '',
        });
    }
}
