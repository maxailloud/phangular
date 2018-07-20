import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PhaserModule } from 'phaser-component-library';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PhaserModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
