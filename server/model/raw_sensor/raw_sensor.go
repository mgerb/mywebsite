package raw_sensor

import (
	"encoding/json"
	"errors"
	"gopkg.in/mgo.v2/bson"
	"log"
	"time"

	"mywebsite/server/db"
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

//default store structure
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
type DataStore_AllSensors struct {
	ID          string    `json:"location" bson:"_id"`
	Temperature float64   `json:"temperature" bson:"temperature"`
	Updated     time.Time `json:"updated" bson:"updated"`
}

//get latest update from each unique sensor
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