package raw_sensor

import (
	"encoding/json"
	"errors"
	"gopkg.in/mgo.v2/bson"
	"log"
	"time"

	"server/db"
)

const (
	collection = "raw_sensor"
)

type Data struct {
	ID          bson.ObjectId `bson:"_id,omitempty"`
	Temperature float64       `json:"temperature" bson:"temperature"`
	Location    string        `json:"location" bson:"location"`
	Updated     time.Time     `json:"updated" bson:"updated"`
}

//convert struct to json string
func (s *Data) toJson() string {

	b, err := json.MarshalIndent(s, "", "    ")

	if err != nil {
		log.Println(err.Error)
	}

	return string(b)

}

func (s *Data) StoreData() error {

	if db.Mongo.Connected() {

		log.Println("Inserting data into " + collection)

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		// Insert Datas
		err := c.Insert(s)

		if err != nil {
			return err
		}
	}

	return nil
}

//handle queries for all sensors page
//********************************************************************************
type DataStore_AllSensors struct {
	ID          string    `json:"location" bson:"_id"`
	Temperature float64   `json:"temperature" bson:"temperature"`
	Updated     time.Time `json:"updated" bson:"updated"`
}

func GetAllSensors() ([]DataStore_AllSensors, error) {

	s := []DataStore_AllSensors{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$group": bson.M{"_id": "$location", "temperature": bson.M{"$last": "$temperature"},
			"updated": bson.M{"$last": "$updated"}}},
			bson.M{"$sort": bson.M{"_id": 1}}}).All(&s)

		if err != nil {
			return s, nil
		}

		return s, nil

	} else {
		return s, errors.New("Query failed")
	}
}

//********************************************************************************

//get sensor information by location
//********************************************************************************
type DataStore_SensorByLocation struct {
	Id sensorByLocation `json:"_id" bson:"_id"`
}

type sensorByLocation struct {
	Year     int    `json:"year" bson:"year"`
	Month    int    `json:"month" bson:"month"`
	Location string `json:"location" bson:"location"`
}

/*
func GetSensorInfoByLocation(sensor_location string) ([]DataStore_SensorByLocation, error) {
	s := []DataStore_SensorByLocation{}
	if db.Mongo.Connected() == true {
		session := db.Mongo.Session.Copy()
		defer session.Close()
		c := session.DB(db.Mongo.Info.Database).C(collection)
		err := c.Pipe([]bson.M{{"$project": bson.M{"location": "$location", "year": bson.M{"$year": "$updated"}, "month": bson.M{"$month": "$updated"}}},
			bson.M{"$match": bson.M{"location": sensor_location}},
			bson.M{"$group": bson.M{"_id": bson.M{"year": "$year", "month": "$month", "location": "$location"}}},
			bson.M{"$sort": bson.M{"_id.year": -1, "_id.month": -1}}}).All(&s)
		if err != nil {
			log.Println(err)
			return s, nil
		}
		return s, nil
	} else {
		return s, errors.New("Query failed")
	}
}
*/

//********************************************************************************

/*************************
testStore := model.SensorData{
		ID:          bson.NewObjectId(),
		Temperature: 34.2,
		Humidity:    33.22,
		Location:    "Grand Meadow",
		Updated:     time.Now(),
}
**************************/
