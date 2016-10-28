package main

import (
	"log"
	"net/http"
	"strconv"
	"github.com/NYTimes/gziphandler"
	
	"mywebsite/server/controller/api"
	"mywebsite/server/db"
	"mywebsite/server/route"
	"mywebsite/server/utils"
)

func main(){
	configurations := utils.ReadConfig()

	db.Configure(configurations.Database)
	api.Configure(configurations.Api)

	db.Mongo.Connect()
	
	//register middleware
	handle := gziphandler.GzipHandler(route.Routes())
	
	log.Println("Starting Server...")
	go func(){
		log.Println(http.ListenAndServe(":"+strconv.Itoa(configurations.Port), handle))
	}()
	
	if configurations.TLSCertFile != "" && configurations.TLSKeyFile != "" {
		log.Println(http.ListenAndServeTLS(":"+strconv.Itoa(configurations.TLSPort), configurations.TLSCertFile, configurations.TLSKeyFile, handle))
	}
}
