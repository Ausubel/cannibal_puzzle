import SpriteProvider from "./assetmanagers/SpriteProvider";
import Game from "./main/Game";

async function loadAsyncAssets() {
    await SpriteProvider.init();
}
async function main() {
    await loadAsyncAssets();
    new Game().init();
}
window.addEventListener("DOMContentLoaded", main);