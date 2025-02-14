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
	"port":    "7395",
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
// https://docs.gofiber.io/next/middleware/cache
func main() {
	app := fiber.New(fiber.Config{
		AppName: appConfig["appName"],
	})

	// GetのrootとUseのrootを被せないように注意、Getの中身が実行されなくなるのを発見
	app.Get("/", func(c fiber.Ctx) error {
		// index.htmlをno-storeにする
		c.Set("Cache-Control", "no-store")
		return c.SendFile("dist/index.html")
	})

	app.Get("/folderData.json", func(c fiber.Ctx) error {
		c.Set("Cache-Control", "no-store")
		return c.SendFile("dist/folderData.json")
	})

	app.Get("/filterData.json", func(c fiber.Ctx) error {
		c.Set("Cache-Control", "no-store")
		return c.SendFile("dist/filterData.json")
	})

	// staticにrootを設置されるとキャッシュの更新ができなくなる、原因は不明
	app.Use(static.New("", static.Config{
		FS:            os.DirFS("dist"),
		IndexNames:    []string{"index.html"},
		CacheDuration: -1,
		MaxAge:        0,
	}))

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
}
