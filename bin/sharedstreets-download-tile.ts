#! /usr/bin/env node

import meow from "meow";
import * as api from "../index.js";
import { Layer, Output, Tile } from "../index.js";

const cli = meow(`
    Usage:
      $ sharedstreets-download-tile

    Options:
      --tile                  tile [x,y,zoom]
      --layer                 layer (geometry|intersection|metadata|reference)
      --output                output format [default="pbf"] (pbf|json)

    Examples:
      $ sharedstreets-download-tile --tile [1186,1466,12] --layer "geometry" > "12-1186-1466.geometry.pbf"
`);

// To-Do Error handling for options
const tile = JSON.parse(cli.flags.tile as string) as Tile;
const layer = cli.flags.layer as Layer;
const output = cli.flags.output as Output;

api.downloadTile(tile, layer, { output })
  .then(((pbf) => process.stdout.write(pbf)));
