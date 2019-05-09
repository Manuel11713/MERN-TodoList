const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');


// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//Conexion React-Node
app.use(cors());


app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.get('/list', (req,res)=>{
    const lista = require('./tareas.json');
    res.json(lista)
});
app.post('/creartarea',(req,res)=>{
    const nuevaTarea = req.body;
    console.log(nuevaTarea);
    const tareas = require('./tareas.json');
    tareas.push(nuevaTarea);
    const tareasJSON = JSON.stringify(tareas);

    fs.writeFile('tareas.json',tareasJSON,(err)=>{
        if(err) return console.log('Hubó un error',err);
        res.status(200).json({ok:true});
    });
});
app.post('/creartarear',(req,res)=>{
    const pos = req.body;
    const tareas = require('./tareas.json');
    tareas.splice(pos, 1);
    const tareasJSON = JSON.stringify(tareas);

    fs.writeFile('tareas.json',tareasJSON,(err)=>{
        if(err) return console.log('Hubó un error',err);
        res.status(200).json({ok:true});
    });
});


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Escuchando puerto ${port}`))

