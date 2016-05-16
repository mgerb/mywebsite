package main

import (
	"fmt"
	//"github.com/julienschmidt/httprouter"
	"log"
	"net/http"

	"github.com/mgerb42/mywebsite/model"
	"github.com/mgerb42/mywebsite/route"
)

func main() {

	s := model.NewSession()

	s.TestStore("Mit", "G")

	var p []model.Person

	p = s.SearchName("Mit")

	fmt.Println("Query: ")
	fmt.Println(p[0].LastName)

	log.Fatal(http.ListenAndServe(":8080", route.Routes()))
}
