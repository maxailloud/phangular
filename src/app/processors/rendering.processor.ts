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
import { BounceSet } from '@data-set/bounce.set';
import { DisplayableSet } from '@data-set/displayable.set';
import { GraphicsSet } from '@data-set/graphics.set';
import { ImageSet } from '@data-set/image.set';
import { OriginSet } from '@data-set/origin.set';
import { ParticleEmitterFollowingSet } from '@data-set/particle-emitter-following.set';
import { ParticleEmitterManagerSet } from '@data-set/particle-emitter-manager.set';
import { ParticleEmitterSet } from '@data-set/particle-emitter.set';
import { PositionSet } from '@data-set/position.set';
import { SizeSet } from '@data-set/size.set';
import { SpriteSet } from '@data-set/sprite.set';
import { TextSet } from '@data-set/text.set';
import { VelocitySet } from '@data-set/velocity.set';
import { EntityManager, ProcessorInterface } from 'ensy';

export class RenderingProcessor implements ProcessorInterface {
    private readonly gameObjects: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Text |
            Phaser.GameObjects.Image|Phaser.Physics.Arcade.Image | Phaser.GameObjects.Particles.ParticleEmitterManager |
            Phaser.GameObjects.Graphics>;
    private readonly nonGameObjects: Array<Phaser.GameObjects.Particles.ParticleEmitter>;

    constructor(private entityManager: EntityManager, private scene: Phaser.Scene) {
        // An associative array for entities' GameObject.
        //      entityId -> GameObject
        // Phaser handles all the displaying so we only need to create GameObject
        // once, and then keep a track of those GameObject objects.
        this.gameObjects = [];
        this.nonGameObjects = [];
    }

    public on(type: string, data: {entity: number, component: string, state: {[key: string]: any}}) {
        switch (type) {
            case 'COMPONENT_CREATED':
                const entityId = data.entity;

                switch(data.component) {
                    case SpriteComponent.NAME:
                        this.createSprite(entityId);
                        break;
                    case ImageComponent.NAME:
                        this.createImage(entityId);

                        if (this.entityManager.entityHasComponent(entityId, BounceComponent.NAME)) {
                            this.setArcadeImageBounce(this.gameObjects[entityId] as Phaser.Physics.Arcade.Image, entityId);
                        }
                        break;
                    case VelocityComponent.NAME:
                        if (this.entityManager.entityHasComponent(entityId, ImageComponent.NAME)) {
                            this.setArcadeImageVelocity(this.gameObjects[entityId] as Phaser.Physics.Arcade.Image, entityId);
                        }
                        break;
                    case BounceComponent.NAME:
                        if (this.entityManager.entityHasComponent(entityId, ImageComponent.NAME)) {
                            this.setArcadeImageBounce(this.gameObjects[entityId] as Phaser.Physics.Arcade.Image, entityId);
                        }
                        break;
                    case TextComponent.NAME:
                        this.createText(entityId);
                        break;
                    case ParticleEmitterManagerComponent.NAME:
                        this.createParticleEmitterManager(entityId);
                        break;
                    case ParticleEmitterComponent.NAME:
                        this.createParticleEmitter(entityId);
                        break;
                    case GraphicsComponent.NAME:
                        this.createGraphics(entityId);
                        break;
                }
                break;
            default:
                break;
        }
    }

    public update(deltaTime: number): void {
        const displayables = this.entityManager.getComponentsData<DisplayableSet>(DisplayableComponent.NAME);

        Object.entries(displayables).forEach(([stringEntityId, displayable]) => {
            const entityId = +stringEntityId;

            this.updateGameObject(displayable, entityId);
            this.updateNonGameObject(displayable, entityId);
        });

        const texts = this.entityManager.getComponentsData<TextSet>(TextComponent.NAME);

        Object.entries(texts).forEach(([stringEntityId, textSet]) => {
            const entityId = +stringEntityId;

            this.updateText(entityId, textSet);
        });

        const graphics = this.entityManager.getComponentsData<GraphicsSet>(GraphicsComponent.NAME);

        Object.entries(graphics).forEach(([stringEntityId, graphicsSet]) => {
            const entityId = +stringEntityId;

            this.updateGraphics(entityId, graphicsSet);
        });

        const images = this.entityManager.getComponentsData<ImageSet>(ImageComponent.NAME);

        Object.entries(images).forEach(([stringEntityId, imageSet]) => {
            const entityId = +stringEntityId;

            this.updateImage(entityId, imageSet);
        });

        const particleEmitterManagers = this.entityManager.getComponentsData<ParticleEmitterManagerSet>(ParticleEmitterManagerComponent.NAME);

        Object.entries(particleEmitterManagers).forEach(([stringEntityId, particlerEmitterManagerSet]) => {
            const entityId = +stringEntityId;

            this.updateParticleEmitterManager(entityId, particlerEmitterManagerSet);
        });

        const particleEmitters = this.entityManager.getComponentsData<ParticleEmitterSet>(ParticleEmitterComponent.NAME);

        Object.entries(particleEmitters).forEach(([stringEntityId, particlerEmitterSet]) => {
            const entityId = +stringEntityId;

            this.updateParticleEmitter(entityId, particlerEmitterSet);
        });
    }

