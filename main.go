package main

import (
	"log"
	"net/http"

	"golang.org/x/crypto/acme/autocert"

	"github.com/NYTimes/gziphandler"
	"github.com/mgerb/mywebsite/server/controller/api"
	"github.com/mgerb/mywebsite/server/db"
	"github.com/mgerb/mywebsite/server/route"
	"github.com/mgerb/mywebsite/server/utils"
)

func main() {
	configurations := utils.ReadConfig()

	flags := utils.ParseFlags()

	db.Configure(configurations.Database)
	api.Configure(configurations.Api)

	db.Mongo.Connect()

	//register middleware
	handle := gziphandler.GzipHandler(route.Routes())

	if flags.TLS {

		// start server on port 80 to redirect
		go http.ListenAndServe(":80", route.NonTLSRoutes())

		log.Println("Starting TLS server...")

		// start TLS server
		log.Fatal(http.Serve(autocert.NewListener(), handle))

	} else {

		log.Println("Starting basic server...")

		// start basic server
		http.ListenAndServe(configurations.Address, handle)
	}
}
