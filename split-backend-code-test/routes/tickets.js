var express = require('express');
var router = express.Router();
var moment = require('moment')

/* 
HINT
 
Use moment library to manipulate datetime
https://momentjs.com/

*/

router.post('/oneSettlementPerWeek', function(req, res, next) {
    // use req.body to get JSON of start and end dates. We are only concerned with end dates.
    let endDate = moment(req.body['end'],'DD-MM-YYYY')
    
    //add changes below
    let paymentDate = endDate;
    while(paymentDate.format('dddd')!='Monday'){
        paymentDate.add(1, 'days');
    }
    res.json({"paymentDate":paymentDate.format('DD-MM-YYYY')})
});
router.post('/twoSettlementPerWeek', function(req, res, next) {
    let endDate = moment(req.body['end'],'DD-MM-YYYY')

    //add changes below
    let paymentDate2 = endDate;
    while(paymentDate2.format('dddd')!='Monday' || paymentDate2.format('dddd')!='Thursday'){
        paymentDate2.add(1, 'days');
    }
    res.json({"paymentDate":paymentDate2.format('DD-MM-YYYY')})
});
router.post('/calculateSettlementAmount', function(req, res, next) {
    //add changes below
    var sum=0;
    for(var i in req){
        sum = req[i].body["price"] * (1 - (req[i].body["MDR"]/100));
    }
    res.json({"totalSum": sum})
});



/*

Assignment 3

Create API to CRUD function for tickets
Use NPM sqlite3 save the tickets 
https://www.npmjs.com/package/sqlite3

Ticket

{
  "ticketId":"TES2312-32",
  "price" , "203.10",
  "MDR" : "2.0",
  "currency" : "SGD",
  "travelAgentName" : "SPLIT-TEST-AGENT01"
}


Provide a solution to restart the app instance if it crashes.



*/
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let contacts = require('./data');

app.get('/api/contacts', (request, response) => {
  if (!contacts) {
    response.status(404).json({ message: 'No contacts found.' });
  }
  response.json(contacts);
});

app.get('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  });

  if (!contact) {
    response.status(404).json({ message: 'Contact not found' });
  }

  response.json(contact[0]);
});

app.post('/api/contacts', (request, response) => {

  let contact = {
    id: contacts.length + 1,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    website: request.body.website
  };

  contacts.push(contact);

  response.json(contact);

});

app.put('/api/contacts/:id', (request, response) => {

  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    contact[key] = request.body[key];
  });

  contacts[index] = contact;

  // response.json({ message: `User ${contactId} updated.`});
  response.json(contacts[index]);
});

app.delete('/api/contacts/:id', (request, response) => {
  
  let contactId = request.params.id;

  let contact = contacts.filter(contact => {
    return contact.id == contactId;
  })[0];

  const index = contacts.indexOf(contact);

  contacts.splice(index, 1);

  response.json({ message: `User ${contactId} deleted.`});

});

const hostname = 'localhost';
const port = 3001;

const server = app.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  
});


/*
Assignment 4
Ensure the nodejs app process restart itself when it crash
*/

//Custom GET API that will crash the app
router.get('/crashApp', function(req, res, next) {
    let totalSum = []
    while(true){
        let temp = {"test": 123, "data": [1,2,4,56,23,23,]}
        totalSum.push(temp)
    }
    res.json({"message":"This will not be return as app will crash"})
});


module.exports = router;
