import { ISourceService } from "../..";
import { BaseItem, IBaseItem } from "./baseItem";

export interface ISource extends IBaseItem {

}

export class Source extends BaseItem<ISourceService> implements ISource {
    
}

export default Source;