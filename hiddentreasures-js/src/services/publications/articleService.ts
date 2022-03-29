import { IArticle, Article } from "../../models";
import { Client } from "../../client";
import { BaseChildService, IBaseChildService, ChildListOptions } from "../baseChildService";
import { getCache } from "../../cache";

export type ArticleListOptions = ChildListOptions & {
    withContent: boolean;
}

export interface IArticleService extends IBaseChildService<Article, ArticleListOptions> {}

export class ArticleService extends BaseChildService<Article, IArticle, ArticleListOptions> implements IArticleService {
    constructor(client: Client) {
        super(client, "Articles", getCache("articles"));
    }

    protected toModel(item: IArticle): Article {
        return new Article(item);
    }

    protected parents(item: IArticle): string[] {
        return Object.keys(item.publicationId);
    }
}