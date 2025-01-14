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

import {
    ItemView,
    WorkspaceLeaf,
} from "obsidian";
import SC_Plugin from "../../main";

export class CustomVariableView extends ItemView {

    public static ViewType = "SC-custom-variables-view";

    constructor(
        private plugin: SC_Plugin,
        leaf: WorkspaceLeaf
    ) {
        super(leaf);
    }

    public getDisplayText(): string {
        return "Custom variables";
    }

    public getViewType(): string {
        return CustomVariableView.ViewType;
    }

    public getIcon() {
        return "code-glyph";
    }

    private container_element: HTMLDivElement;
    protected async onOpen(): Promise<void> {
        this.container_element = this.containerEl.children[1].createDiv(); // I don't know why I cannot create elements directly under this.containerEl (they wouldn't show up). I did the same thing as was done here: https://marcus.se.net/obsidian-plugin-docs/guides/custom-views (referenced 2022-03-23).
        this.container_element.addClass("container");

        await this.updateContent();
    }

    public async updateContent() {
        this.container_element.empty();
        this.container_element.createEl("h3", {text: "Custom variables"});
        for (const custom_variable_instance of this.plugin.getCustomVariableInstances().values()) {
            let custom_variable_value = (await custom_variable_instance.getCustomVariable().getValue()).value;
            let emphasize = false;
            if (null === custom_variable_value) {
                custom_variable_value = "No value yet.";
                emphasize = true;
            } else if ("" === custom_variable_value) {
                custom_variable_value = "An empty text.";
                emphasize = true;
            }
            const variable_list_element: HTMLUListElement = this.container_element.createEl("ul");
            const variable_list_item_element = variable_list_element.createEl("li", {
                text: custom_variable_instance.getFullName(),
                attr: {
                    "aria-label": custom_variable_instance.configuration.description,
                },
            });
            variable_list_item_element.createEl("br");
            let variable_list_item_element_child: HTMLElement;
            if (emphasize) {
                variable_list_item_element_child = variable_list_item_element.createEl("em");
            } else {
                // Bold normal values to make them more prominent in contrast to variable names and "No value yet."/"An empty text." texts.
                variable_list_item_element_child = variable_list_item_element.createEl("strong");
            }
            variable_list_item_element_child.insertAdjacentText("beforeend", custom_variable_value);
        }
    }

}