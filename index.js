var express = require('express');
var mongoose = require('mongoose');
var usuario = require ('./usuario');

// Inicializando
var app = express();

// conexion
mongoose.connect('mongodb://localhost:27017/anonimus', { useNewUrlParser: true, useUnifiedTopology: true }, (Error) => {
    if(Error){
        console.log(Error);
    }
    else{
        console.log('base de datos conectada');
    }
});

// Configuracion
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/usuario', (Request, Response) => {
    usuario.find((err, data) => {
        Response.send(data);
    });
});

app.post('/usuario', (req,res) => {
    console.log(req.body);
    var user = new usuario();
    user.nombre = req.body.nombre;
    user.apellidos = req.body.apellidos;
    user.dni = req.body.dni;
    user.save();
    res.send('esto es post');
});

app.put('/usuario/:id_usuario',(Request,Response)=>{
    usuario.findByIdAndUpdate(Request.params.id_usuario , Request.body, (Error) =>{
        if(Error) {Response.send(Error)}
        else{Response.send('Actualizando')}
    });
});

app.delete('/usuario/:_id', (Request,Response)=>{
    usuario.findByIdAndRemove({_id: Request.params._id});
    Response.send('Eliminado');
});

app.listen(4000,function(){
    console.log('server on port 4000')
});