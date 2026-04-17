---
title: TODO Planner
parent: World of Warcraft Addons
grand_parent: Projects
nav_order: 3
---

[TODO Planner](https://github.com/meltiseugen/WoW-ToDo-Planner) is a Kanban-style planner addon for World of Warcraft.

It gives players a lightweight in-game board for planning goals across characters, while still supporting shared account-wide tasks.

## Project details

- Repository: [meltiseugen/WoW-ToDo-Planner](https://github.com/meltiseugen/WoW-ToDo-Planner)
- Language: Lua
- Saved data: `TODOPlannerDB`
- Model: account-wide data with global and per-character boards

## Main features

- Account-wide data storage.
- Character board selector with a `Global` board.
- Global tasks visible on every character board.
- Per-character progress states for shared global tasks.
- Three Kanban columns: `To Do`, `In Progress`, and `Done`.
- Task fields for title, notes, category, board location, status, and timestamps.
- Categories for achievements, mounts, collections, reputation, and other goals.
- Category filtering, task editing, task deletion, status movement, and draggable window position.

## Commands

- `/tdp` or `/todoplanner` toggles the planner window.
- `/tdp show` shows the window.
- `/tdp hide` hides the window.
- `/tdp resetpos` resets the window position.
- `/tdp help` prints command help.

## Why it is useful

World of Warcraft goals often span multiple characters and many sessions. A Kanban-style addon keeps those goals visible in-game instead of forcing the player to manage notes in a separate tool.
