package modules

import (
	modules "initialData/modules/sort"
	"log"
	"os"
)

func GetFileList(path string) []string {
	var fileList []string

	// フォルダ内データを取得
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	// ファイル名を取得
	for _, entry := range entries {
		if !entry.IsDir() {
			fileList = append(fileList, entry.Name())
		}
	}

	// Zero埋めsort
	modules.SortByZeroPadding(fileList)
	return fileList
}
