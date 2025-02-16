package serverAction

import (
	"encoding/json"
	"strconv"

	"github.com/gofiber/fiber/v3"
)

func HandleFilterUpdate(c fiber.Ctx) error {
	// jsonデータ読み込み
	jsonData, err := getJsonData("dist/filterData.json")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Read filterData.json")
	}

	// 指定のデータを更新
	index, err := strconv.Atoi(c.Params("index"))
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid Filter ID")
	}
	if index >= len(jsonData) {
		return fiber.NewError(fiber.StatusBadRequest, "Over Max ID")
	}
	// クライアントから送信されたデータを取得
	clientData := c.Body()
	// デシリアライズ
	var postData FilterData
	if err = json.Unmarshal(clientData, &postData); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "データ構造が間違っています")
	}
	jsonData[index] = postData

	// 処理後のデータを書き出し
	err = outputJsonFile("dist/filterData.json", jsonData)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Write filterData.json")
	}

	// c.Set("Cache-Control", "no-store")
	// return c.SendFile("dist/filterData.json")
	return nil
}
