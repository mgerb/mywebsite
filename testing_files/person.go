package test

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Person struct {
	ID        bson.ObjectId `bson:"_id,omitempty"`
	LastName  string
	FirstName string
	Timestamp time.Time
}
