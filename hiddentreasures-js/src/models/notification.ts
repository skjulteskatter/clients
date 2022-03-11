import { INotificationService } from "../services/notificationService";
import BaseDocument from "./baseDocument";

export type NotificationStatus = "read" | "unread" | "deleted";

export abstract class INotification extends BaseDocument<INotificationService> {
    public title!: string;
    public message!: string;
    public read!: boolean;
}

export class Notification extends INotification {
    constructor(i: INotification, s: INotificationService) {
        super(i, s);
    }
}