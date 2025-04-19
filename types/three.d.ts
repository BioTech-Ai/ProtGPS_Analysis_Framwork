// This file provides type declarations for modules that don't have their own type definitions

declare module "three" {
  export * from "three/src/Three"
}

declare module "three/examples/jsm/controls/OrbitControls" {
  import { type Camera, EventDispatcher, type MOUSE, type Vector3 } from "three"

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement)
    object: Camera
    domElement: HTMLElement | Document
    enabled: boolean
    target: Vector3
    minDistance: number
    maxDistance: number
    minZoom: number
    maxZoom: number
    minPolarAngle: number
    maxPolarAngle: number
    minAzimuthAngle: number
    maxAzimuthAngle: number
    enableDamping: boolean
    dampingFactor: number
    enableZoom: boolean
    zoomSpeed: number
    enableRotate: boolean
    rotateSpeed: number
    enablePan: boolean
    panSpeed: number
    screenSpacePanning: boolean
    keyPanSpeed: number
    autoRotate: boolean
    autoRotateSpeed: number
    keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string }
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE }
    target0: Vector3
    position0: Vector3
    zoom0: number
    update(): boolean
    listenToKeyEvents(domElement: HTMLElement): void
    saveState(): void
    reset(): void
    dispose(): void
    getAzimuthalAngle(): number
    getPolarAngle(): number
    getDistance(): number
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader, type LoadingManager, type Group } from "three"

  export interface GLTF {
    animations: any[]
    scene: Group
    scenes: Group[]
    cameras: any[]
    asset: any
    parser: any
    userData: any
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager)
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void,
    ): void
    parse(
      data: ArrayBuffer | string,
      path: string,
      onLoad: (gltf: GLTF) => void,
      onError?: (event: ErrorEvent) => void,
    ): void
  }
}

// Add declarations for @react-three/fiber and @react-three/drei
declare module "@react-three/fiber" {
  export * from "@react-three/fiber"
}

declare module "@react-three/drei" {
  export * from "@react-three/drei"
}
