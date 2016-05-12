package controller

import (
	//"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"net/http"
)

// IndexGET displays the home page
func NotFound404(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	http.Redirect(w, r, "/404.html", 404)

	fmt.Fprint(w, "test")
}
