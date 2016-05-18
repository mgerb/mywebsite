package api

import ()

var Api ApiInfo

type ApiInfo struct {
	Key string `json:"key"`
}

func Configure(a ApiInfo) {
	Api = a
}
