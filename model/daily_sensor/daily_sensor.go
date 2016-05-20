package daily_sensor

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/mgerb42/mywebsite/db"
	"gopkg.in/mgo.v2/bson"
	"log"
	"time"
)

const (
	collection = "daily_sensor"
)

type Data struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	MaxTemp   float64       `json:"maxtemp" bson:"maxtemp"`
	MinTemp   float64       `json:"mintemp" bson:"mintemp"`
	Location  string        `json:"location" bson:"location"`
	Month     int           `json:"month" bson:"month"`
	MonthName string        `json:"monthname" bson:"monthname"`
	Day       int           `json:"day" bson:"day"`
	Year      int           `json:"year" bson:"year"`
}

//convert struct to json string
func (s *Data) toJson() string {

	b, err := json.MarshalIndent(s, "", "    ")

	if err != nil {
		fmt.Println(err.Error)
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

func (s *Data) UpdateData() error {

	if db.Mongo.Connected() {

		log.Println("Updating data")

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		colQuerier := bson.M{"location": s.Location, "month": s.Month, "monthname": s.MonthName, "day": s.Day, "year": s.Year}
		change := bson.M{"$set": bson.M{"maxtemp": s.MaxTemp, "mintemp": s.MinTemp}}

		err := c.Update(colQuerier, change)

		if err != nil {
			return err
		}
	}

	return nil

}

func GetDailySensorInfo(sensor_location string) (Data, error) {

	d := Data{}
	t := time.Now()

	day := t.Day()
	month := int(t.Month())
	monthname := t.Month().String()
	year := t.Year()

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Find(bson.M{"location": sensor_location, "day": day, "month": month, "monthname": monthname, "year": year}).One(&d)

		if err != nil {
			fmt.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}

}

func GetAllSensorInfo(sensor_location string) ([]Data, error) {
	d := []Data{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		//err := c.Find(bson.M{"location": sensor_location}).Sort("-year, -month").All(&d)
		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			fmt.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}

func GetAllSensorInfoByYear(sensor_location string, year int) ([]Data, error) {
	d := []Data{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location, "year": year}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			fmt.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}

func GetAllSensorInfoByMonth(sensor_location string, year int, monthname string) ([]Data, error) {
	d := []Data{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location, "year": year, "monthname": monthname}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			fmt.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}
