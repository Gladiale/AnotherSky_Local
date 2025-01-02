package modules

import (
	modules "initialData/modules/sort"
	"log"
	"os"
)

func GetFolderList(path string) []string {
	var folderList []string

	// フォルダ内データを取得
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	// フォルダ名を取得
	for _, entry := range entries {
		if entry.IsDir() {
			folderList = append(folderList, entry.Name())
		}
	}

	//zero埋めSort
	modules.SortByZeroPadding(folderList)

	return folderList
}
