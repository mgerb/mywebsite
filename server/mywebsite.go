package main

import (
	"github.com/NYTimes/gziphandler"
	"log"
	"net/http"
	"strconv"

	"mywebsite/server/controller/api"
	"mywebsite/server/db"
	"mywebsite/server/route"
	"mywebsite/server/utils"
)

func main() {
	configurations := utils.ReadConfig()

	db.Configure(configurations.Database)
	api.Configure(configurations.Api)

	db.Mongo.Connect()

	//register middleware
	handle := gziphandler.GzipHandler(route.Routes())

	log.Println("Starting Server...")
	log.Println(http.ListenAndServe(":"+strconv.Itoa(configurations.Port), handle))

	/*  enable for TLS support
	go func(){
		log.Println(http.ListenAndServe(":"+strconv.Itoa(configurations.Port), handle))
	}()

	if configurations.TLSCertFile != "" && configurations.TLSKeyFile != "" {
		log.Println(http.ListenAndServeTLS(":"+strconv.Itoa(configurations.TLSPort), configurations.TLSCertFile, configurations.TLSKeyFile, handle))
	}
	*/
}
