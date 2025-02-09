package modules

type DataType map[string][]string

func CreateData(target string) DataType {
	data := make(DataType)
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

	return data
}
