import type { PresenceData, ClientOptions, Client } from "discord.js";

export interface DHClientOptions {
    token: string;
    precense: PresenceData;
    clientOptions: ClientOptions;
}

export interface DHClientClass {
    wrapperClient: Client;
}