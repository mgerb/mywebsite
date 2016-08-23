package api

import (
	"encoding/json"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
	"strconv"
	"time"

	"server/model/daily_sensor"
	"server/model/raw_sensor"
)

// handle http request from sensors
func HandleSensorRequest(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	//store data from sensor in raw_sensor collection
	//**********************************************************************************
	key := r.URL.Query().Get("key")
	w.Header().Set("Content-Type", "application/json")

	var message string

	if key == Api.Key {

		//get request parameters - convert temp to float64
		temperature, _ := strconv.ParseFloat(r.URL.Query().Get("temperature"), 64)
		location := r.URL.Query().Get("location")
		t := time.Now()

		store := raw_sensor.Data{"", temperature, location, t}

		err := store.StoreData()

		if err != nil {
			message = "Failed to insert into database"
		} else {
			message = "Data inserted into database"
		}

		//compare current readings with dialy_sensor readings
		//update daily_sensor readings if out of bounds
		//**********************************************************************************

		storedData, err := daily_sensor.GetDailySensorInfo(location)

		if err != nil {
			log.Println(err)
		}

		//store data if nothing exists for the day
		if storedData.Location == "" {

			storedData.ID = ""
			storedData.Location = location
			storedData.MaxTemp = temperature
			storedData.MinTemp = temperature
			storedData.Day = t.Day()
			storedData.Month = int(t.Month())
			storedData.MonthName = t.Month().String()
			storedData.Year = t.Year()

			err := storedData.StoreData()

			if err != nil {
				log.Println(err)
			}

		} else {

			performUpdate := false

			//check if values exceed max or min
			if temperature > storedData.MaxTemp {
				storedData.MaxTemp = temperature
				performUpdate = true
			}
			if temperature < storedData.MinTemp {
				storedData.MinTemp = temperature
				performUpdate = true
			}

			//store or update information if values have been changed
			if performUpdate == true {

				err := storedData.UpdateData()

				if err != nil {
					log.Println(err)
				}

			}
		}
	} else {
		message = "Incorrect api key"
	}

	//send response back
	fmt.Fprint(w, "{ message : \""+message+"\"}")
}

func HandleAllSensors(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	w.Header().Set("Content-Type", "application/json")

	s, err := raw_sensor.GetAllSensors()

	var response string

	if err != nil {
		log.Println(err)
		response = "{message : \"Error loading data from database\""
	} else {
		js, err := json.MarshalIndent(s, "", "    ")

		if err != nil {
			log.Println(err)
			response = "{message : \"Error loading data from database\""
		} else {
			response = string(js)
		}
	}

	fmt.Fprint(w, response)
}

func HandleSensorByLocation(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	location := ps.ByName("location")

	w.Header().Set("Content-Type", "application/json")

	s, err := daily_sensor.GetAllSensorInfo(location)

	var response string

	if err != nil {
		log.Println(err)
		response = "{message : \"Error loading data from database\""
	} else {
		js, err := json.MarshalIndent(s, "", "    ")

		if err != nil {
			log.Println(err)
			response = "{message : \"Error loading data from database\""
		} else {
			response = string(js)
		}
	}

	fmt.Fprint(w, response)
}

func HandleSensorByLocationYear(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	location := ps.ByName("location")
	year, _ := strconv.Atoi(ps.ByName("year"))

	w.Header().Set("Content-Type", "application/json")

	s, err := daily_sensor.GetAllSensorInfoByYear(location, year)

	var response string

	if err != nil {
		log.Println(err)
		response = "{message : \"Error loading data from database\""
	} else {
		js, err := json.MarshalIndent(s, "", "    ")

		if err != nil {
			log.Println(err)
			response = "{message : \"Error loading data from database\""
		} else {
			response = string(js)
		}
	}

	fmt.Fprint(w, response)
}

func HandleSensorByLocationMonth(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	location := ps.ByName("location")
	year, _ := strconv.Atoi(ps.ByName("year"))
	monthname := ps.ByName("monthname")

	w.Header().Set("Content-Type", "application/json")

	s, err := daily_sensor.GetAllSensorInfoByMonth(location, year, monthname)

	var response string

	if err != nil {
		log.Println(err)
		response = "{message : \"Error loading data from database\""
	} else {
		js, err := json.MarshalIndent(s, "", "    ")

		if err != nil {
			log.Println(err)
			response = "{message : \"Error loading data from database\""
		} else {
			response = string(js)
		}
	}

	fmt.Fprint(w, response)
}
