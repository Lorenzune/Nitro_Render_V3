import { IMessageComposer } from '@nitrots/api';

export class EmbeddedMediaControlComposer implements IMessageComposer<any[]>
{
    private _data: any[];

    constructor(furniId: number, action: number, url: string = '')
    {
        this._data = [ furniId, action, url ];
    }

    public getMessageArray(): any[] { return this._data; }
    public dispose(): void {}
}
