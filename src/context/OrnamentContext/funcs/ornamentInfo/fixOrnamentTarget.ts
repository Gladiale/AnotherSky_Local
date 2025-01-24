import { type OrnamentInfoType } from "../../ornamentInit";

const fixOrnamentTarget = (
  target: keyof OrnamentInfoType
): "back-light" | "magic-circle" => {
  switch (target) {
    case "backLight":
      return "back-light";
    case "magicCircle1st":
      return "magic-circle";
    case "magicCircle2nd":
      return "magic-circle";
    default:
      throw new Error("不明なKeywordです");
  }
};

export { fixOrnamentTarget };
