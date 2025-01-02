package modules

import (
	"encoding/json"
	"fmt"
	"os"
)

func InitialData(targetFolder, outputName string) {
	data := CreateData(targetFolder)
	exportPath := Path["export"] + outputName + ".ts"
	exportWords := []byte("export const " + outputName + " = ")

	// mapをbytesに変換
	bytes, err := json.Marshal(data)
	if err != nil {
		fmt.Println("JSON marshal error: ", err)
		return
	}

	combinedData := append(exportWords, bytes...)

	// データを書き出し
	writeErr := os.WriteFile(exportPath, combinedData, 0644)
	if writeErr != nil {
		fmt.Println("データの書き出しが失敗しました: ", err)
		return
	}

	fmt.Printf("%s イニシャル成功しました！\n", outputName)
}
