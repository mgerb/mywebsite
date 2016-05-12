package controller

import (
	//"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

// IndexGET displays the home page
func IndexGet(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")
	response := "{\"test\" : 123}"

	fmt.Fprint(w, response)

}
