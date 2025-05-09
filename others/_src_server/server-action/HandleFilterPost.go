package serverAction

import (
	"encoding/json"

	"github.com/gofiber/fiber/v3"
)

func HandleFilterPost(c fiber.Ctx) error {
	// jsonデータ読み込み
	jsonData, err := getJsonData("dist/filterData.json")
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Failed Read filterData.json")
	}

	// データ操作
	// クライアントから送信されたデータを取得
	clientData := c.Body()
	// デシリアライズ
	var postData FilterData
	if err = json.Unmarshal(clientData, &postData); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "データ構造が間違っています")
	}
	jsonData = append(jsonData, postData)

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
