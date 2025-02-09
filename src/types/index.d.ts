import { string } from "three/tsl";

type FolderListType =
  | "cgData"
  | "characterData"
  | "effectData"
  | "mmdData"
  | "ornamentData"
  | "videoData"
  | "voiceData";
type FolderDataType = Record<FolderListType, { [key: string]: string[] }>;

type FilterDataType = {
  opacity: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
};

type MediaStateType = {
  image: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    // パソコン用
    isEditMode: boolean;
  };
  effect: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    isEditMode: boolean;
  };
  video: {
    deg: number;
    scale: number;
    position: { x: number; y: number };
    isEditMode: boolean;
  };
  // スマホ用
  touchMode: "scaleMode" | "positionMode" | "rotateMod" | "closed";
};

export type { FolderDataType, FilterDataType, MediaStateType };
