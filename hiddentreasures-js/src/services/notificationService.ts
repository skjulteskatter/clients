import { getCache } from "../cache";
import { Client } from "../client";
import { INotification, Notification, NotificationStatus } from "../models/notification";
import { IService } from "./baseService";

export interface INotificationService extends IService {
    list(): Promise<INotification[]>;
    get(id: string): Promise<INotification>;
    update(id: string, status: NotificationStatus): Promise<void>;
    updateMultiple(notifications: {
        [id: string]: NotificationStatus;
    }): Promise<void>;
}

export class NotificationService implements INotificationService {
    protected client;
    protected table;
    protected models: Notification[] | null = null;
    protected modelsByCollection: {
        [key: string]: Notification[];
    } = {};

    constructor(client: Client) {
        this.client = client;
        this.table = getCache("notifications");
    }

    list(): Promise<INotification[]> {
        return this.client.get<INotification[]>("api/Notifications");
    }
    get(id: string): Promise<INotification> {
        return this.client.get<INotification>("api/Notifications/" + id);
    }
    async update(id: string, status: NotificationStatus): Promise<void> {
        await this.client.patch<string>("api/Notifications/" + id, status);
    }
    async updateMultiple(notifications: { [id: string]: NotificationStatus; }): Promise<void> {
        await this.client.post<string>("api/Notifications", notifications);
    }
}