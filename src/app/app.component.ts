import { Component } from '@angular/core';
import { LoadingScene } from '@scenes/loading.scene';
import { MainScene } from '@scenes/main.scene';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    /**
     * Phaser game configuration.
     */
    readonly gameConfig: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        width: 800,
        height: 600,

        autoFocus: true,

        url: 'http//url.to.game',
        title: 'Phangular',
        version: '0.0.1'
    };

    game?: Phaser.Game;

    /**
     * On game ready event handler. Fired once Phaser game is ready and Angular view is initialized.
     */
    onGameReady(game: Phaser.Game): void {
        this.game = game;

        game.scene.add(MainScene.KEY, MainScene);
        game.scene.add(LoadingScene.KEY, LoadingScene, true);
    }
}
