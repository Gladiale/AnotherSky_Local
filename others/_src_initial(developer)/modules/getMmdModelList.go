package modules

import (
	modules "initialData/modules/sort"
	"log"
	"os"
	"path/filepath"
)

func getMmdModelFile(path string) []string {
	var fileList []string

	// フォルダ内データを取得
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	// .pmx .pmd 拡張子のファイルのみを取得
	for _, entry := range entries {
		ext := filepath.Ext(entry.Name())
		if ext == ".pmx" || ext == ".pmd" || ext == ".PMX" || ext == ".PMD" {
			fileList = append(fileList, entry.Name())
		}
	}

	// Zero埋めsort
	modules.SortByZeroPadding(fileList)
	return fileList
}

func GetMmdModelList(path string) []string {
	var fileList []string

	mmdFolderList := GetFolderList(path)
	for _, mmdFolder := range mmdFolderList {
		mmdFileList := getMmdModelFile(path + "/" + mmdFolder)
		if len(mmdFileList) > 0 {
			for _, file := range mmdFileList {
				fileList = append(fileList, mmdFolder+"/"+file)
			}
		}
	}
	return fileList
}
