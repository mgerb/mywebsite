package controller

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

// Redirect to discord
func DiscordRedirect(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	http.Redirect(w, r, "https://discordapp.com/invite/0Z2tzxKECEj2BHwj", 301)
}

// Redirect to discord
func VPNRedirect(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	http.Redirect(w, r, "https://mitchel.io:943", 301)
}

// Redirect to security cameras
func CameraRedirect(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	http.Redirect(w, r, "http://24.118.44.161:8080/html/", 301)
}
