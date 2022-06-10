import {
    ApplicationCommandData,
    ApplicationCommandResolvable,
    Awaitable,
    Client,
    FetchApplicationCommandOptions,
    Interaction, Message,
    Snowflake,
} from "discord.js";
import type {
    DRClientOptions,
    DRClientClass,
    DRCommandOptionType, DRCommandType
} from "../types";

export class DRClient implements DRClientClass {
    wrapperClient;
    constructor(options: DRClientOptions) {
        this.wrapperClient = new Client(options.clientOptions);

        // Setting Presence if given
        if (options.precense) {
            this.wrapperClient.once("ready", () => {
                this.wrapperClient.user.setPresence(options.precense);
            });
        }

        this.wrapperClient.login(options.token).then();
    }

    // Making data universal available
    public get application() {
        return this.wrapperClient.application;
    }

    public fetchUser(id: string) {
        if (id === "all") return this.wrapperClient.users.cache;
        return this.wrapperClient.users.fetch(id);
    }

    public fetchGuild(id: string) {
        if (id === "all") return this.wrapperClient.guilds.cache;
        return this.wrapperClient.guilds.fetch(id);
    }

    public fetchEmoji(id: string) {
        if (id === "all") return this.wrapperClient.guilds.cache;
        return this.wrapperClient.emojis.cache.get(id);
    }

    // Adding application-command management
    public createCommand(command: ApplicationCommandData, guildID?: Snowflake) {
        return this.wrapperClient.application.commands.create(command, guildID);
    }

    public fetchCommand(id: Snowflake, options?:FetchApplicationCommandOptions) {
        return this.wrapperClient.application.commands.fetch(id, options);
    }

    public deleteCommand(command: ApplicationCommandResolvable, guildID?: Snowflake) {
        return this.wrapperClient.application.commands.delete(command, guildID);
    }

    public editCommand(command: ApplicationCommandResolvable, data: ApplicationCommandData, guildID?: Snowflake) {
        return this.wrapperClient.application.commands.edit(command, data, guildID);
    }

    public setCommand(commands: ApplicationCommandData[], guildID?: Snowflake) {
        return this.wrapperClient.application.commands.set(commands, guildID);
    }

    // Converting Applicationcommand types to Discord.js Options
    public convertOptionType(option: DRCommandOptionType) {
        const data = {
            "string": "STRING",
            "number": "NUMBER",
            "boolean": "BOOLEAN",
            "subCommand": "SUB_COMMAND",
            "subCommandGroup": "SUB_COMMAND_GROUP",
            "user": "USER",
            "channel": "CHANNEL",
            "role": "ROLE",
            "mentionable": "MENTIONABLE",
            "integer": "INTEGER",
            "attachment": "ATTACHMENT",
        }

        return data[option] ?? data["string"];
    }

    public convertCommandType(type: DRCommandType) {
        const data = {
            "chatInput": "CHAT_INPUT",
            "user": "USER",
            "message": "MESSAGE",
        }

        return data[type] ?? data["chatInput"];
    }

    // Running Events universally
    public newInteractionListener(once: boolean, listener: (( interaction: Interaction ) => Awaitable<void>)) {
        if (once) {
            this.wrapperClient.once("interactionCreate", listener);
        } else {
            this.wrapperClient.on("interactionCreate", listener);
        }
    }

    public newMessageListener(once: boolean, listener: (( message: Message ) => Awaitable<void>)) {
        if (once) {
            this.wrapperClient.once("messageCreate", listener);
        } else {
            this.wrapperClient.on("messageCreate", listener);
        }
    }

    public debugListener(once: boolean, listener: (( info: string ) => Awaitable<void>)) {
        if (once) {
            this.wrapperClient.once("debug", listener);
        } else {
            this.wrapperClient.on("debug", listener);
        }
    }

    public warnListener(once: boolean, listener: (( info: string ) => Awaitable<void>)) {
        if (once) {
            this.wrapperClient.once("warn", listener);
        } else {
            this.wrapperClient.on("warn", listener);
        }
    }

    public errorListener(once: boolean, listener: (( info: Error ) => Awaitable<void>)) {
        if (once) {
            this.wrapperClient.once("error", listener);
        } else {
            this.wrapperClient.on("error", listener);
        }
    }
}