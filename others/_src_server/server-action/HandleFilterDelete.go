package serverAction

import (
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
	if err != nil || index >= len(jsonData) {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid Filter ID")
	}
	jsonData = append(jsonData[:index], jsonData[index+1:]...)

	// 処理後のデータを書き出し
	err = outputJsonFile("dist/filterData.json", jsonData)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Write filterData.json")
	}

	// c.Set("Cache-Control", "no-store")
	// return c.SendFile("dist/filterData.json")
	return nil
}
