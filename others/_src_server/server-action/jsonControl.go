package serverAction

import (
	"encoding/json"
	"io"
	"os"
)

func getJsonData(url string) ([]FilterData, error) {
	jsonFile, err := os.Open(url)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	jsonData, err := io.ReadAll(jsonFile)
	if err != nil {
		return nil, err
	}

	//  JSON形式のバイト列を Go のデータ構造 (構造体、マップ、スライスなど) に デシリアライズ (Unmarshal) します。デシリアライズとは、JSONデータを Go のデータ型に変換することです。
	var filterList []FilterData
	json.Unmarshal(jsonData, &filterList)

	if err := jsonFile.Close(); err != nil {
		return nil, err
	}

	return filterList, nil
}

func outputJsonFile(url string, jsonData []FilterData) error {
	// ファイルを書き込みモードで開き、存在しない場合は作成、既存の場合は内容をtruncate (空にする)
	jsonFile, err := os.OpenFile(url, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	// 構造体をJSONにシリアライズ(インデント付き, 第三引数はインデント)
	outputJsonData, err := json.MarshalIndent(jsonData, "", "\t")
	if err != nil {
		return err
	}

	_, err = jsonFile.Write(outputJsonData)
	if err != nil {
		return err
	}

	if err = jsonFile.Close(); err != nil {
		return err
	}

	return nil
}
