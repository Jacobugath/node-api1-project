const express = require('express'); 
const server = express(); 




server.get('/', (req, res) => {
  res.send('Hello from Express!!!');
});
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000 !!')
);



const cors = require('cors');

let users = [{id: 0, name: 'wow', bio: 'wow, wow'}];
let nextId = 1;

function getNextId() {
    return nextId++;
  }

  server.use(express.json());

  server.use(cors());

  
  server.get('/api/users', (req, res) => {
      res.send(users);
    });
  
  server.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  });
  
  server.post('/api/users', (req, res) => {
   if(req.body.name === undefined){
       res.status(500).send('must have name')
   }
   if(req.body.bio === undefined){
    res.status(500).send('must have bio')
    }

    const user = { id: getNextId(), ...req.body };
    console.log('posting');
    users = [...users, user];
    res.status(201).send(users);
  });
  
  server.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
  
    const userIndex = users.findIndex(u => u.id == id);
  
    if (userIndex > -1) {
      const user = { ...users[userIndex], ...req.body };
  
      users = [
        ...users.slice(0, userIndex),
        user,
        ...users.slice(userIndex + 1)
      ];
      res.send(users);
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  });
  
  server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    users = users.filter(u => u.id !== Number(id));
  
    res.send(users);
  });