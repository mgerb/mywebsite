package api

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

type ApiCall struct {
	Fname string
	Lname string
}

// Redirect to discord
func TestApiCall(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	s := new(ApiCall)

	s.Fname = ps.ByName("fname")
	s.Lname = ps.ByName("lname")

	response, _ := json.MarshalIndent(s, "", "   ")

	w.Header().Set("Content-Type", "application/json")

	fmt.Fprint(w, string(response))

}
