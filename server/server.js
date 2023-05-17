const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { Configuration, OpenAIApi } = require('openai');
const data = require('./mock-data.json');
const { log } = require('console');

const app = express();
const PORT = process.env.PORT || 8080;
// const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");

app.use(cors());
app.use(express.json());
// app.use(express.static(REACT_BUILD_DIR))



const configuration = new Configuration({
    organization: "org-e9LvttIoF3o21ySUOzFoq4oi",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
    // res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// create the get request for students in the endpoint '/api/students'
app.get('/students', async (req, res) => {
    try {
        const { rows: students } = await db.query('SELECT * FROM students');
        res.send(students);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/user/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const { rows: ready_user } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [email]);
        res.send(ready_user);
        console.log("backend response to a user get request", ready_user);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/tripdetails/:tripid', async (req, res) => {
    try {
        const {tripid} = req.params;
        console.log("trip id from req.params", tripid)
        const { rows: trip_details } = await db.query('SELECT ready_lists.list_id, list_name, ready_trips.trip_id, ready_trips.user_id, trip_name, trip_start_date, trip_end_date, location, trip_description, item_id, item, item_is_done, item_due_date, item_version FROM ready_lists LEFT JOIN ready_trips ON ready_lists.trip_id=ready_trips.trip_id LEFT JOIN ready_items ON ready_lists.list_id=ready_items.list_id WHERE ready_lists.trip_id=$1;', [tripid])
        res.send(trip_details)
        console.log(trip_details)
    } catch (e) {
        return res.status(400).json({ e });
    }
})

app.get('/trips/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const { rows: ready_trip } = await db.query('SELECT * FROM ready_trips WHERE user_id=$1', [userid]);
        res.send(ready_trip);
        console.log("backend response to a user get request", ready_trip);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/openai', async (req, res) => {
    // console.log('testing this thing')
    try {
        // res.send(data)
        // const response = await openai.createCompletion({
        //     "model": "text-davinci-003",
        //     "prompt": "I want you to act as a trip planner. What should I pack for Corolla, North Carolina? Write your response in the form of an array that looks like {\"list\": [sandals, beach towel, sunglasses]}",
        //     "max_tokens": 500,
        //     "temperature": 1
        //     //   "n": 2
        // });
        res.json(data)
        // console.log('testing', data)
        // console.log(JSON.parse(response.data.choices[0].text));
    } catch (e) {
        return res.status(400).json({ e });
    }
    
});



// create the POST request
app.post('/adduser', async (req, res) => {
    try {
        const { email, family_name, given_name, nickname } = req.body;
        console.log("request body", req.body);
        const result = await db.query(
            'INSERT INTO ready_users(user_email, user_last_name, user_first_name, user_auth0_nickname) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *',
            [email, family_name, given_name, nickname],
        );
        console.log(result.rows[0]);
        // res.json(result.rows[0] ?? {});

        const { rows: ready_user } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [email]);
        res.send(ready_user);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// create the POST request to add a new trip to 
app.post('/addtrip', async (req, res) => {
    try {
        const {trip_name, trip_start_date, trip_end_date, location, user_id, trip_description } = req.body;
        console.log("request body", req.body);
        const result = await db.query(
            'INSERT INTO ready_trips(trip_name, trip_start_date, trip_end_date, location, user_id, trip_description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [trip_name, trip_start_date, trip_end_date, location, user_id, trip_description],
        );
        console.log(result.rows[0]);
        // res.json(result.rows[0] ?? {});
        const preTodoList = await db.query('INSERT INTO ready_lists(list_name, trip_id, user_id) VALUES($1, $2, $3)', ['Pre-Trip To-Do List', result.rows[0].trip_id, user_id])
        const postTodoList = await db.query('INSERT INTO ready_lists(list_name, trip_id, user_id) VALUES($1, $2, $3)', ['Post-Trip To-Do List', result.rows[0].trip_id, user_id])

        console.log(preTodoList.rows, postTodoList.rows)
        const { rows: ready_trip } = await db.query('SELECT * FROM ready_trips WHERE user_id=$1', [user_id]);
        res.send(ready_trip);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for students
app.delete('/api/students/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        await db.query('DELETE FROM students WHERE id=$1', [studentId]);
        console.log("From the delete request-url", studentId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update a student 
app.put('/updateitemdone/:item_id', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const {item_id} = req.params
    let {item_is_done} = req.body

    console.log("item id", item_id, "item is done from req", item_is_done);


    try {
        
      const updated = await db.query('UPDATE ready_items SET item_is_done=$1 WHERE item_id=$2;', [item_is_done, item_id]);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

//    for Proxy
//   app.get('/*', (req, res) => {
//     console.log("/* is executing")
//     res.sendFile(path.join(REACT_BUILD_DIR, 
//         'index.html'))
// });
 
// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});