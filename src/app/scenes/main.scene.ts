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
        const skyEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, ImageComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(ImageComponent.NAME, skyEntityId, {
            texture: 'sky',
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, skyEntityId, {
            x: 400,
            y: 300,
        });

        const logoEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, ArcadeComponent.NAME,
            ImageComponent.NAME, VelocityComponent.NAME, BounceComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(ImageComponent.NAME, logoEntityId, {
            texture: 'logo',
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, logoEntityId, {
            x: 400,
            y: 100,
        });
        this.entityManager.updateComponentDataForEntity(VelocityComponent.NAME, logoEntityId, {
            x: 100,
            y: 200,
        });

        //const redParticleEmitterManagerEntityId = this.entityManager.createEntity([DisplayableComponent.NAME,
        //    ParticleEmitterManagerComponent.NAME]);
        //this.entityManager.updateComponentDataForEntity(ParticleEmitterManagerComponent.NAME, redParticleEmitterManagerEntityId, {
        //    texture: 'red',
        //});
        //
        //const redParticleEmitterEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, ParticleEmitterComponent.NAME,
        //    ParticleEmitterFollowingComponent.NAME]);
        //this.entityManager.updateComponentDataForEntity(ParticleEmitterComponent.NAME, redParticleEmitterEntityId, {
        //    manager: redParticleEmitterManagerEntityId,
        //    speed: 100,
        //    scale: {start: 1, end: 0},
        //    blendMode: Phaser.BlendModes.ADD,
        //});
        //this.entityManager.updateComponentDataForEntity(ParticleEmitterFollowingComponent.NAME, redParticleEmitterEntityId, {
        //    following: logoEntityId,
        //});
        //
        //const blueParticleEmitterManagerEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
        //    ParticleEmitterManagerComponent.NAME]);
        //this.entityManager.updateComponentDataForEntity(ParticleEmitterManagerComponent.NAME, blueParticleEmitterManagerEntityId, {
        //    texture: 'blue',
        //});
        //
        //const blueParticleEmitterEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, ParticleEmitterComponent.NAME,
        //    PositionComponent.NAME]);
        //this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, blueParticleEmitterEntityId, {
        //    x: 400,
        //    y: 300,
        //});
        //this.entityManager.updateComponentDataForEntity(ParticleEmitterComponent.NAME, blueParticleEmitterEntityId, {
        //    manager: blueParticleEmitterManagerEntityId,
        //    speed: 200,
        //    blendMode: Phaser.BlendModes.ADD,
        //});
    }
}
