import { IMessageComposer } from '@nitrots/api';

export class DeleteNickIconComposer implements IMessageComposer<ConstructorParameters<typeof DeleteNickIconComposer>>
{
    private _data: ConstructorParameters<typeof DeleteNickIconComposer>;

    constructor(iconId: number)
    {
        this._data = [ iconId ];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
