# Shell commands plugin for Obsidian

This plugin lets you define shell/terminal commands in settings and run them quickly when needed via Obsidian's command palette, or via hotkeys that you can assign in Obsidian's hotkey settings.

You can customise your commands with built-in variables that can provide the current file title/name/path, current file's parent folder name/path, and date/time stamp with a custom format.

**Note:** This plugin is still under development and will be improved some da... some ye... some decade!

**WARNING:** Be careful with system commands! Only use commands that you know and trust. If you are copy pasting commands from the internet or from files written by other people, you need to understand precisely what those commands do! Otherwise, you might lose your files, or screw up your system!

**This plugin doesn't come with any kind of warranty in case it does something bad to your files!** If you know programming, [check the source code in GitHub](https://github.com/Taitava/obsidian-shellcommands) ([mainly this file](https://github.com/Taitava/obsidian-shellcommands/blob/main/main.ts)) so you know how it executes commands. The source code is not long.

## Main issues

- Only tested on Windows and Linux at the moment. I don't have a Mac, so I can't test this on Mac. [Help wanted!](https://github.com/Taitava/obsidian-shellcommands/issues/1) :)
- Android and iPhone/iPad: I guess this does not work on these devices, because it uses NodeJS's `child_process`, so I've flagged this plugin as desktop only. Please raise an issue in GitHub if you are interested in support for Android/iOS.

## Would be nice to have features (these are not so important):
- Add configurable environment variables, that will be passed to the executed processes. This way you could for example indicate tell your own made script/program that you initiated it from Obsidian, in case it happens to have practical benefit.
- A configurable timeout (milliseconds). If the command execution takes longer than the timeout, a kill signal would be sent (`SIGTERM`). Timeout could be defined in the settings, and it would be turned off by default. Currently, there is no timeout.

## Installation & usage

1. Search for this plugin in Obsidian's community plugins settings panel.
2. Click Install, and after that **remember to click Enable**!
3. Head to *Shell commands* settings tab.
4. All commands will be run in a certain directory. By default, it's your vault's base directory. If you want to run the commands in some other directory, you can type it in the *Working directory* field.
5. Define one or more commands by clicking the *New command* button, entering a command and clicking *Apply changes*. Read variable usage instructions in the settings panel if you need them.
6. All commands that you have defined, will be added to Obsidian's command palette. You can execute them from there (by hitting `Ctrl/Cmd + P` and searching for your command) or you can define a hotkey for each individual command in Obsidian's Hotkeys settings tab.

## Usage examples

These examples are written for Windows, but you can invent similar ones in Linux and Mac too.

| Purpose | Command | Hotkey |
| ------- | ------- | ------ |
| Open a graphical [Git](https://git-scm.com/) client for committing changes in your vault to a repository. | `start git-gui` | Ctrl + Shift + G |
| Open a Git command line client for advanced management of a repository. | `start "" "%PROGRAMFILES%\Git\bin\sh.exe" --login` | Ctrl + Alt + G | <!-- Command copied 2021-08-22 from https://stackoverflow.com/a/17306604/2754026  -->
| Commit the current file in a quick & dirty way to Git (not the best way in all cases). | `git add "{{file_path:relative}}" & git commit -m "Meeting notes {{date:YYYY-MM-DD}}" & git push` | Ctrl + Alt + Shift + G |
| A quick way to run other commands that you have not defined in the settings. | `start cmd` | Ctrl + Shift + C |
| In case you feel creative... | `mspaint` | Ctrl + Shift + P |
| The quickest way to write bug reports regarding this plugin. | `start https://github.com/Taitava/obsidian-shellcommands/issues/new` | Ctrl + Shift + B |
| Create a monthly folder like 2021-08. | `mkdir {{date:YYYY-MM}}` | Ctrl + Shift + M |
| Create a new file and paste content there from clipboard. | `echo {{clipboard}} >> NewNote.md` | Ctrl + Shift + N |
| Search the web using text you have selected. | `start https://duckduckgo.com/?q={{selection}}` | Ctrl + Shift + S |

These are just examples, and this plugin **does not** define them for you automatically. They are listed only to give you ideas of what kind of commands you could configure yourself, and what kind of hotkeys you could assign to them. The mentioned hotkeys are not reserved for other uses in Obsidian (v. 0.12.12) at the time of writing these examples.

## Tested platforms

Here is a list of operating systems this plugin has been tested on, along with Obsidian version and the plugin's version (= SC, Shell commands).

| Windows 10 | Linux (Xubuntu 20.04)
| ---------- | ------
| Obsidian 0.12.12<br>SC 0.0.0<br>Works | Obsidian 0.12.12<br>SC 0.0.0<br>Works

## Contributing
Ideas, issues, feedback, pull requests etc. are all welcome! :)

If you have a Mac, I'd be very glad if you could [test this plugin on your Mac and report here](https://github.com/Taitava/obsidian-shellcommands/issues/1).

## Author

Jarkko Linnanvirta

Contact:
 - https://github.com/Taitava
 - https://forum.obsidian.md/u/jare/