    private isGameObjectExistsForEntity(entityId: number): boolean {
        return this.gameObjects[entityId] !== undefined;
    }

    private isNonGameObjectExistsForEntity(entityId: number): boolean {
        return this.nonGameObjects.hasOwnProperty(entityId);
    }

    private updateGameObject(gameObjectSet: DisplayableSet, entityId: number) {
        if (this.isGameObjectExistsForEntity(entityId)) {
            this.gameObjects[entityId].setActive(gameObjectSet.active);
        }
    }

    private updateNonGameObject(gameObjectSet: DisplayableSet, entityId: number) {
        if (this.isNonGameObjectExistsForEntity(entityId)) {
            if (this.entityManager.entityHasComponent(entityId, ParticleEmitterComponent.NAME)) {
                const particleEmitter = this.nonGameObjects[entityId] as Phaser.GameObjects.Particles.ParticleEmitter;

                if (gameObjectSet.active) {
                    particleEmitter.start();
                } else {
                    particleEmitter.stop();
                }
            }
        }
    }

    private createSprite(entityId: number) {
        const positionData: PositionSet = this.entityManager.getComponentDataForEntity(PositionComponent.NAME, entityId);
        const spriteData: SpriteSet = this.entityManager.getComponentDataForEntity(SpriteComponent.NAME, entityId);

        this.gameObjects[entityId] = this.scene.add.sprite(positionData.x, positionData.y, spriteData.texture);
    }

    private createImage(entityId: number) {
        const positionData: PositionSet = this.entityManager.getComponentDataForEntity(PositionComponent.NAME, entityId);
        const imageData: ImageSet = this.entityManager.getComponentDataForEntity(ImageComponent.NAME, entityId);

        let image;

        if (this.entityManager.entityHasComponent(entityId, ArcadeComponent.NAME)) {
            image = this.scene.physics.add.image(positionData.x, positionData.y, imageData.texture);
        } else {
            image = this.scene.add.image(positionData.x, positionData.y, imageData.texture);
        }

        this.gameObjects[entityId] = image;
    }

    private updateImage(entityId: number, imageSet: ImageSet) {
        if (this.entityManager.entityHasComponent(entityId, ArcadeComponent.NAME)) {
            let image = this.gameObjects[entityId] as Phaser.Physics.Arcade.Image;
            image.setTexture(imageSet.texture);
        } else {
            let image = this.gameObjects[entityId] as Phaser.GameObjects.Image;
            image.setTexture(imageSet.texture);
        }
    }

    private setArcadeImageVelocity(gameObject: Phaser.Physics.Arcade.Image, entityId: number) {
        const velocityData: VelocitySet = this.entityManager.getComponentDataForEntity(VelocityComponent.NAME, entityId);

        gameObject.setVelocity(velocityData.x, velocityData.y);
    }

    private setArcadeImageBounce(gameObject: Phaser.Physics.Arcade.Image, entityId: number) {
        const bounceData: BounceSet = this.entityManager.getComponentDataForEntity(BounceComponent.NAME, entityId);

        gameObject.setBounce(bounceData.x, bounceData.y);
        gameObject.setCollideWorldBounds(bounceData.collide);
    }

    private createText(entityId: number) {
        const textSet: TextSet = this.entityManager.getComponentDataForEntity(TextComponent.NAME, entityId);
        const posData = this.entityManager.getComponentDataForEntity(PositionComponent.NAME, entityId);
        const style = {
            fontFamily: textSet.fontFamily,
            fontSize: textSet.fontSize,
            align: textSet.align,
            color: textSet.color
        };
        this.gameObjects[entityId] = this.scene.add.text(posData.x, posData.y, textSet.text, style);

        if (this.entityManager.entityHasComponent(entityId, OriginComponent.NAME)) {
            const originSet: OriginSet = this.entityManager.getComponentDataForEntity(OriginComponent.NAME, entityId);

            const text = this.gameObjects[entityId] as Phaser.GameObjects.Text;

            text.setOrigin(originSet.x, originSet.y);
        }
    }

    private updateText(entityId: number, textSet: TextSet) {
        const text = this.gameObjects[entityId] as Phaser.GameObjects.Text;

        if (text.text !== textSet.text) {
            text.setText(textSet.text);
        }
    }

    private createParticleEmitterManager(entityId: number) {
        const particleEmitterManagerSet: ParticleEmitterManagerSet = this.entityManager
            .getComponentDataForEntity(ParticleEmitterManagerComponent.NAME, entityId);

        this.gameObjects[entityId] = this.scene.add.particles(particleEmitterManagerSet.texture);
    }

    private updateParticleEmitterManager(entityId: number, particleEmitterManagerSet: ParticleEmitterManagerSet) {
        const particleEmitterManager = this.gameObjects[entityId] as
            Phaser.GameObjects.Particles.ParticleEmitterManager;

        particleEmitterManager.setTexture(particleEmitterManagerSet.texture);
    }

