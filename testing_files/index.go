package controller

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

type Person struct {
	Location City
	Name     string
	Age      int
	Car      []Car
}

type City struct {
	Coords     Coordinate
	Population int
}

type Coordinate struct {
	Latitude  int
	Longitude int
}

type Car struct {
	Make string
	Year int
}

// IndexGET displays the home page
func IndexGet(w http.ResponseWriter, r *http.Request, p httprouter.Params) {

	params := p.ByName("test")
	fmt.Println(params)

	w.Header().Set("Content-Type", "application/json")

	js := Person{
		Location: City{
			Coords: Coordinate{
				Latitude:  23,
				Longitude: 32,
			},
			Population: 5000,
		},
		Name: "Mitchell",
		Age:  22,
		Car: []Car{
			Car{
				Make: "Mitz",
				Year: 2003,
			},
			Car{
				Make: "Honda",
				Year: 2016,
			},
		},
	}

	b, err := json.MarshalIndent(js, "", "    ")

	if err != nil {
		fmt.Println(err.Error)
	}

	s := string(b)

	fmt.Fprint(w, s)

}

func Api(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	param := p.ByName("name")
	fmt.Fprint(w, param)
}
