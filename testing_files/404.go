package test

import (
	"net/http"
)

// IndexGET displays the home page
func PageNotFound(w http.ResponseWriter, r *http.Request) {

	http.ServeFile(w, r, "./public/404.html")

}
