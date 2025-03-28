package main

import (
	"log"
	"os"
	serverAction "server/server-action"
	serverConfig "server/server-config"

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

	// GetをUse(static)の前に書くに注意、後ろに書くとGetの中身が実行されなくなるのを発見
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

	app.Post("/api/filter", serverAction.HandleFilterPost)
	app.Put("/api/filter/:index", serverAction.HandleFilterUpdate)
	app.Delete("/api/filter/:index", serverAction.HandleFilterDelete)

	app.Use("/", static.New("", static.Config{
		FS:         os.DirFS("dist"),
		IndexNames: []string{"index.html"},
		// 多分CacheDurationは少し長めに設置しても大丈夫
		CacheDuration: -1,
		MaxAge:        0,
	}))

	// サーバーが起動時表示のメッセージ
	serverConfig.ExportMessage()

	// サーバーを起動 0.0.0.0 でリッスンすることで、外部から接続できるようになります
	log.Fatal(app.Listen("0.0.0.0:"+serverConfig.AppConfig["port"], fiber.ListenConfig{
		DisableStartupMessage: true,
	}))
}
