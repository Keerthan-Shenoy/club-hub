const mysql=require("mysql2");
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());

const pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"KiranM786@#",
    database:"club_hub",
    port: "3306"
},(err,result)=>{
    if(err) 
        console.log(err)
    else    
        console.log(result)
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query2 = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const query1 = `SELECT * FROM admin WHERE email = ? AND password = ?`;

    pool.query(query1, [email, password], (error, results) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' }); // Send JSON response
        }

        if (results.length > 0) {
            const user = results[0]; 
            console.log("User found in database");
            return res.status(200).json({ message: 'Sign-in successful',
                user: {
                    id: 0,
                    name: user.first_name + ' ' + user.last_name,
                    email: user.email,
                    isadmin: true
                }
            }); 
        }
        else {
            pool.query(query2, [email, password], (error, results) => {
                if (error) {
                  console.log('Error:', error);
                  return res.status(500).json({ error: 'Internal Server Error' }); // Send JSON response
                }
            
                if (results.length > 0) {
                  const user = results[0]; 
                  console.log("User found in database");
                  return res.status(200).json({ message: 'Sign-in successful',
                      user: {
                          id: user.id,   
                          name: user.first_name + ' ' + user.last_name,
                          email: user.email,
                          isadmin: false
                        }
                   }); 
                } else {
                  console.log("User not found or wrong password");
                  return res.status(401).json({ error: 'User/Password not found' }); // Unauthorized error
                }
            });
        }
    });
  });
  

app.post('/signup',(req, res) =>{
    const { username, about, firstName, lastName, srn, gender, contact, email, password, campus, year, specialization } = req.body;
    const command = `INSERT INTO users(srn, username, about, first_name, last_name, gender, contact, campus, year_of_graduation, specialization, email, password) 
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    pool.query(command, [srn, username, about, firstName, lastName, gender, contact,  campus, year, specialization, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Duplicate Entry'});
        }
        return res.status(200).send("Data inserted successfully");
    });
});

app.post('/newclub',(req, res) =>{
    const { name, about, campus, type} = req.body;
    const command = `INSERT INTO club_applications(srn, name, description, campus, type) 
    VALUES(?, ?, ?, ?, ?, ?, ?)`;
    pool.query(command, [srn, name, about, campus, type], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Duplicate Entry'});
        }
        return res.status(200).send("Data inserted successfully");
    });
});

app.get('/clubs', (req, res) => {
    const query = 'SELECT * FROM club'; 
    pool.query(query, (err, results) => { 
        if (err) 
            throw err; 
        res.json(results); 
    });
})

app.get('/', (req, res) => {
    const query = 'SELECT * FROM events'; 
    pool.query(query, (err, results) => { 
        if (err) 
            throw err; 
        res.json(results); 
    });
})

app.get('/clubs/:clubId', (req, res) => {
    const clubId = req.params.clubId;
    console.log('Entered club profile');
    const query1 = 'SELECT * FROM club WHERE clubId = ?'; 
    const query2 = `
    SELECT members.member_id, users.first_name, users.last_name, members.position
    FROM members
    JOIN users ON members.user_id = users.id
    WHERE members.club_id = ?`;
    const query3 = 'UPDATE club SET viewed = viewed + 1 WHERE clubId = ?';
    pool.query(query3, [clubId], (err, updateResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('View count incremented');
    });
    pool.query(query1, [clubId], (err, results) => { 
        if (err) 
            throw err; 
        const clubDetails = results[0];
        console.log(clubDetails);
        pool.query(query2, [clubId], (err, memberResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            clubDetails.members = memberResults;
            console.log(clubDetails);
            res.json(clubDetails);
        });
    }); 
})

app.post('/join',(req,res)=>{
    const {event_id, user_id}=req.body;
    const query=`INSERT INTO participants(user_id,event_id) VALUES(?,?)`;
    pool.query(query, [user_id,event_id], (err,results)=>{
        if(err) {
            console.error(err)
            return res.status(500).json();
        }
        else{
            res.status(200).json({message: 'Successfully joined'});
        }
    });
});

app.get('/joined/:user_id', (req, res) => {
    const user_id = req.params.user_id; // Get user_id correctly
    const query = `SELECT event_id FROM participants WHERE user_id = ?`;
    
    pool.query(query, [user_id], (error, result) => {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length > 0) {
            const event_ids = result.map(row => row.event_id); // Extract event_ids into an array
            return res.status(200).json(event_ids); // Send all event_ids as an array
        } else {
            return res.status(200).json([]); // Return an empty array if no events are joined
        }
    });
});


app.listen(5050,()=>{
    console.log("Listening on port 5050...");
})
