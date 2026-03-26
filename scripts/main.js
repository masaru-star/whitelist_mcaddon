import { world, system } from "@minecraft/server";
import whitelist from "./whitelist.json";

world.afterEvents.playerSpawn.subscribe((event) => {
    const player = event.player;
    const { name } = player;
    if (!event.initialSpawn) return;
    const isAllowed = whitelist.allowed_players.includes(name);

    if (!isAllowed) {
        system.run(() => {
            world.getDimension("overworld").runCommand(`kick "${name}" §cあなたは許可リストに含まれていません。`);
            console.warn(`[Whitelist] ${name} をキックしました。`);
        });
    } else {
        console.warn(`[Whitelist] ${name} の参加を許可しました。`);
    }
});
