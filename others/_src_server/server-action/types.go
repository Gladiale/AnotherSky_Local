package serverAction

type FilterData struct {
	Opacity    int `json:"opacity"`
	Brightness int `json:"brightness"`
	Contrast   int `json:"contrast"`
	Grayscale  int `json:"grayscale"`
	HueRotate  int `json:"hueRotate"`
	Invert     int `json:"invert"`
	Saturate   int `json:"saturate"`
	Sepia      int `json:"sepia"`
}
