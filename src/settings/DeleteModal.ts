/*
 * 'Shell commands' plugin for Obsidian.
 * Copyright (C) 2021 - 2022 Jarkko Linnanvirta
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact the author (Jarkko Linnanvirta): https://github.com/Taitava/
 */

import {SC_Modal} from "../SC_Modal";
import SC_Plugin from "../main";
import {SettingFieldGroup} from "./SC_MainSettingsTab";
import {TShellCommand} from "../TShellCommand";
import {debugLog} from "../Debug";

/**
 * TODO: Rename to DeleteShellCommandModal
 */
export class DeleteModal extends SC_Modal {

    private readonly shell_command_id: string;
    private readonly t_shell_command: TShellCommand;
    private setting_group: SettingFieldGroup;
    private shell_command_element: HTMLElement;

    constructor(plugin: SC_Plugin, shell_command_id: string, setting_group: SettingFieldGroup, shell_command_element: HTMLElement) {
        super(plugin);
        this.shell_command_id = shell_command_id;
        this.t_shell_command = plugin.getTShellCommands()[shell_command_id];
        this.setting_group = setting_group;
        this.shell_command_element = shell_command_element;
    }

    public onOpen() {
        super.onOpen();

        this.modalEl.createEl("h2", {text: "Delete: " + this.t_shell_command.getShellCommand()}); // TODO: Use this.setTitle() instead.
        if (this.t_shell_command.getAlias()) {
            this.modalEl.createEl("p", {text: "Alias: " + this.t_shell_command.getAlias()});
        }
        this.modalEl.createEl("p", {text: "Are you sure you want to delete this shell command?"});
        const delete_button = this.modalEl.createEl("button", {text: "Yes, delete"});
        delete_button.onclick = async () => this.approve();
    }

    protected async approve() {
        // Unregister possible events in order to prevent them becoming ghosts that just keep executing even after removing the configuration.
        this.t_shell_command.unregisterSC_Events();

        // Remove the command
        debugLog("Command " + this.shell_command_id + " gonna be removed.");
        this.t_shell_command.unregisterFromCommandPalette(); // Remove from the command palette.
        delete this.plugin.getTShellCommands()[this.shell_command_id]; // Remove the TShellCommand object.
        const shell_command_index = this.plugin.getShellCommandConfigurationIndex(this.shell_command_id);
        this.plugin.settings.shell_commands.splice(shell_command_index,1); // Remove from the plugin's settings.

        // Remove the setting fields
        this.shell_command_element.remove();

        await this.plugin.saveSettings();
        debugLog("Command removed.");
        this.close();
    }

}