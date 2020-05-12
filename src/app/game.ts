import 'phaser';
import { LoadingScene } from '@scenes/loading.scene';
import MainScene from './scenes/main-scene';
import PreloadScene from './scenes/preload-scene';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#FFFFFF',
    autoFocus: true,
    url: 'http//url.to.game',
    title: 'Phangular',
    version: '0.0.1',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 400}
        }
    }
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
    //game.scene.add(MainScene.KEY, MainScene);
    //game.scene.add(LoadingScene.KEY, LoadingScene, true);
});
