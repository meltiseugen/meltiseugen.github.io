---
title: TomTom Shared Party Point
parent: World of Warcraft Addons
grand_parent: Projects
nav_order: 5
---

[TomTom Shared Party Point](https://github.com/meltiseugen/WoW-TomTom-Shared-Party-Point) is an extension addon for TomTom that lets a party share a single active waypoint.

The goal is simple: instead of explaining where to go in chat, one player can create a shared map point and the rest of the party can see it.

## Project details

- Repository: [meltiseugen/WoW-TomTom-Shared-Party-Point](https://github.com/meltiseugen/WoW-TomTom-Shared-Party-Point)
- Language: Lua
- Dependency: TomTom
- Control style: keyboard and mouse combinations on the map

## Main features

- Adds a shared party waypoint without changing TomTom's core behavior.
- Creates the shared waypoint with `LeftShift + LeftMouse` on the map.
- Removes the shared waypoint with `LeftShift + RightMouse` or the normal TomTom remove action.
- Replaces the old shared waypoint whenever a new one is created.
- Tracks the shared point independently from normal TomTom waypoints.
- Uses a different icon style so the shared point can be distinguished from normal waypoints.

## Why it is useful

Groups often need one clear destination. This addon turns that into a single map interaction, reducing chat explanation and keeping party movement coordinated.
