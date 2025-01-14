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

import {SC_WorkspaceEvent} from "./SC_WorkspaceEvent";
import {ShellCommandParsingProcess, TShellCommand} from "../TShellCommand";
import {
    Menu,
    MenuItem,
} from "obsidian";

export abstract class SC_MenuEvent extends SC_WorkspaceEvent {

    protected async addTShellCommandToMenu(t_shell_command: TShellCommand, menu: Menu) {
        // Create the menu item as soon as possible. (If it's created after 'await parsing_process.process()' below, it won't be shown in the menu for some reason, at least in Obsidian 0.16.1).
        // No title is set here, it will be set later.
        let menu_item: MenuItem;
        menu.addItem(item => menu_item = item
            .setIcon(t_shell_command.getIconId()) // Icon id can be null.
            .onClick(async () => {
                await this.trigger(
                    t_shell_command,
                    parsing_process,
                );
            }),
        );

        // Parse shell command variables to get a title
        let title = t_shell_command.getAliasOrShellCommand(); // May contain unparsed variables.
        let parsing_process: ShellCommandParsingProcess;
        if (this.plugin.settings.preview_variables_in_command_palette) {
            // Start a parsing process
            parsing_process = t_shell_command.createParsingProcess(this);
            if (await parsing_process.process()) {
                // Parsing succeeded.
                const parsing_results = parsing_process.getParsingResults();
                title = parsing_results["alias"].parsed_content || parsing_results["shell_command"].parsed_content; // Try to use a parsed alias, but if no alias is available, use a parsed shell command instead.
            }
            // If parsing process fails, the failed process can be passed to this.trigger(). The execution will eventually be cancelled and error messages displayed (if displaying is allowed).
        }

        // Update menu item title.
        menu_item.setTitle(title);
    }
}