    private createParticleEmitter(entityId: number) {
        const particleEmitterSet: ParticleEmitterSet = this.entityManager
            .getComponentDataForEntity(ParticleEmitterComponent.NAME, entityId);

        if (particleEmitterSet.manager) {
            const particleEmitterManager = this.gameObjects[particleEmitterSet.manager] as
                Phaser.GameObjects.Particles.ParticleEmitterManager;

            let particleEmitter;

            if (this.entityManager.entityHasComponent(entityId, PositionComponent.NAME)) {
                const positionSet: PositionSet = this.entityManager
                    .getComponentDataForEntity(PositionComponent.NAME, entityId);

                particleEmitter = particleEmitterManager.createEmitter({
                    x: positionSet.x,
                    y: positionSet.y,
                    speed: particleEmitterSet.speed,
                    blendMode: particleEmitterSet.blendMode
                });
            } else if (this.entityManager.entityHasComponent(entityId, ParticleEmitterFollowingComponent.NAME)) {
                const particleEmitterFollowingSet: ParticleEmitterFollowingSet = this.entityManager
                    .getComponentDataForEntity(ParticleEmitterFollowingComponent.NAME, entityId);

                particleEmitter = particleEmitterManager.createEmitter({
                    speed: particleEmitterSet.speed,
                    scale: particleEmitterSet.scale,
                    blendMode: particleEmitterSet.blendMode
                });

                if (!this.isGameObjectExistsForEntity(particleEmitterFollowingSet.following)) {
                    throw new Error('Unable to find following game object for the particle emitter.');
                } else {
                    particleEmitter.startFollow(this.gameObjects[particleEmitterFollowingSet.following]);
                }
            } else {
                throw new Error('To create a particle emitter you must at least set one of the following component ' +
                    'on your entity: Position, ParticleEmitterFollowing.');
            }

            if (particleEmitter) {
                this.nonGameObjects[entityId] = particleEmitter;
            }
        }
    }

    private updateParticleEmitter(entityId: number, particleEmitterSet: ParticleEmitterSet) {
        const particleEmitter = this.nonGameObjects[entityId] as Phaser.GameObjects.Particles.ParticleEmitter;

        if (particleEmitter) {
            if (this.entityManager.entityHasComponent(entityId, PositionComponent.NAME)) {
                const positionSet: PositionSet = this.entityManager
                    .getComponentDataForEntity(PositionComponent.NAME, entityId);

                particleEmitter
                    .setPosition(positionSet.x, positionSet.y)
                    .setScale(particleEmitterSet.scale)
                    .setSpeed(particleEmitterSet.speed)
                    .setBlendMode(particleEmitterSet.blendMode)
                ;
            } else if (this.entityManager.entityHasComponent(entityId, ParticleEmitterFollowingComponent.NAME)) {
                const particleEmitterFollowingSet: ParticleEmitterFollowingSet = this.entityManager
                    .getComponentDataForEntity(ParticleEmitterFollowingComponent.NAME, entityId);

                particleEmitter
                    .setScale(particleEmitterSet.scale)
                    .setSpeed(particleEmitterSet.speed)
                    .setBlendMode(particleEmitterSet.blendMode)
                ;

                if (!this.isGameObjectExistsForEntity(particleEmitterFollowingSet.following)) {
                    throw new Error('Unable to find following game object for the particle emitter.');
                } else {
                    particleEmitter.startFollow(this.gameObjects[particleEmitterFollowingSet.following]);
                }
            } else {
                throw new Error('To update a particle emitter you must at least set one of the following component on' +
                    ' your entity: Position, ParticleEmitterFollowing.');
            }
        }
    }

    private createGraphics(entityId: number) {
        const graphicsSet: GraphicsSet = this.entityManager.getComponentDataForEntity(GraphicsComponent.NAME, entityId);
        const positionSet: PositionSet = this.entityManager.getComponentDataForEntity(PositionComponent.NAME, entityId);
        const sizeSet: SizeSet = this.entityManager.getComponentDataForEntity(SizeComponent.NAME, entityId);

        const newGraphics = this.scene.add.graphics();
        newGraphics.fillStyle(graphicsSet.fillColor, graphicsSet.fillAlpha);

        if (graphicsSet.fill === 'rect') {
            newGraphics.fillRect(positionSet.x, positionSet.y, sizeSet.width, sizeSet.height);
        }

        this.gameObjects[entityId] = newGraphics;
    }

    private updateGraphics(entityId: number, graphicsSet: GraphicsSet) {
        const positionSet: PositionSet = this.entityManager.getComponentDataForEntity(PositionComponent.NAME, entityId);
        const sizeSet: SizeSet = this.entityManager.getComponentDataForEntity(SizeComponent.NAME, entityId);

        const graphics = this.gameObjects[entityId] as Phaser.GameObjects.Graphics;

        graphics.clear();
        graphics.fillStyle(graphicsSet.fillColor, graphicsSet.fillAlpha);

        if (graphicsSet.fill === 'rect') {
            graphics.fillRect(positionSet.x, positionSet.y, sizeSet.width, sizeSet.height);
        }
    }
}
