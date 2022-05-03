import SimplexNoise from "simplex-noise";
import cv from "opencv-ts";

export class GameScene extends Phaser.Scene {
  noiseGen: SimplexNoise;
  map: integer[][] = [];
  tileMap?: Phaser.Tilemaps.Tilemap;
  layer?: Phaser.Tilemaps.TilemapLayer;
  readonly mapSize = 32;

  constructor(seed: number) {
    super("booting...");
    this.noiseGen = new SimplexNoise(seed);
  }

  generateMaps(): void {
    const scale = 50;
    const numTiles = 48;

    for (let x = 0; x < this.mapSize; x++) {
      const row = [];
      for (let y = 0; y < this.mapSize; y++) {
        row[y] =
          ((this.noiseGen.noise2D(x / scale, y / scale) + 1) / 2) *
          (numTiles - 1);
      }
      this.map[x] = row;
    }

    console.log("generated tiles");

    // This is an async callback
    cv.onRuntimeInitialized = () => {
      console.log("opencv init...");
      const mat = cv.matFromArray(
        this.mapSize,
        this.mapSize,
        0,
        this.map.flat()
      );
    };
  }

  preload(): void {
    console.log("preload");

    this.load.image("tiles", "assets/tilemaps/tiles/tmw_desert_spacing.png");

    this.generateMaps();
    // setInterval(this.updateTiles.bind(this), 1000);
  }

  create(): void {
    console.log("create");

    this.tileMap = this.make.tilemap({
      data: this.map,
    });

    const tileset = this.tileMap.addTilesetImage(
      "tiles",
      undefined,
      32,
      32,
      1,
      1
    );
    this.layer = this.tileMap.createLayer(0, tileset, 0, 0);
  }

  updateTiles(): void {
    console.log("update tiles");
    this.generateMaps();
    this.tileMap?.putTilesAt(this.map, 0, 0);
  }
}
