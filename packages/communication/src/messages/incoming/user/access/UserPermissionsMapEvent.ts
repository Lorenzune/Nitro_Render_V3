import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { UserPermissionsMapParser } from '../../../parser';

export class UserPermissionsMapEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserPermissionsMapParser);
    }

    public getParser(): UserPermissionsMapParser
    {
        return this.parser as UserPermissionsMapParser;
    }
}
