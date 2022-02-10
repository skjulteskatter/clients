import { IMediaFile, MediaFile } from "models";
import cache from "cache";
import { SongTreasures } from "client";
import { BaseChildService } from "../baseChildService";

export class FileService extends BaseChildService<MediaFile, IMediaFile> {
    constructor(client: SongTreasures) {
        super(client, "MediaFiles", cache.files);
    }

    protected toModel(item: IMediaFile): MediaFile {
        return new MediaFile(item);
    }

    protected parents(item: IMediaFile): string[] {
        return [item.songId];
    }
}