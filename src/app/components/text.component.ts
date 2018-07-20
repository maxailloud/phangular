import { BaseComponent } from '@components/base.component';
import { TextSet } from '@data-set/text.set';

export class TextComponent extends BaseComponent<TextSet> {
    public static NAME = 'Text';

    constructor() {
        super(TextComponent.NAME, {
            text: '',
            fontFamily: 'monospace',
            align: 'center',
            fontSize: '24pt',
            color: 'white',
        });
    }
}
