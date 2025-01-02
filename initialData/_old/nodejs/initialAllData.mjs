import { initialData } from "./funcs/initialData.mjs";

// cg-imageフォルダをイニシャル
await initialData("cg", "CGDataObj");

// effect-imageフォルダをイニシャル
await initialData("effect", "EffectDataObj");

// stand-imageフォルダをイニシャル
await initialData("character", "CharacterDataObj");

// videoフォルダをイニシャル
await initialData("video", "VideoDataObj");

// voiceフォルダをイニシャル
await initialData("voice", "VoiceDataObj");

console.log("\n全プロセス成功しました。\n3秒後本プログラム自動終了。");

// コマンドライン閉じ
setTimeout(() => {
  process.exit(0); // プログラム終了
}, 3000);
