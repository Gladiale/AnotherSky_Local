package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"strings"
)

var appConfig = map[string]string{
	"port":    "7739",
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

/*
// cacheControlHandler はキャッシュ制御ヘッダーを追加するハンドラー
func cacheControlHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// キャッシュを無効化するヘッダーを設定
		w.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")

		// 次のハンドラーに処理を委譲
		next.ServeHTTP(w, r)
	})
}

func main() {
	// 静的ファイルを提供するハンドラーを定義
	fs := http.FileServer(http.Dir("./dist"))
	http.Handle("/", cacheControlHandler(fs))

	// サーバーを起動
	exportMessage()

	err := http.ListenAndServe(":"+appConfig["port"], nil)
	if err != nil {
		log.Fatalln(err)
	}
}
*/

func main() {
	// 静的ファイルを返す
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./dist"))))

	// index.html のリクエストに対してキャッシュ制御を追加
	http.HandleFunc("/index.html", func(w http.ResponseWriter, r *http.Request) {
		// キャッシュを無効化
		w.Header().Set("Cache-Control", "no-store")
		http.ServeFile(w, r, "./dist/index.html")
	})

	// サーバーを起動
	exportMessage()

	err := http.ListenAndServe(":"+appConfig["port"], nil)
	if err != nil {
		log.Fatalln(err)
	}
}
