package main

import (
	"log"
	"os"
	serverAction "server/server-action"
	serverConfig "server/server-config"
	"slices"
	"strings"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/static"
)

/*
参照
https://docs.gofiber.io/next/middleware/static/#spa-single-page-application
https://docs.gofiber.io/next/api/fiber#server-listening
https://docs.gofiber.io/next/middleware/cache
https://docs.gofiber.io/next/guide/grouping
*/
func main() {
	app := fiber.New(fiber.Config{
		AppName: serverConfig.AppConfig["appName"],
	})

	// CORSミドルウェアの設定 (https://docs.gofiber.io/next/middleware/cors)
	app.Use(cors.New())

	// ここのUseはUse(static)の前に書くに注意、後ろに書くと今のの中身が実行されなくなる
	app.Use("/", func(c fiber.Ctx) error {
		// SPA (指定のファイルをno-storeにする。試した結果、Response Headersのno-storeの設定はミドルウェアしか行うことができない)
		targets := []string{"/", "/favicon.png", "/folderData.json", "/filterData.json"}
		if slices.Contains(targets, c.Path()) || strings.Contains(c.Path(), "/assets") {
			c.Set("Cache-Control", "no-store")
		}
		return c.Next()
	})

	app.Use("/", static.New("", static.Config{
		FS:         os.DirFS("dist"),
		IndexNames: []string{"index.html"},
		// 多分CacheDurationは少し長めに設置しても大丈夫
		CacheDuration: -1,
		MaxAge:        0,
	}))

	// API
	filterApi := app.Group("/api/filter")
	filterApi.Post("/", serverAction.HandleFilterPost)
	filterApi.Put("/:index", serverAction.HandleFilterUpdate)
	filterApi.Delete("/:index", serverAction.HandleFilterDelete)

	// サーバーが起動時表示のメッセージ
	serverConfig.ExportMessage()

	// サーバーを起動 0.0.0.0 でリッスンすることで、外部から接続できるようになります
	log.Fatal(app.Listen("0.0.0.0:"+serverConfig.AppConfig["port"], fiber.ListenConfig{
		DisableStartupMessage: true,
	}))
}
