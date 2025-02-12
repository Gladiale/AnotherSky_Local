package modules

import "strings"

// 参考 https://qiita.com/tchnkmr/items/b3d0b884db8d7d91fb1b
// 名前が{○○}の構造のfolderは再帰のフォルダとして認識します
func IsRecursive(folder string) bool {
	if strings.HasPrefix(folder, "{") && strings.HasSuffix(folder, "}") {
		return true
	}
	return false
}

func GetRecursiveFileList(path, folder string, data map[string][]string) {
	innerFolderList := GetFolderList(path)

	for _, innerFolder := range innerFolderList {
		fileList := GetFileList(path + "/" + innerFolder)
		data[folder+"/"+innerFolder] = fileList
	}
}
