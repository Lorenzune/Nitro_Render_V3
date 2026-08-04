import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class EmbeddedMediaStateParser implements IMessageParser
{
    private _furniId = -1;
    private _action = 0;
    private _url = '';
    private _state = 0;
    private _startedAt = 0;
    private _offset = 0;
    private _revision = 0;
    private _broadcasterId = 0;

    public flush(): boolean
    {
        this._furniId = -1;
        this._action = 0;
        this._url = '';
        this._state = 0;
        this._startedAt = 0;
        this._offset = 0;
        this._revision = 0;
        this._broadcasterId = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._furniId = wrapper.readInt();
        this._action = wrapper.readInt();
        this._url = wrapper.readString();
        this._state = wrapper.readInt();
        this._startedAt = wrapper.readInt();
        this._offset = wrapper.readInt();
        this._revision = wrapper.readInt();
        this._broadcasterId = wrapper.readInt();
        return true;
    }

    public get furniId(): number { return this._furniId; }
    public get action(): number { return this._action; }
    public get url(): string { return this._url; }
    public get state(): number { return this._state; }
    public get startedAt(): number { return this._startedAt; }
    public get offset(): number { return this._offset; }
    public get revision(): number { return this._revision; }
    public get broadcasterId(): number { return this._broadcasterId; }
}
