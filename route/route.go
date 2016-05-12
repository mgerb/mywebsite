package route

import (
	//"encoding/json"
	//"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"

	"github.com/mgerb42/mywebsite/controller"
)

func Routes() *httprouter.Router {

	r := httprouter.New()

	r.GET("/", controller.IndexGet)

	//set up public folder path
	r.ServeFiles("/public/*filepath", http.Dir("./public"))

	return r
}
