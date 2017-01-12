package route

import (
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"

	"../controller"
	"../controller/api"
)

func Routes() *httprouter.Router {

	log.Println("Server Started")

	r := httprouter.New()

	r.GET("/api/storedata", api.HandleSensorRequest)
	r.GET("/api/allsensors", api.HandleAllSensors)
	r.GET("/api/sensor/:location", api.HandleSensorByLocation)
	r.GET("/api/sensor/:location/:year", api.HandleSensorByLocationYear)
	r.GET("/api/sensor/:location/:year/:monthname", api.HandleSensorByLocationMonth)
	r.GET("/api/uniquedates/:location", api.HandleUniqueDates)

	r.GET("/discord", controller.DiscordRedirect)
	r.GET("/vpn", controller.VPNRedirect)
	r.GET("/camera", controller.CameraRedirect)

	//set up public folder path
	r.ServeFiles("/public/*filepath", http.Dir("./public/"))

	//route every invalid request to template file
	//routing is all handled on the client side with angular
	r.NotFound = http.HandlerFunc(fileHandler("./public/index.html"))

	return r
}

//route requests to static files
func routerFileHandler(path string) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {

		http.ServeFile(w, r, path)

	}
}

//function to serve files with standard net/http library
func fileHandler(path string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		http.ServeFile(w, r, path)

	}
}
