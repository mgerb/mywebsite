package daily_sensor

import (
	"encoding/json"
	"errors"
	"gopkg.in/mgo.v2/bson"
	"log"
	"time"

	"mywebsite/server/db"
)

const (
	collection = "daily_sensor"
)

type Data struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	MaxTemp   float64       `json:"maxtemp,omitempty" bson:"maxtemp"`
	MinTemp   float64       `json:"mintemp,omitempty" bson:"mintemp"`
	Location  string        `json:"location,omitempty" bson:"location"`
	Month     int           `json:"month,omitempty" bson:"month"`
	MonthName string        `json:"monthname,omitempty" bson:"monthname"`
	Day       int           `json:"day,omitempty" bson:"day"`
	Year      int           `json:"year,omitempty" bson:"year"`
	Updated	  time.Time		`json:"updated,omitempty" bson:"updated"`
}

//convert struct to json string
func (s *Data) ToJson() string {

	b, err := json.MarshalIndent(s, "", "    ")

	if err != nil {
		log.Println(err)
		return "{message : \"Error loading data from database\""
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

//function to update the daily temperature max or min for a location
func (s *Data) UpdateData() error {

	if db.Mongo.Connected() {

		log.Println("Updating data")

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		colQuerier := bson.M{"location": s.Location, "month": s.Month, "monthname": s.MonthName, "day": s.Day, "year": s.Year}
		change := bson.M{"$set": bson.M{"maxtemp": s.MaxTemp, "mintemp": s.MinTemp, "updated": time.Now()}}

		err := c.Update(colQuerier, change)

		if err != nil {
			return err
		}
	}

	return nil

}

//get the current daily sensor reading to compare
//if the max or min temp needs to be updated
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
			log.Println(err)
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

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			log.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}

//return all daily temperature readings per year for a location
//sort by most recent year and oldest month
func GetAllSensorInfoByYear(sensor_location string, year int) ([]Data, error) {
	d := []Data{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location, "year": year}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			log.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}

//return all temperature readings for a specific month and location
func GetAllSensorInfoByMonth(sensor_location string, year int, monthname string) ([]Data, error) {
	d := []Data{}

	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location, "year": year, "monthname": monthname}},
			{"$sort": bson.M{"year": -1, "month": 1}}}).All(&d)

		if err != nil {
			log.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}

type UniqueDates struct{
	Dates	  []Data	    `json:"dates" bson:"dates"`
}

func GetUniqueSensorDates(sensor_location string) ([]Data, error){
	d := []Data{}
	temp := UniqueDates{};
	
	if db.Mongo.Connected() == true {

		session := db.Mongo.Session.Copy()
		defer session.Close()

		c := session.DB(db.Mongo.Info.Database).C(collection)

		err := c.Pipe([]bson.M{{"$match": bson.M{"location": sensor_location}},
								{"$group": bson.M{"_id": "null", "dates": bson.M{"$addToSet": bson.M{"month": "$month", "monthname": "$monthname", "year": "$year"}}}},
		}).One(&temp)
		
		d = temp.Dates;
		
		if err != nil {
			log.Println(err)
			return d, nil
		}

		return d, nil

	} else {
		return d, errors.New("Query failed")
	}
}
