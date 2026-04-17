---
title: General Gold Tracker
parent: World of Warcraft Addons
grand_parent: Projects
nav_order: 1
---

[General Gold Tracker](https://github.com/meltiseugen/WoW-General-Gold-Tracker) is a Retail World of Warcraft addon for tracking how much a farming session is worth.

It combines raw looted gold, vendor value, Auction House value through TradeSkillMaster, session summaries, highlights, and session history by date and location.

## Project details

- Repository: [meltiseugen/WoW-General-Gold-Tracker](https://github.com/meltiseugen/WoW-General-Gold-Tracker)
- Language: Lua
- Target: World of Warcraft Retail
- Saved data: `WoWGeneralGoldTrackerDB`
- Optional dependency: TradeSkillMaster

## Main features

- Session-based gold and loot value tracking.
- TradeSkillMaster value source with configurable fallback pricing.
- Vendor value tracking separate from Auction House filtering.
- Minimum item quality filter for Auction House tracked loot.
- Highlight notifications after a configured value threshold is reached.
- Auto-start options for first loot, world or instance entry, and session resume after `/reload`.
- Session history with date filtering, total sorting, merge tools, split-by-location tools, and location details.

## Commands

- `/gt` opens the main tracker window.
- `/gt start` starts a session.
- `/gt new` forces a new session.
- `/gt stop` stops a session.
- `/gt options` opens the options panel.
- `/gt total` toggles the compact total window.
- `/gt help` shows command help.
- `/gtt` opens the compact total window.

## Why it is useful

Gold farming is easier to evaluate when the session has a clear start, a clear end, and a concrete total. This addon turns a farming run into something measurable by combining looted currency, item value, and session history in one place.
