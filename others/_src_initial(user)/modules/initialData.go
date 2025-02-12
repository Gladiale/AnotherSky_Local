package modules

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func InitialData(folderList []string) {
	var exportData = make(map[string]interface{})
	exportPath := Path["export"] + "folderData" + ".json"

	for _, folder := range folderList {
		data := CreateData(folder)
		exportData[folder+"Data"] = data
		// 文字列をスペース埋め　参考: https://orebibou.com/ja/home/201706/20170612_001/
		fmt.Printf("-> %-10s フォルダー初期化完了\n", folder)
	}

	// mapをbytesに変換
	bytes, err := json.Marshal(exportData)
	if err != nil {
		log.Fatalln("JSON marshal error: ", err)
	}

	// データを書き出し
	writeErr := os.WriteFile(exportPath, bytes, 0644)
	if writeErr != nil {
		log.Fatalln("データの書き出しが失敗しました: ", err)
	}

	fmt.Printf("---全データ書き出し完了---\n")
}
