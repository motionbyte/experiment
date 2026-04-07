/**
 * Minimal typings for three.js JSM examples (no official .d.ts in package).
 * Keeps `tsc -b` happy for OBJLoader and RoomEnvironment imports.
 */
declare module "three/examples/jsm/loaders/OBJLoader.js" {
  import type { Group, Loader } from "three";

  export class OBJLoader extends Loader {
    load(
      url: string,
      onLoad: (object: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void
    ): void;
  }
}

declare module "three/examples/jsm/environments/RoomEnvironment.js" {
  import type { Scene } from "three";

  export class RoomEnvironment extends Scene {
    constructor(renderer?: unknown);
  }
}
