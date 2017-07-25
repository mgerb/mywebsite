package utils

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"log"
	"os"

	"github.com/mgerb/mywebsite/server/controller/api"
	"github.com/mgerb/mywebsite/server/db"
)

//structure for application configurations
type Config struct {
	Database db.DatabaseInfo `json:"Database"`
	Api      api.ApiInfo     `json:"Api"`
	Address  string          `json:"Address"`
}

type Flags struct {
	TLS bool
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

func ParseFlags() Flags {

	flags := Flags{
		TLS: false,
	}

	tls := flag.Bool("tls", false, "Use TLS")

	flag.Parse()

	flags.TLS = *tls

	return flags
}
