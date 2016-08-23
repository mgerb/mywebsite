package db

import (
	"gopkg.in/mgo.v2"
	"log"
	"time"
)

var Mongo Driver

type Driver struct {
	Session *mgo.Session
	Info    DatabaseInfo
}

type DatabaseInfo struct {
	URL      string `json:"url"`
	Database string `json:"database"`
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

func Configure(d DatabaseInfo) {
	Mongo.Info = d
}

func (d *Driver) Connect() {
	if (d.Info.URL != ""){
		// Connect to MongoDB
		s, err := mgo.DialWithTimeout(d.Info.URL, 5*time.Second)
	
		if err != nil {
			log.Println("MongoDB Driver Error", err)
			return
		}
	
		d.Session = s
	
		// Prevents these errors: read tcp 127.0.0.1:27017: i/o timeout
		d.Session.SetSocketTimeout(10 * time.Second)
	
		// Check if is alive
		if err = d.Session.Ping(); err != nil {
			log.Println("Database Error", err)
		}
	
		log.Println("Connected to database")
	} else {
		log.Println("Database not configured")
	}
}

func (d *Driver) Connected() bool {
	if d.Session != nil {
		return true
	}
	return false
}
