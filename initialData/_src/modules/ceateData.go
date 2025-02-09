package modules

func CreateData(target string) DataType {
	data := make(map[string][]string)
	targetPath := Path["target"] + target

	folderList := GetFolderList(targetPath)

	for _, folder := range folderList {
		targetPath := targetPath + "/" + folder

		if target == "mmd" && folder == "model" {
			fileList := GetMmdModelList(targetPath)
			data[folder] = fileList
		} else {
			if IsRecursive(folder) {
				GetRecursiveFileList(targetPath, folder, data)
			} else {
				fileList := GetFileList(targetPath)
				data[folder] = fileList
			}
		}
	}

	return DataType{target + "Data": data}
}
