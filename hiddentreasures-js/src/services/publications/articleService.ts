import { IArticle, Article } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseChildService } from "../baseChildService";

export class ArticleService extends BaseChildService<Article, IArticle> {
    constructor(client: SongTreasures) {
        super(client, "Articles", cache.articles);
    }

    protected toModel(item: IArticle): Article {
        return new Article(item);
    }

    protected parents(item: IArticle): string[] {
        return Object.keys(item.collections);
    }
}