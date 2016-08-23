package main

import (
	"net/http"
	
	//local import paths relative to app.yaml file
	"server/controller/api"
	"server/db"
	"server/route"
	"server/utils"
)

func init() {
	configurations := utils.ReadConfig()

	db.Configure(configurations.Database)
	api.Configure(configurations.Api)

	db.Mongo.Connect()

	router := route.Routes()

	http.Handle("/", router)
}
