import { IOriginService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface IOrigin extends IBaseItem {

}

export class Origin extends BaseItem<IOriginService> implements IOrigin {
    
}

export default Origin;