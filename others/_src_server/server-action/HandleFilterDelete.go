package serverAction

import (
	"encoding/json"
	"strconv"

	"github.com/gofiber/fiber/v3"
)

func HandleFilterDelete(c fiber.Ctx) error {
	// jsonデータ読み込み
	jsonData, err := getJsonData("dist/filterData.json")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Read filterData.json")
	}

	// 指定のデータを削除
	index, err := strconv.Atoi(c.Params("index"))
	if err != nil || index >= len(jsonData) || index < 0 {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid Filter ID")
	}
	jsonData = append(jsonData[:index], jsonData[index+1:]...)

	// 処理後のデータを書き出し
	err = outputJsonFile("dist/filterData.json", jsonData)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Write filterData.json")
	}

	// 構造体をJSONにシリアライズ (直接"dist/filterData.json"をreturnしたいが、うまくいかない)
	responseJsonData, err := json.Marshal(jsonData)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "シリアライズ失敗")
	}

	return c.Send(responseJsonData)
}
