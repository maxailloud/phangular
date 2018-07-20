import { DisplayableComponent } from '@components/displayable.component';
import { GraphicsComponent } from '@components/graphics.component';
import { OriginComponent } from '@components/origin.component';
import { PositionComponent } from '@components/position.component';
import { SizeComponent } from '@components/size.component';
import { TextComponent } from '@components/text.component';
import { BaseScene } from '@scenes/base.scene';
import { MainScene } from '@scenes/main.scene';

export class LoadingScene extends BaseScene {
    public static KEY = 'Loading';

    constructor() {
        super();
    }

    public preload() {
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('logo', 'assets/sprites/phaser3-logo.png');

        for (let i = 0; i < 50; i++) {
            this.load.image('logo' + i, 'assets/sprites/phaser3-logo.png');
        }

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBoxEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, SizeComponent.NAME,
            GraphicsComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(GraphicsComponent.NAME, progressBoxEntityId, {
            fill: 'rect',
            fillColor: 0x222222,
            fillAlpha: 0.8,
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, progressBoxEntityId, {
            x: 240,
            y: 270,
        });
        this.entityManager.updateComponentDataForEntity(SizeComponent.NAME, progressBoxEntityId, {
            width: 320,
            height: 50
        });

        const progressBarEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, SizeComponent.NAME,
            GraphicsComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(GraphicsComponent.NAME, progressBarEntityId, {
            fill: 'rect',
            fillColor: 0xffffff,
            fillAlpha: 0.3,
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, progressBarEntityId, {
            x: 250,
            y: 280,
        });
        this.entityManager.updateComponentDataForEntity(SizeComponent.NAME, progressBarEntityId, {
            height: 30
        });

        const loadingTextEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(TextComponent.NAME, loadingTextEntityId, {
            text: 'Loading...',
            fontSize: '20px',
        });
        this.entityManager.updateComponentDataForEntity(OriginComponent.NAME, loadingTextEntityId, {
            x: 0.5,
            y: 0.5,
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, loadingTextEntityId, {
            x: width / 2,
            y: height / 2 - 50,
        });

        const percentageTextEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(TextComponent.NAME, percentageTextEntityId, {
            text: '0%',
            fontSize: '18px',
        });
        this.entityManager.updateComponentDataForEntity(OriginComponent.NAME, percentageTextEntityId, {
            x: 0.5,
            y: 0.5,
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, percentageTextEntityId, {
            x: width / 2,
            y: height / 2 - 5,
        });

        const assetTextEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME]);
        this.entityManager.updateComponentDataForEntity(TextComponent.NAME, assetTextEntityId, {
            text: '',
            fontSize: '18px',
        });
        this.entityManager.updateComponentDataForEntity(OriginComponent.NAME, assetTextEntityId, {
            x: 0.5,
            y: 0.5,
        });
        this.entityManager.updateComponentDataForEntity(PositionComponent.NAME, assetTextEntityId, {
            x: width / 2,
            y: height / 2 + 50,
        });

        this.entityManager.update(0);

        this.load.on('progress', (value: number) => {
            this.entityManager.updateComponentDataForEntity(TextComponent.NAME, percentageTextEntityId, {
                text: Math.round(value * 100) + '%',
            });

            this.entityManager.updateComponentDataForEntity(SizeComponent.NAME, progressBarEntityId, {
                width: 300 * value,
            });

            this.entityManager.update(0);
        });

        this.load.on('fileprogress', (file: Phaser.Loader.FileTypes.ImageFile) => {
            this.entityManager.updateComponentDataForEntity(TextComponent.NAME, assetTextEntityId, {
                text: 'Loading asset: ' + file.key,
            });

            this.entityManager.update(0);
        });

        this.load.on('complete', () => {
            this.scene.switch(MainScene.KEY);
        });
    }

    public create() {
    }
}
