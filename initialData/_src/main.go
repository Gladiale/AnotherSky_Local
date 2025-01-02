package main

import (
	"fmt"
	"initialData/modules"
	"os"
	"sync"
	"time"
)

func main() {
	// sync.WaitGroupを使用して、すべてのゴルーチンが完了するのを待つようにしました。これにより、プログラムが早期に終了することを防ぎます。
	// 各ゴルーチン内でwg.Done()を呼び出すことで、完了を通知します。
	var wg sync.WaitGroup

	// cgフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("cg", "CGDataObj")
	}()

	// characterフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("character", "CharacterDataObj")
	}()

	// videoフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("video", "VideoDataObj")
	}()

	// voiceフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("voice", "VoiceDataObj")
	}()

	// effectフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("effect", "EffectDataObj")
	}()

	// mmdフォルダをイニシャル
	wg.Add(1)
	go func() {
		defer wg.Done()
		modules.InitialData("mmd", "MmdDataObj")
	}()

	// すべてのゴルーチンが完了するのを待つ
	wg.Wait()

	fmt.Printf("\n全プロセス成功しました。\n3秒後本プログラム自動終了。")

	// 3秒間停止
	time.Sleep(3 * time.Second)

	// 0は正常終了を示し、0以外の値はエラーを示します。
	os.Exit(0)
}
