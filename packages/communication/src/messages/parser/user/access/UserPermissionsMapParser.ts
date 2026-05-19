import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

/**
 * Parses the resolved permission map for the current user
 * (Arcturus-Morningstar-Extended ≥ 4.2.10, header
 * `Outgoing.UserPermissionsMapComposer = 10070`).
 *
 * Wire layout:
 *   int count
 *   loop: string permission_key + int value     (1 = ALLOWED, 2 = ROOM_OWNER)
 *
 * Only permissions whose `PermissionSetting != DISALLOWED` are sent —
 * absence means "no". The renderer-side `SessionDataManager` consumes
 * this and exposes it via a snapshot getter; React-side
 * `useHasPermission(key)` drives UI gates against the real
 * `permission_definitions.permission_key` strings instead of
 * deployment-specific rank IDs.
 */
export class UserPermissionsMapParser implements IMessageParser
{
    private _permissions: Map<string, number> = new Map();

    public flush(): boolean
    {
        this._permissions = new Map();

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();
        const fresh = new Map<string, number>();

        for(let i = 0; i < count; i++)
        {
            const key = wrapper.readString();
            const value = wrapper.readInt();

            fresh.set(key, value);
        }

        this._permissions = fresh;

        return true;
    }

    public get permissions(): ReadonlyMap<string, number>
    {
        return this._permissions;
    }
}
