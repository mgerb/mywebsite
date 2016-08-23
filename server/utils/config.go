package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"server/controller/api"
	"server/db"
)

//structure for application configurations
type Config struct {
	Database db.DatabaseInfo `json:"database"`
	Api      api.ApiInfo     `json:"api"`
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

	//m := new(Dispatch)
	//var m interface{}
	var result Config

	err := json.Unmarshal(file, &result)

	if err != nil {
		log.Println(err)
	}

	return result
}
