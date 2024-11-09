const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs=require('fs');
const HttpError = require('./model/http-error');
const mongoose = require('mongoose');
const planroutes = require('./routes/plan-routes');
const publicationroutes = require('./routes/publication-routes');
const authorroutes = require('./routes/author-routes');
const genreroutes = require('./routes/genre-routes');
const bookroutes = require('./routes/book-routes');
const userroutes = require('./routes/user-routes');






app.use(bodyParser.json())


// to handle cors policy errors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization');
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
        );
        next();
        
})

app.use('/api/plans',planroutes);
app.use('/api/publications',publicationroutes);
app.use('/api/author',authorroutes);
app.use('/api/genre',genreroutes);
app.use('/api/books',bookroutes);
app.use('/api/user',userroutes);

app.use((req,res,next)=>{
    const error = new HttpError('could not find this routes',404);
    throw error;
});

app.use((err, req, res, next) => {

    // this condition will delete the image when error occurs
    if(req.file){
        fs.unlink(req.file.path,(err)=>{   //deletes the file
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500);
    res.json({message: err.message} || 'An unknown error occured!');
})

mongoose.connect('mongodb+srv://rashreji15:Faith@faith.ykpqv.mongodb.net/BookManagement?retryWrites=true&w=majority&appName=faith').then(()=>{
    //to start the server
    app.listen(5000);
    }).catch(err=>{
        console.log(err);
    })