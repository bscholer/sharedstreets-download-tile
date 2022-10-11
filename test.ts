// tslint:disable:variable-name
// This lets us use __filename and __dirname, which we have to define ourselves because of ESM

import fs from "fs";
import path, { dirname } from "path";
import test from "tape";
import { fileURLToPath } from "url";
import * as api from "./index.js";
import { Layer } from "./index.js";

const tile = [1186, 1466, 12];
const [x, y, z] = tile;
const layers: Layer[] = ["geometry", "intersection", "metadata", "reference"];

test("sharedstreets-api -- Download Tile", async (t) => {
  await Promise.all(layers.map(async (layer) => {
    // Download PBF
    const pbf = await api.downloadTile(tile, layer);
    // tslint:disable-next-line:whitespace
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const fileout = path.join(__dirname, "test", "out", `${z}-${x}-${y}.${layer}.pbf`);
    fs.writeFileSync(fileout, pbf);
    t.pass(layer);
  }));
  t.end();
});
