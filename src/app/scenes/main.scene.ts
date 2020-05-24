import { ArcadeComponent } from '@components/arcade.component';
import { BounceComponent } from '@components/bounce.component';
import { DisplayableComponent } from '@components/displayable.component';
import { ImageComponent } from '@components/image.component';
import { ParticleEmitterFollowingComponent } from '@components/particle-emitter-following.component';
import { ParticleEmitterManagerComponent } from '@components/particle-emitter-manager.component';
import { ParticleEmitterComponent } from '@components/particle-emitter.component';
import { PositionComponent } from '@components/position.component';
import { VelocityComponent } from '@components/velocity.component';
import { BaseScene } from '@scenes/base.scene';

export class MainScene extends BaseScene {
    public static KEY = 'Main';

    constructor() {
        super({
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 200}
                }
            },
        });
    }

    public preload() {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('red', 'assets/particles/red.png');
        this.load.image('blue', 'assets/particles/blue.png');
    }

    public create() {
        this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, ImageComponent.NAME],
            undefined, {
            [ImageComponent.NAME]: {
                texture: 'sky',
            },
            [PositionComponent.NAME]: {
                x: 400,
                y: 300,
            }
        });

        const logoEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            ArcadeComponent.NAME, ImageComponent.NAME, VelocityComponent.NAME, BounceComponent.NAME], undefined, {
            [ImageComponent.NAME]: {
                texture: 'logo',
            },
            [PositionComponent.NAME]: {
                x: 400,
                y: 100,
            },
            [VelocityComponent.NAME]: {
                x: 100,
                y: 200,
            }
        });

        const redParticleEmitterManagerEntityId = this.entityManager.createEntity([DisplayableComponent.NAME,
            ParticleEmitterManagerComponent.NAME], undefined, {
            [ParticleEmitterManagerComponent.NAME]: {
                texture: 'red',
            },
        });

        this.entityManager.createEntity([DisplayableComponent.NAME, ParticleEmitterComponent.NAME,
            ParticleEmitterFollowingComponent.NAME], undefined, {
            [ParticleEmitterComponent.NAME]: {
                manager: redParticleEmitterManagerEntityId,
                scale: {start: 1, end: 0},
            },
            [ParticleEmitterFollowingComponent.NAME]: {
                following: logoEntityId,
            }
        });

        const blueParticleEmitterManagerEntityId = this.entityManager.createEntity([DisplayableComponent.NAME,
            PositionComponent.NAME, ParticleEmitterManagerComponent.NAME], undefined, {
            [ParticleEmitterManagerComponent.NAME]: {
                texture: 'blue',
            }
        });

        this.entityManager.createEntity([DisplayableComponent.NAME, ParticleEmitterComponent.NAME,
            PositionComponent.NAME], undefined, {
            [ParticleEmitterComponent.NAME]: {
                manager: blueParticleEmitterManagerEntityId,
                speed: 200,
            },
            [PositionComponent.NAME]: {
                x: 400,
                y: 300,
            }
        });
    }
}
