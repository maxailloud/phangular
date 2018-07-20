import { ArcadeComponent } from '@components/arcade.component';
import { BounceComponent } from '@components/bounce.component';
import { DisplayableComponent } from '@components/displayable.component';
import { GraphicsComponent } from '@components/graphics.component';
import { ImageComponent } from '@components/image.component';
import { OriginComponent } from '@components/origin.component';
import { ParticleEmitterFollowingComponent } from '@components/particle-emitter-following.component';
import { ParticleEmitterManagerComponent } from '@components/particle-emitter-manager.component';
import { ParticleEmitterComponent } from '@components/particle-emitter.component';
import { PositionComponent } from '@components/position.component';
import { SizeComponent } from '@components/size.component';
import { SpriteComponent } from '@components/sprite.component';
import { TextComponent } from '@components/text.component';
import { VelocityComponent } from '@components/velocity.component';
import { RenderingProcessor } from '@processors/rendering.processor';
import EntityManager from 'ensy';

export class BaseScene extends Phaser.Scene {
    protected entityManager: EntityManager;

    constructor(config: string | Phaser.Scenes.Settings.Config = {}) {
        super(config);

        this.entityManager = new EntityManager();

        this.initialiseEntityManager();
    }

    private initialiseEntityManager() {
        // Adding all components to the EntityManager
        const components = [
            new DisplayableComponent(),
            new PositionComponent(),
            new SpriteComponent(),
            new ImageComponent(),
            new ArcadeComponent(),
            new VelocityComponent(),
            new BounceComponent(),
            new ParticleEmitterManagerComponent(),
            new ParticleEmitterComponent(),
            new ParticleEmitterFollowingComponent(),
            new TextComponent(),
            new OriginComponent(),
            new GraphicsComponent(),
            new SizeComponent(),
        ];

        components.forEach((component) => {
            this.entityManager.addComponent(component.name, component);
        });

        // Add the processors
        const renderingProcessor = new RenderingProcessor(this.entityManager, this);

        this.entityManager.addProcessor(renderingProcessor);
    }

    public update(time: number, deltaTime: number) {
        this.entityManager.update(deltaTime);
    }
}
