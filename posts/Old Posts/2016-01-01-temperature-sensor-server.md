# Temperature Sensor - Server Side

The server side coding is a bit more complicated than programming the ESP8266 itself. I use a NoSQL database to store the information and some of the queries are complex and can be confusing to understand. I also make use of REST API's to send the data to the client side.

* * *

## Storing Information

For this project I am using MongoDB to store all of my information because it goes well with my server, which is coded in Node.js, but any database could be used. I also wanted to learn about NoSQL databases because I already have experience with SQL databases. Information on coding the ESP8266 can be found [here](/?post=12-18-2015.html) in a previous post.

`mitchellg.me/temperature?temperature=0&humidity=0&location=0&key=0`

Above is the GET request that is sent to the server from the ESP8266\. Data is transferred through GET parameters. The key is an authentication code that I set to prevent unwanted HTTP requests. This is similar to an API key. Below is the code implemented to handle the HTTP request from the ESP8266.

## Creating the REST API

There are many ways that I could display the temperature information on a graph, but I was trying to come up with a quick and easy way that was also efficient. I also wanted reusability in case I wanted to add or change things down the road. I decided I was going to use [Chart.js](http://www.chartjs.org/) because it is open source and free. These graphs are implemented on the front end using javascript. Because of this I needed to figure out a way to send the sensor data to the client side. I felt that the best way for me to do it would be creating a REST API. I plan on making another post in the future explaining all of my client side code along with how to use Chart.js.

Now that I know how I want to display my information I just need to think of what information I want to display. I thought it would be cool to display a few different graphs. As of right now I have one graph that displays data by the year and one that displays by each month. The maximum and minimum temperature of each day are displayed as well as the average humidity for that day. The user can also select which year or which month to display and the graph will adjust accordingly.

Now that I know what information I need I can start developing my REST API. I have a MongoDB collection called "temperature", which stores temperature, humidity, location, and time updated. Updated is a type of Date, which I will use in all of the queries to group by each day. To do the grouping in MongoDB I needed to use the [aggregation functionality](https://docs.mongodb.org/v3.0/aggregation/) of MongoDB. Aggregation allows me to essentially perform queries on top of queries using the MongoDB "pipeline". This is similar to an SQL query when a selection is performed within a selection.

## Explanation of MongoDB Queries

The first function takes in a location and year and returns maximum and minimum temperature readings as well as average humidity for each day in the selected year. The results are also returned sorted from newest to oldest.

In the first part of the aggregation pipeline, which is $project, I am just selecting the temperature, humidity, year, month, and day. This part is important because it allows me to pull the year, month, and day from the date that is stored in the database. This way I do not have to store each of these entries separately in the database.

This data is then passed to the next part of the aggregation pipeline. The $match pipeline stage selects out information from the collection which match with the selected year and location.

The $group aggregation operator is the stage in which I actually group the data by the location, year, month, and day. For each group I also take the max and min temperatures along with the average humidity by using the correct accumulator operators. Now that I have the appropriate information I need, I just use the $sort pipeline operator to sort the data based on time updated.

The function to display by month is the exact same, except I take in the month attribute and add it to the $match operator within the aggregation pipeline. Just like that the query is complete and all I need to do is send the response back to the client. Chart.js uses JSON format, which makes things extremely easy because MongoDB query results are in JSON. I set the content type to JSON, and use JSON.stringify() to convert the JSON to a readable format for debugging purposes. An example API request can be tested out here.

[/api/sensorbylocation/year?location=Winona%20Apartment&year=2016](/api/sensorbylocation/year?location=Winona%20Apartment&year=2016)
