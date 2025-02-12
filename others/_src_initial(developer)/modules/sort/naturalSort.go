package modules

import (
	"regexp"
	"sort"
	"strconv"
)

// 自然sort　今回Zero埋めsortを使ったので、使ってませんでした

// ByNaturalは自然順ソート用のカスタム型
type ByNatural []string

func (a ByNatural) Len() int           { return len(a) }
func (a ByNatural) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByNatural) Less(i, j int) bool { return naturalLess(a[i], a[j]) }

// naturalLessは2つの文字列を自然順で比較します
func naturalLess(s1, s2 string) bool {
	re := regexp.MustCompile(`(\d+|\D+)`)
	parts1 := re.FindAllString(s1, -1)
	parts2 := re.FindAllString(s2, -1)

	for i := 0; i < len(parts1) && i < len(parts2); i++ {
		if isNumeric(parts1[i]) && isNumeric(parts2[i]) {
			num1, _ := strconv.Atoi(parts1[i])
			num2, _ := strconv.Atoi(parts2[i])
			if num1 != num2 {
				return num1 < num2
			}
		}
		if parts1[i] != parts2[i] {
			return parts1[i] < parts2[i]
		}
	}
	return len(parts1) < len(parts2)
}

// isNumericは文字列が数字かどうかを判定します
func isNumeric(s string) bool {
	_, err := strconv.Atoi(s)
	return err == nil
}

func NaturalSort(slice []string) {
	sort.Sort(ByNatural(slice))
}
