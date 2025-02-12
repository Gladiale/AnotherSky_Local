package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
)

var appConfig = map[string]string{
	"port":    "7139",
	"appName": "another-sky-local v1.0.1",
}

func exportMessage() {
	str_local := fmt.Sprintf("%-14s", "  -  Local:")
	str_network := fmt.Sprintf("%-14s", "  -  Network:")

	fmt.Println("\n> " + appConfig["appName"] + "\n" + ">" + " server on\n")
	fmt.Println(str_local + "http://localhost:" + appConfig["port"] + "/")

	addrs, _ := net.InterfaceAddrs()
	for _, addr := range addrs {
		ipnet, ok := addr.(*net.IPNet) // コンマokイディオム
		if ok {                        // ok が true の場合、型アサーションは成功
			ip := ipnet.IP.String()
			if strings.HasPrefix(ip, "192.168") {
				fmt.Println(str_network + "http://" + ip + ":" + appConfig["port"] + "/")
			}
		}
	}
}

// 参照
// https://docs.gofiber.io/next/middleware/static/#spa-single-page-application
// https://docs.gofiber.io/next/api/fiber#server-listening
func main() {
	app := fiber.New(fiber.Config{
		AppName: appConfig["appName"],
	})

	app.Use("/", static.New("", static.Config{
		FS: os.DirFS("dist"),
	}))

	app.Get("/*", func(c fiber.Ctx) error {
		return c.SendFile("dist/index.html")
	})

	// サーバーを起動
	go func() {
		// 0.0.0.0 でリッスンすることで、外部から接続できるようになります
		err := app.Listen("0.0.0.0:"+appConfig["port"], fiber.ListenConfig{
			DisableStartupMessage: true,
		})

		// エラーが発生した場合にログを表示
		if err != nil {
			log.Fatalln(err)
		}
	}()

	// サーバーが起動した後に表示するメッセージ
	exportMessage()

	// アプリケーションが終了しないように待機する
	select {}

	/*
		// app.Shutdown() アプリケーション側serverを閉じる

		// シグナルを受け取るチャネル
		sigs := make(chan os.Signal, 1)
		signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM) // Ctrl+C または kill シグナルを捕まえる

		// サーバーが終了するまで待機
		sigReceived := <-sigs // シグナルを受け取ったら

		// シグナルを受け取った後にサーバーをシャットダウン
		fmt.Printf("Received %s signal, shutting down...\n", sigReceived)
		if err := app.Shutdown(); err != nil {
			fmt.Println("Server Shutdown Failed:", err)
		}
	*/
}
