# Custom Vencord Plugins in Vesktop

This custom build of Vesktop contains a built-in pre-bundled copy of Vencord which includes custom plugins (such as **CustomSounds**).

## How to Add Your Own Custom Plugins

If you want to add or modify plugins, you can do it easily using the source code included in this repository:

1. **Add your plugin code**:
   * Navigate to the `vencord/src/plugins` folder inside this repository.
   * Create a new folder for your plugin (e.g. `myAwesomePlugin`).
   * Put your plugin code (e.g. `index.tsx`) in that folder.

2. **Re-bundle Vencord**:
   * Run the custom build utility script in the root directory:
     ```bash
     pnpm build:vencord
     ```
     This script will automatically compile Vencord and bundle the new compiled outputs directly into Vesktop's static resources (`static/dist`).

3. **Re-package the Vesktop Installer**:
   * Run the standard packaging command:
     ```bash
     pnpm package
     ```
     This will generate a new custom `.exe` installer under `dist/` containing all your updates!

## System Optimizations Enabled

This custom client is also compiled with several rendering and performance optimizations for Discord:
* Zero-copy graphics rasterization enabled.
* Full GPU rendering thread prioritization.
* Hardware acceleration forced (ignoring GPU driver blocklists).
* Direct web content compositing.
