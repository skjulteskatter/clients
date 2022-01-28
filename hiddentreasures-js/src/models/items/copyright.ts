import { BaseItem, IBaseItem } from "./baseItem";

export interface ICopyright extends IBaseItem {

}

export class Copyright extends BaseItem implements ICopyright {
    
}

export default Copyright;