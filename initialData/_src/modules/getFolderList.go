package modules

import (
	"fmt"
	modules "initialData/modules/sort"
	"log"
	"os"
	"strings"
	"time"
)

func GetFolderList(path string) []string {
	var folderList []string

	// フォルダ内データを取得
	entries, err := os.ReadDir(path)
	if err != nil {
		strList := strings.Split(path, "/")
		target := strList[len(strList)-1]
		fmt.Printf("Error: %s フォルダーが見つかりません！\n", target)
		time.Sleep(3 * time.Second)
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
