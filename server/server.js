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
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(cors());
app.use(express.json());
app.use(express.static(REACT_BUILD_DIR))



const configuration = new Configuration({
    organization: "org-e9LvttIoF3o21ySUOzFoq4oi",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    // res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
    res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/students', async (req, res) => {
    try {
        const { rows: students } = await db.query('SELECT * FROM students');
        res.send(students);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/api/user/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const { rows: ready_user } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [email]);
        res.send(ready_user);
        console.log("backend response to a user get request", ready_user);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

app.get('/api/openai', async (req, res) => {
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
app.post('/api/user', async (req, res) => {
    try {
        const { email, family_name, given_name, nickname } = req.body;
        //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
        const result = await db.query(
            'INSERT INTO ready_users(user_email, user_last_name, user_first_name, user_auth0_nickname) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *',
            [email, family_name, given_name, nickname],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0] ?? {});

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
app.put('/api/students/:studentId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the student to be updated
    const studentId = req.params.studentId
    const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, iscurrent: req.body.is_current}
    console.log("In the server from the url - the student id", studentId);
    console.log("In the server, from the react - the student to be edited", updatedStudent);
    // UPDATE students SET lastname = "something" WHERE id="16";
    const query = `UPDATE students SET firstname=$1, lastname=$2, is_current=$3 WHERE id=${studentId} RETURNING *`;
    const values = [updatedStudent.firstname, updatedStudent.lastname, updatedStudent.iscurrent];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});