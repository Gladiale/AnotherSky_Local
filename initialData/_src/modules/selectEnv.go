package modules

import (
	"fmt"

	"github.com/manifoldco/promptui"
)

var env string
var Path map[string]string

func SelectEnv() {
	prompt := promptui.Select{
		Label: "--- 作動環境を選択 ---",
		Items: []string{"開発環境(DEV)", "本番環境(REAL)"},
	}

	_, result, err := prompt.Run() // 入力を受け取る

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

	if result == "開発環境(DEV)" {
		env = "public"
	} else {
		env = "dist"
	}

	Path = map[string]string{
		"target": "../../" + env + "/",
		"export": "../../" + env + "/",
	}
}
