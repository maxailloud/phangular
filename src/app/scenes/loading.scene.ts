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

        this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, SizeComponent.NAME,
            GraphicsComponent.NAME], undefined, {
            [GraphicsComponent.NAME]: {
                fill: 'rect',
                fillColor: 0x222222,
                fillAlpha: 0.8,
            },
            [PositionComponent.NAME]: {
                x: (width / 2) - 160,
                y: (height / 2) - 30,
            },
            [SizeComponent.NAME]: {
                width: 320,
                height: 50
            }
        });

        const progressBarEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME, SizeComponent.NAME,
            GraphicsComponent.NAME], undefined, {
            [GraphicsComponent.NAME]: {
                fill: 'rect',
                fillColor: 0xffffff,
                fillAlpha: 0.3,
            },
            [PositionComponent.NAME]: {
                x: (width / 2) - 150,
                y: (height / 2) - 20,
            },
            [SizeComponent.NAME]: {
                height: 30
            },
        });

        this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME], undefined, {
            [TextComponent.NAME]: {
                text: 'Loading...',
                fontSize: '20px',
            },
            [OriginComponent.NAME]: {
                x: 0.5,
                y: 0.5,
            },
            [PositionComponent.NAME]: {
                x: width / 2,
                y: height / 2 - 50,
            }
        });

        const percentageTextEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME], undefined, {
            [TextComponent.NAME]: {
                text: '0%',
                fontSize: '18px',
            },
            [OriginComponent.NAME]: {
                x: 0.5,
                y: 0.5,
            },
            [PositionComponent.NAME]: {
                x: width / 2,
                y: height / 2 - 5,
            }
        });

        const assetTextEntityId = this.entityManager.createEntity([DisplayableComponent.NAME, PositionComponent.NAME,
            TextComponent.NAME, OriginComponent.NAME], undefined, {
            [TextComponent.NAME]: {
                text: '',
                fontSize: '18px',
            },
            [OriginComponent.NAME]: {
                x: 0.5,
                y: 0.5,
            },
            [PositionComponent.NAME]: {
                x: width / 2,
                y: height / 2 + 50,
            }
        });

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
}
