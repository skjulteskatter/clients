import { getCache } from "../../cache";
import { Client } from "../../client";
import { ITag, Tag } from "../../models";
import { IUserModelService, ModelCreateOptions, ModelUpdateOptions, UserModelService } from "../userModelService";

export type TagCreateOptions = ModelCreateOptions & {
    songIds: string[] | null;
}

export type TagUpdateOptions = ModelUpdateOptions & {
    addSongs: string[] | null;
    removeSongs: string[] | null;
}

export interface ITagService extends IUserModelService<ITag, TagCreateOptions, TagUpdateOptions> {

}

export class TagService extends UserModelService<Tag, ITag, TagCreateOptions, TagUpdateOptions> implements ITagService {
    constructor(client: Client) {
        super(client, "Tags", getCache("tags"));
    }

    protected toModel(item: ITag): Tag {
        return new Tag(item);
    }
}