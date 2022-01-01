import {SC_WorkspaceEvent} from "./SC_WorkspaceEvent";

export class SC_Event_onQuit extends SC_WorkspaceEvent {
    protected static readonly event_code = "on-quit";
    protected static readonly event_title = "Before Obsidian quits";
    protected readonly workspace_event = "quit";
}