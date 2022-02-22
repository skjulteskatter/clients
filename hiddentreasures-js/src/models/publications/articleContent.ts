import BaseObject from "../baseObject";

export abstract class IArticleContent extends BaseObject {
    public articleId!: string;
    public translationId?: string;
    public translatorId?: string;
    public updatedAt!: string;
    public language!: string;
    public introduction?: string;
    public content!: string;
}

export class ArticleContent extends IArticleContent {
    constructor(i: IArticleContent) {
        super(i);
    }
}
