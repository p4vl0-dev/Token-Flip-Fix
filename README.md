# Tokenflip Fix

A simple Foundry Virtual Tabletop module (compatible with versions 12 and 13) that fixes a critical issue with token alternate faces (`faces`) when importing or migrating actors from one world to another. This module is a fix for the original [Tokenflip](https://foundryvtt.com/packages/tokenflip) module.

## What is this module for?

This module solves a specific problem that occurs when using the **Tokenflip** module to assign alternate faces to a token. The original Tokenflip logic incorrectly binds the face configurations to an existing actor instance in your world. When you export such an actor to a compendium and then import it into a new world, the alternate faces lose their correct reference. Instead of pointing to the newly imported actor, they point to the first actor found in the new world, making it impossible to use multi-face tokens across different game worlds.

**Tokenflip Fix** ensures that all alternate faces, created by the Tokenflip module, are correctly associated with their rightful actor after any import or creation.

## How does it work?

The module operates automatically and requires no configuration from the user.

1.  It listens for the event when an actor is created in your world (this happens when you import it from a compendium or create it anew).
2.  It checks if this new actor has any alternate faces configured by the Tokenflip module (this data is stored in the actor's `flags`).
3.  If alternate faces are found, the module loops through each one and updates its linked actor reference to point to the newly created actor itself.

This simple process guarantees that the connection between the actor and its token faces is always preserved correctly during migration.

## Installation

1.  Inside Foundry VTT, go to the **Add-on Modules** tab.
2.  Click **Install Module** and use the following Manifest URL:
    `https://github.com/p4vl0-dev/Token-Flip-Fix/releases/latest/download/module.json`

## Feedback and Bug Reports

If you encounter any bugs, issues, or have suggestions for improvement, please report them:
-   Create an [Issue](https://github.com/p4vl0-dev/Token-Flip-Fix/issues) on this GitHub repository.
-   Or contact me directly on Discord: `p4vl0o`
