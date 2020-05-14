import { BaseComponent } from '@components/base.component';
import { ImageSet } from '@data-set/image.set';

export class ImageComponent extends BaseComponent<ImageSet> {
    public static NAME = 'Image';

    constructor() {
        super(ImageComponent.NAME, {
            texture: '',
        });
    }
}
