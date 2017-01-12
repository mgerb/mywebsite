package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"../controller/api"
	"../db"
)

//structure for application configurations
type Config struct {
	Database    db.DatabaseInfo `json:"Database"`
	Api         api.ApiInfo     `json:"Api"`
	Port        int             `json:"Port"`
	TLSPort     int             `json:"TLSPort"`
	TLSCertFile string          `json:"TLSCertFile"`
	TLSKeyFile  string          `json:"TLSKeyFile"`
}

//read the config file and return JsonObject struct
func ReadConfig() Config {

	log.Println("Reading config file...")

	file, e := ioutil.ReadFile("./config.json")

	if e != nil {
		log.Printf("File error: %v\n", e)
		os.Exit(1)
	}

	log.Printf("%s\n", string(file))

	var result Config

	err := json.Unmarshal(file, &result)

	if err != nil {
		log.Println(err)
	}

	return result
}
