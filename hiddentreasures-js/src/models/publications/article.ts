import { IArticleService } from "../../services/publications/articleService";
import BaseDocument from "../baseDocument";
import { ArticleContent, IArticleContent } from "./articleContent";

export abstract class IArticle extends BaseDocument<IArticleService> {
    public publicationId!: string;
    public authorId!: string;
    public dateWritten!: string;
    public number!: number;
    public icon!: string;
    public image!: string;
    public title!: string;
    public content?: IArticleContent;
}

export class Article extends IArticle {
    public override content?: ArticleContent;

    constructor(i: IArticle, s: IArticleService) {
        super(i, s);
        this.content = i.content ? new ArticleContent(i.content) : undefined;
    }
}
