package main

import (
	//"fmt"
	//"github.com/julienschmidt/httprouter"
	"log"
	"net/http"

	"github.com/mgerb42/mywebsite/route"
)

func main() {

	log.Fatal(http.ListenAndServe(":8080", route.Routes()))

}
