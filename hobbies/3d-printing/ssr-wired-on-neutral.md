---
title: When an SSR Is Wired on Neutral Instead of Live
parent: 3D Printing
grand_parent: Hobbies
nav_order: 1
---

This turned out to be an electrical wiring issue, not a PID tuning problem.

The symptom was a small but persistent oscillation around the bed temperature setpoint. In the graph below, the red line is the target and the blue line is the measured value. Up to roughly `15:34`, the measurement keeps wobbling. After the wiring-related fix, the temperature settles and stays flat.

![Simplified graph of the temperature oscillation before the fix and the stable temperature after it.]({{ '/hobbies/3d-printing/ssr-neutral-wiring-graph.svg' | relative_url }})

In this case, the diagnosis from the forum post was correct: the SSR was not wired on the correct mains conductor.

## What was wrong

The bed heater was controlled through an AC SSR, but the SSR was interrupting `neutral` instead of `live`.

That matters because switching neutral does not really make the heater side electrically "quiet." The heater can still remain connected to the live side of the mains, and with an AC SSR there is usually a small leakage current and a snubber network inside the relay. That is often enough to let the heater wiring, bed, or nearby cabling float at a noisy mains-related potential.

On a printer, that noise can couple into low-voltage wiring such as the thermistor lines or the controller ground reference. The result is not necessarily a dramatic failure. Sometimes it just looks like a strange temperature wobble, inconsistent readings, or control behavior that never quite settles.

## Why rotating the plug worked

The simplest fix in this setup was to rotate the printer power plug in the wall socket.

With a reversible mains plug such as Schuko, turning the plug `180°` swaps which internal conductor becomes `live` and which becomes `neutral`. If the SSR is wired into the wrong conductor inside the printer, rotating the plug can effectively put the SSR onto the live side without opening the machine.

That is why the behavior changed immediately. Nothing about the PID loop changed. The switched conductor changed.

## A bit of electrical explanation

On AC mains, `live` is the conductor that swings at mains voltage relative to earth. `Neutral` is bonded to earth upstream, so it normally stays close to earth potential.

The safe and correct pattern is to switch `live`, not neutral.

When the SSR switches live:

- the heater is disconnected from the high-potential side when off
- leakage and capacitive coupling have less opportunity to drag the heater side upward
- nearby sensor wiring sees less mains-referenced noise

When the SSR switches neutral instead:

- the heater can remain tied to live even when control is "off"
- the SSR leakage path and cable capacitance can still inject noise
- the bed circuit may float relative to earth and upset sensitive temperature measurement

That explanation matches the graph: before the fix, the measured temperature showed a repeating oscillation; after the plug was rotated, the reading became stable.

## The practical fix

For this specific printer, the easiest fix was:

1. Power the printer down.
2. Pull the mains plug from the socket.
3. Rotate it `180°`.
4. Plug it back in and test the bed heating behavior again.

If the plug is polarized and only fits one way, this workaround does not apply.

## The proper long-term fix

Rotating the plug is the simplest field fix, but it is really a workaround for incorrect internal mains wiring.

The proper fix is to wire the SSR so it interrupts the `live` conductor, while keeping protective earth intact and untouched. If you are not comfortable verifying mains wiring safely, stop at the plug rotation test and have someone qualified correct the internal wiring.

Do not defeat earth, and do not treat neutral as a substitute for a true disconnect.
