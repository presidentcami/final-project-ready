const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { Configuration, OpenAIApi } = require('openai');
const data = require('./mock-data.json');
const { log, error } = require('console');

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


app.get('/user/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const { rows: ready_user } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [email]);
        res.send(ready_user);
        console.log("details for ready app user", ready_user);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/tripdetails/:tripid', async (req, res) => {
    try {
        const {tripid} = req.params;
        console.log("trip id from req.params", tripid)
        const { rows: trip_details } = await db.query('SELECT * FROM ready_trips WHERE trip_id=$1;', [tripid])
        res.send(trip_details)
        console.log('all trip details', trip_details)
    } catch (e) {
        return res.status(400).json({ e });
    }
})

app.get('/triptodos/:tripid', async (req, res) => {
    try {
        const { tripid } = req.params;
        console.log("trip id from req.params", tripid)
        const { rows } = await db.query('select ready_lists.list_id, list_name, trip_id, user_id, is_template, list_created, item_id, item, item_is_done, item_due_date, item_version from ready_lists left join ready_items on ready_lists.list_id=ready_items.list_id where trip_id=$1;', [tripid])

        let lists = {}
        for (let i = 0; i < rows.length; i++) {
            let list_name = rows[i].list_name;

            if (!lists[list_name]) {
                lists[list_name] = [rows[i]]
            } else {
                lists[list_name].push(rows[i])
            }
        }
        res.send(lists)
        console.log('all trip todo lists', lists)
    } catch (e) {
        return res.status(400).json({ e });
    }
})

app.get('/trips/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const { rows: ready_trip } = await db.query('SELECT * FROM ready_trips WHERE user_id=$1', [userid]);
        res.send(ready_trip);
        console.log("all trips for a specific user", ready_trip);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/api/openai/:prompt', async (req, res) => {
    // console.log('testing this thing')
    console.log(req.params.prompt)
    try {
        // const { location, description, activities } = req.body;
        const prompt = req.params.prompt
        // res.send(data)
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            // "prompt": `I want you to act as a trip planner. I am going to ${location}. Here is a description of my trip: ${description} . Here are some activities I may do ${activities}. What should I pack for this trip? Write your response in the form of an array that looks like {'list': ['sandals', 'beach towel', 'sunglasses']}`,
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.6,
            n: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        // res.json(data)
        console.log('new notes', response.data.choices[0])
        res.json(response.data.choices[0].text)
        // console.log('testing', data)
        // console.log(JSON.parse(response.data.choices));
    } catch (e) {
        return res.status(400).json({ e });
    }
    
});



// post request to add a new user upon sign up or log someone in if they already exist
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

// post request to add a new trip 
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

        // console.log(preTodoList.rows, postTodoList.rows)
        const { rows: ready_trip } = await db.query('SELECT * FROM ready_trips WHERE user_id=$1', [user_id]);
        res.send(ready_trip);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// post request to add a new todo
app.post('/addtodo', async (req, res) => {
    try {
        const {item, item_due_date, list_id, trip_id} = req.body;
        console.log('add to do request', req.body)
        const result = await db.query('INSERT INTO ready_items(item, item_due_date, list_id) VALUES($1, $2, $3)', [item, item_due_date, list_id]);

        const { rows } = await db.query('select ready_lists.list_id, list_name, trip_id, user_id, is_template, list_created, item_id, item, item_is_done, item_due_date, item_version from ready_lists left join ready_items on ready_lists.list_id=ready_items.list_id where trip_id=$1;', [trip_id])
        let lists = {}
        for (let i = 0; i < rows.length; i++) {
            let list_name = rows[i].list_name;

            if (!lists[list_name]) {
                lists[list_name] = [rows[i]]
            } else {
                lists[list_name].push(rows[i])
            }
        }
        console.log('selected items from backend being sent', lists)
        res.send(lists)
    } catch (e) {
        return res.status(400).json({ e });
    }
})

// post request to add a new to-do list to a specfic trip
app.post('/addtriplist', async (req, res) => {
    try {
        const {list_name, trip_id, user_id} = req.body;
        console.log('add to do list to a trip request', req.body)
        const result = await db.query('INSERT INTO ready_lists(list_name, trip_id, user_id) VALUES($1, $2, $3)', [list_name, trip_id, user_id]);

        const { rows } = await db.query('select ready_lists.list_id, list_name, trip_id, user_id, is_template, list_created, item_id, item, item_is_done, item_due_date, item_version from ready_lists left join ready_items on ready_lists.list_id=ready_items.list_id where trip_id=$1;', [trip_id])
        let lists = {}
        for (let i = 0; i < rows.length; i++) {
            let list_name = rows[i].list_name;

            if (!lists[list_name]) {
                lists[list_name] = [rows[i]]
            } else {
                lists[list_name].push(rows[i])
            }
        }
        console.log('selected items from backend being sent', lists)
        res.send(lists)
    } catch (e) {
        return res.status(400).json({ e });
    }
})


// a put request to update trip details

app.put('/edittrip/:trip_id', async (req, res) => {
    try {
        const { trip_id } = req.params;
        const { location, trip_description, trip_end_date, trip_name, trip_start_date } = req.body;

        const updatedTrip = await db.query('UPDATE ready_trips SET location=$1, trip_description=$2, trip_end_date=$3, trip_name=$4, trip_start_date=$5 WHERE trip_id=$6 RETURNING *',
        [location, trip_description, trip_end_date, trip_name, trip_start_date, trip_id])
        
        console.log(updatedTrip)
        
        const { rows: trip_details } = await db.query('SELECT * FROM ready_trips WHERE trip_id=$1;', [trip_id])
        res.send(trip_details)
        console.log('all trip details', trip_details)
    } catch (error) {
        console.error(error)
    }
})

// a put request to update if a todo is changed
app.put('/edittodo/:item_id', async (req, res) => {
    try {
        const { item_id } = req.params;
        const { item, trip_id, item_due_date, item_version } = req.body;

        const updatedTodo = await db.query('UPDATE ready_items SET item=$1, item_due_date=$2, item_version=$3 WHERE item_id=$4 RETURNING *',
        [item, item_due_date, item_version, item_id])
        
        console.log(updatedTodo)
        
        const { rows } = await db.query('select ready_lists.list_id, list_name, trip_id, user_id, is_template, list_created, item_id, item, item_is_done, item_due_date, item_version from ready_lists left join ready_items on ready_lists.list_id=ready_items.list_id where trip_id=$1;', [trip_id])

        let lists = {}
        for (let i = 0; i < rows.length; i++) {
            let list_name = rows[i].list_name;

            if (!lists[list_name]) {
                lists[list_name] = [rows[i]]
            } else {
                lists[list_name].push(rows[i])
            }
        }
        res.send(lists)
        console.log('all trip todo lists', lists)
    } catch (error) {
        console.error(error)
    }
})

// A put request to update user info 
app.put('/edituser/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { user_email, user_first_name, user_last_name, user_username } = req.body;

    const updateUser = await db.query('UPDATE ready_users SET user_first_name=$1, user_last_name=$2, user_username=$3 WHERE user_id=$4',
    [user_first_name, user_last_name, user_username, user_id])
    const { rows: ready_user } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [user_email]);
    res.send(ready_user);
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