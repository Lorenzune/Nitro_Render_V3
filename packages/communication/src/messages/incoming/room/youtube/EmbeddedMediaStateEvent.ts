import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { EmbeddedMediaStateParser } from '../../../parser';

export class EmbeddedMediaStateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, EmbeddedMediaStateParser);
    }

    public getParser(): EmbeddedMediaStateParser
    {
        return this.parser as EmbeddedMediaStateParser;
    }
}
