const MODULE_ID = "tokenflip-fix";

class TokenFlipFix {
    static init() {
        // Проверяем, установлен и активирован ли модуль TokenFlip
        if (!game.modules.get("tokenflip")?.active) {
            console.warn(`${MODULE_ID} | TokenFlip module is not active. This module requires TokenFlip to function properly.`);
            return;
        }

        console.log(`${MODULE_ID} | Initializing TokenFlip Fix`);
        this.initHooks();
    }

    static initHooks() {
        Hooks.once("ready", () => {
            // Дополнительная проверка после загрузки игры
            if (!game.modules.get("tokenflip")?.active) {
                ui.notifications.warn(`TokenFlip Fix requires the TokenFlip module to be installed and active!`);
                return;
            }
        });

        Hooks.on("createActor", async (actor, options, userId) => {
            if (!game.user.isGM) return;
            
            try {
                const tokenFaces = actor.prototypeToken.flags?.tokenflip?.tokenfaces;
                if (!tokenFaces) return;

                console.log(`${MODULE_ID} | Fixing token faces for actor ${actor.id}`);
                
                const updatedFaces = tokenFaces.map(face => ({
                    ...face,
                    actorId: actor.id
                }));

                await actor.update({ "prototypeToken.flags.tokenflip.tokenfaces": updatedFaces });

                // Обновляем существующие токены актера
                const tokens = actor.getActiveTokens();
                for (const token of tokens) {
                    try {
                        await token.update({ "flags.tokenflip.tokenfaces": updatedFaces });
                        console.log(`${MODULE_ID} | Successfully updated token ${token.id}`);
                    } catch (e) {
                        console.warn(`${MODULE_ID} | Failed to update token ${token.id}:`, e);
                    }
                }
            } catch (e) {
                console.error(`${MODULE_ID} | Error processing actor ${actor.id}:`, e);
            }
        });
    }
}

Hooks.once("init", () => TokenFlipFix.init());