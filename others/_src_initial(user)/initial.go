package main

import (
	"fmt"
	"initial/modules"
	"os"
	"time"
)

func main() {
	folders := []string{"cg", "character", "effect", "mmd", "ornament", "video", "voice"}
	modules.InitialData(folders)

	fmt.Println("\n全プロセス成功しました, 3秒後本プログラム自動終了...")

	// 3秒間停止
	time.Sleep(3 * time.Second)

	// 0は正常終了を示し、0以外の値はエラーを示します。
	os.Exit(0)
}
