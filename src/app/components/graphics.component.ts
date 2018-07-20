import { BaseComponent } from '@components/base.component';
import { GraphicsSet } from '@data-set/graphics.set';

export class GraphicsComponent extends BaseComponent<GraphicsSet> {
    public static NAME = 'Graphics';

    constructor() {
        super(GraphicsComponent.NAME, {
            fill: '',
            fillColor: 0,
            fillAlpha: 0,
        });
    }
}
