---
title: Platynator Quest Tracker
parent: World of Warcraft Addons
grand_parent: Projects
nav_order: 4
---

[Platynator Quest Tracker](https://github.com/meltiseugen/WoW-Platynator-QuestTracker) is a fork of the Platynator nameplate addon that adds a quest tracking text widget to mob nameplates.

The project explicitly credits the original Platynator maintainer and keeps the base addon concept intact while adding quest progress visibility around nameplates.

## Project details

- Repository: [meltiseugen/WoW-Platynator-QuestTracker](https://github.com/meltiseugen/WoW-Platynator-QuestTracker)
- Original addon: [Platynator](https://www.curseforge.com/wow/addons/platynator)
- Language: Lua
- Saved data: `PLATYNATOR_CONFIG`
- Category: unit frames and nameplates

## Main features

- Adds a `Quest Tracker` widget under the nameplate text options.
- Shows quest progress text around mob nameplates.
- Uses tooltip API information for quest-related units.
- Supports kill, fetch, and fill-the-bar quest progress.
- Can show the first related quest or all related quests for a mob.
- Includes party support so quest progress from party members can be displayed near the nameplate text.
- Supports Classic and Anniversary versions when Questie provides quest information in tooltips.

## Important constraints

- Credits and base ownership belong to the original Platynator project.
- The original Platynator addon and this fork should not be installed at the same time.
- Party support is intended for party groups, not raid groups.

## Why it is useful

Quest progress is easier to follow when it appears next to the target involved in the quest. This fork reduces the need to constantly cross-reference the quest tracker, tooltip, and nameplates while questing alone or with a party.
