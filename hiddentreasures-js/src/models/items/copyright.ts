import { ICopyrightService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ICopyright extends IBaseItem {

}

export class Copyright extends BaseItem<ICopyrightService> implements ICopyright {
    
}

export default Copyright;