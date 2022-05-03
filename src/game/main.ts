import { AUTO, Game } from "phaser";
import { GameScene } from "@/game/scene";

export class PDevGame {
  game: Phaser.Game;

  constructor(parentContainer: HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      parent: parentContainer,
      scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: [new GameScene(0)],
    };

    this.game = new Game(config);
  }

  resize(newWidth: integer, newHeight: integer): void {
    console.log(`Reszie event! ${newWidth} x ${newHeight}`);
    this.game.scale.resize(newWidth, newHeight);
  }
}
