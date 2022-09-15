const express= require('express');
const mysql=require('mysql');
const app=express();
const bodyparser=require('body-parser');

app.use(bodyparser.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:"ezppay_db",
    multipleStatements:true
});

db.connect((err)=>{
    if(err)
    throw err;
    else
    console.log("MySQL connected....");

 });
 
  app.get('/users',(req,res)=>{
    let sql='SELECT * FROM user_table';
    db.query(sql,(err,result)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);

    })
});

app.get('/users/:id',(req,res)=>{
    let sql='SELECT * FROM user_table WHERE UID=?';
    db.query(sql,[req.params.id],(err,result)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);

    })
});


//Insert an element
app.post('/users',(req,res)=>{
    const user=req.body;
    let sql='INSERT INTO user_table(UID,FirstName,MiddleName,LastName,Email,PhoneNo,LoginID,Location,Role,TempPass,Password,SeqQue,SeqAns) \
                   values(?,?,?,?,?,?,?,?,?,?,?,?,?)';
     db.query(sql,[user.UID,user.FirstName,user.MiddleName,user.LastName,user.Email,user.PhoneNo,
        user.LoginID,user.Location,user.Role,user.TempPass,user.Password,user.SeqQue,user.SeqAns],(err,result)=>{
        if(!err)
            res.send("Record has been inserted successfully!");
        else
        console.log(err);

    })
});


app.put('/users/:id',(req,res)=>{
    const id=req.params.id;
    const user=req.body;
    let sql='UPDATE user_table SET FirstName=?, MiddleName=?, LastName=?, Email=?, PhoneNo=?, LoginID=?, Location=?,\
        Role=?, TempPass=?, Password=?, SeqQue=?, SeqAns=? WHERE UID=?';
     db.query(sql,[user.FirstName,user.MiddleName,user.LastName,user.Email,user.PhoneNo,
        user.LoginID,user.Location,user.Role,user.TempPass,user.Password,user.SeqQue,user.SeqAns,id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0){
            return res.status(404).json({message:"UID does not found"});
        }
            return res.status(200).json({message:"Record has been updated successfully"})
    }
        else
        console.log(err);

    })
});


app.delete('/users/:id',(req,res)=>{
    let sql='DELETE FROM user_table WHERE UID=?';
    db.query(sql,[req.params.id],(err,result)=>{
        if(!err)
        res.send("Deleted Successfully.");
        else
        console.log(err);

    })
});

app.listen('3000',()=>{
    console.log("Server Started on port no 3000");
});


