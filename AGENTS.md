# Zigbee Serial Adapter — Agent Notes

## Purpose
Implement a TypeScript class API that creates a Zigbee adapter from a **SONOFF ZB Dongle-P** (based on **TI CC2652P** + **CP2102N** chips).

## Hard Constraints
- **Web Serial API only**: `navigator.serial` is the only serial abstraction allowed.
- **Dual runtime**: must work in the **browser** and in **Node.js** (via a polyfill if needed).

## Hardware Context
- **SoC / RF**: TI CC2652P (Zigbee coordinator firmware, e.g. Z-Stack 3.x).
- **USB-to-UART**: Silicon Labs CP2102N.
- Pre-flashed with Z-Stack 3.x.0 coordinator firmware
- Typical baud rate for Z-Stack: **115200** (check firmware docs if changing).

## Tech Stack
- **TypeScript** (~6.0), strict settings enabled.
- **Vite** for bundling and dev server.
- **ESM only** (`"type": "module"`).
- `tsconfig` highlights: `es2023`, `DOM` lib, `bundler` resolution, `noUnusedLocals`, `verbatimModuleSyntax`.

## Runtime Strategy
- In the **browser**, use the native `navigator.serial` API.
- In **Node.js**, bring in a compatible polyfill (e.g. `serialport` + a Web Serial wrapper, or `web-serial-polyfill`). Keep the core adapter code free of environment branches; inject the serial port at construction or detect `globalThis.navigator.serial`.

## Architecture Hints
- Expose a single high-level adapter class (e.g. `ZigbeeAdapter`).
- Accept a `SerialPort` (or `SerialPort`-like) in the constructor, or provide a static helper to request/open the port.
- Separate frame parsing / protocol logic (Z-Stack, SLIP, etc.) from serial I/O.
- Handle backpressure and timeouts; the dongle can be slow to respond during firmware operations.

## What to Avoid
- Do **not** import Node-only modules (`fs`, `net`, etc.) in the shared library code.
- Do **not** use `serialport` APIs directly in the adapter class; always go through the Web Serial interface.

## Testing
- Browser: use the Vite dev server (`yarn dev`).
- Node: run a small script that imports the polyfill before importing the adapter.

## Open Questions / TODO
- Confirm exact Z-Stack firmware version and whether it uses SLIP, KVP, or another framing protocol.
- Decide polyfill package for Node.js (document choice here once made).
