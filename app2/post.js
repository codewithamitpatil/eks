

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const  os  = require('os');

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;
const host = process.env.HOST || "localhost";

app.use(cors('*'));
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.get('/os',async(req,res)=>{
    console.log();
    const obj ={
        host:os.hostname(),
        platform:os.platform(),
        info:os.userInfo(),
        cpus:os.cpus(),
        memory:os.totalmem(),
        dir:os.homedir(),
        temp:os.tmpdir()
    }
   res.send(obj);
});  

app.get('/',async(req,res,next)=>{
   res.send('welcome route post service');
});

app.get('/post',async(req,res,next)=>{
   res.send({
    name:"amit is good",
    title:"lerarn aws",
    age:23
   });
});


app.listen(port,()=>{
  console.log(`Post Server is listening at http://${host}:${port}`);
});