package model

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

const (
	DB_URL = "localhost"
)

type DataStore struct {
	session *mgo.Session
}

func NewSession() *DataStore {

	d := new(DataStore)
	s, err := mgo.Dial(DB_URL)

	if err != nil {
		panic(err)
	}

	d.session = s

	return d
}

func (ds *DataStore) TestStore(fname string, lname string) {
	session := ds.session.Copy()
	defer session.Close()

	// Collection People
	c := session.DB("test").C("people")

	// Insert Datas
	c.Insert(&Person{FirstName: fname, LastName: lname, Timestamp: time.Now()})

}

func (ds *DataStore) SearchName(fname string) []Person {

	session := ds.session.Copy()
	defer session.Close()

	// Collection People
	c := session.DB("test").C("people")

	var results []Person

	err := c.Find(bson.M{"firstname": fname}).All(&results)

	if err != nil {
		panic(err)
	}

	return results
}

/*func (ds *DataStore) ucol() *mgo.Collection {
	session = ds.session.Copy()
	defer session.Close()
}
*/

//func (ds *DataStore) UserExist(user string) bool { ... }
