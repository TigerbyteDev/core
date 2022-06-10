import type { PresenceData, ClientOptions, Client } from "discord.js";

export interface DRClientOptions {
    token: string;
    precense: PresenceData;
    clientOptions: ClientOptions;
}

export interface DRClientClass {
    wrapperClient: Client;
}

export type DRCommandOptionType = "string"
                                | "number"
                                | "boolean"
                                | "subCommand"
                                | "subCommandGroup"
                                | "user"
                                | "channel"
                                | "role"
                                | "mentionable"
                                | "integer"
                                | "attachment";

export type DRCommandType = "chatInput" | "user" | "message";