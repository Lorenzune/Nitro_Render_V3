import { IMessageDataWrapper } from '@nitrots/api';

export class CatalogRefData
{
    public id: number;
    public itemIds: string;
    public catalogName: string;
    public costCredits: number;
    public costPoints: number;
    public pointsType: number;
    public pageId: number;
    public pageName: string;
    public amount: number;
    public clubOnly: boolean;
    public extradata: string;
    public haveOffer: boolean;
    public offerId: number;
    public limitedStack: number;
    public orderNumber: number;

    public parse(wrapper: IMessageDataWrapper): void
    {
        this.id = wrapper.readInt();
        this.itemIds = wrapper.readString();
        this.catalogName = wrapper.readString();
        this.costCredits = wrapper.readInt();
        this.costPoints = wrapper.readInt();
        this.pointsType = wrapper.readInt();
        this.pageId = wrapper.readInt();
        this.pageName = wrapper.readString();
        this.amount = wrapper.readInt();
        this.clubOnly = wrapper.readBoolean();
        this.extradata = wrapper.readString();
        this.haveOffer = wrapper.readBoolean();
        this.offerId = wrapper.readInt();
        this.limitedStack = wrapper.readInt();
        this.orderNumber = wrapper.readInt();
    }
}
