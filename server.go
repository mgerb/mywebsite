package main

import (
	"net/http"

	"mywebsite/server/controller/api"
	"mywebsite/server/db"
	"mywebsite/server/route"
	"mywebsite/server/utils"
)

func init() {
	configurations := utils.ReadConfig()

	db.Configure(configurations.Database)
	api.Configure(configurations.Api)

	db.Mongo.Connect()

	router := route.Routes()

	http.Handle("/", router)
}
