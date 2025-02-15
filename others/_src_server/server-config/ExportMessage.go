package serverConfig

import (
	"fmt"
	"net"
	"strings"
)

func ExportMessage() {
	str_local := fmt.Sprintf("%-14s", "  -  Local:")
	str_network := fmt.Sprintf("%-14s", "  -  Network:")

	fmt.Println("\n> " + AppConfig["appName"] + "\n" + ">" + " server on\n")
	fmt.Println(str_local + "http://localhost:" + AppConfig["port"] + "/")

	addrs, _ := net.InterfaceAddrs()
	for _, addr := range addrs {
		ipnet, ok := addr.(*net.IPNet) // コンマokイディオム
		if ok {                        // ok が true の場合、型アサーションは成功
			ip := ipnet.IP.String()
			if strings.HasPrefix(ip, "192.168") {
				fmt.Println(str_network + "http://" + ip + ":" + AppConfig["port"] + "/")
			}
		}
	}
}
