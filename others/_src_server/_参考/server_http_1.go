package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// ハンドラ関数: ルートパス('/') へのアクセス
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// SPAのエントリーポイントとなる index.html を配信
		http.ServeFile(w, r, filepath.Join("dist", "index.html"))
	})

	http.HandleFunc("/folderData.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		http.ServeFile(w, r, filepath.Join("dist", "folderData.json"))
	})

	// 静的ファイル (assets ディレクトリ) を "/assets/" パスで配信
	assetsFS := http.FileServer(http.Dir(filepath.Join("dist", "assets")))
	http.Handle("/assets/", http.StripPrefix("/assets/", assetsFS))

	cgFS := http.FileServer(http.Dir(filepath.Join("dist", "cg")))
	http.Handle("/cg/", http.StripPrefix("/cg/", cgFS))

	characterFS := http.FileServer(http.Dir(filepath.Join("dist", "character")))
	http.Handle("/character/", http.StripPrefix("/character/", characterFS))

	// サーバーを起動
	port := "8080" // ポート番号
	log.Printf("Server listening on port %s", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
		os.Exit(1)
	}
}
