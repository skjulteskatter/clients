import { IArticle, Article } from "../../models";
import cache from "../../cache";
import { SongTreasures } from "../../client";
import { BaseChildService, IBaseChildService, ListOptions } from "../baseChildService";

export type ArticleListOptions = ListOptions & {
    withContent: boolean;
}

export interface IArticleService extends IBaseChildService<Article, ArticleListOptions> {}

export class ArticleService extends BaseChildService<Article, IArticle, ArticleListOptions> implements IArticleService {
    constructor(client: SongTreasures) {
        super(client, "Articles", cache.articles);
    }

    protected toModel(item: IArticle): Article {
        return new Article(item, this);
    }

    protected parents(item: IArticle): string[] {
        return Object.keys(item.publicationId);
    }
}