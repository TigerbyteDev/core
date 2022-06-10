import type { PresenceData, ClientOptions, Client } from "discord.js";

export interface DRClientOptions {
    token: string;
    precense: PresenceData;
    clientOptions: ClientOptions;
}

export interface DRClientClass {
    wrapperClient: Client;
}