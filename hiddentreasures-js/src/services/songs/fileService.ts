import { IMediaFile, MediaFile } from "../../models";
import { SongTreasures } from "../../client";
import { BaseChildService, IBaseChildService } from "../baseChildService";
import { getCache } from "../../cache";

export interface IFileService extends IBaseChildService<IMediaFile> {}

export class FileService extends BaseChildService<MediaFile, IMediaFile> implements IFileService {
    constructor(client: SongTreasures) {
        super(client, "Files", getCache("files"));
    }

    protected toModel(item: IMediaFile): MediaFile {
        return new MediaFile(item, this);
    }

    protected parents(item: IMediaFile): string[] {
        return [item.songId];
    }
}