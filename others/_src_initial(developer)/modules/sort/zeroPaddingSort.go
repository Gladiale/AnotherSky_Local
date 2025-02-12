package modules

import (
	"fmt"
	"regexp"
	"sort"
	"strings"
)

// 自然sortの方法もあります、今回は自然sortではなく、zero埋めを採用しました。
func byZeroPadding(a, b string) int {
	re := regexp.MustCompile(`(\d+)`)
	sa := re.ReplaceAllStringFunc(a, func(m string) string {
		return fmt.Sprintf("%05s", m) // ゼロ埋め
	})
	sb := re.ReplaceAllStringFunc(b, func(m string) string {
		return fmt.Sprintf("%05s", m) // ゼロ埋め
	})

	return strings.Compare(sa, sb) // 比較
}

func SortByZeroPadding(slice []string) {
	sort.SliceStable(slice, func(i, j int) bool {
		return byZeroPadding(slice[i], slice[j]) < 0
	})
}
