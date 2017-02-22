const express = require('express');
const fs = require('fs');

const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname+'/partials')
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;
    fs.appendFileSync('server.log',log + '\n');
    next();
});

/*app.use((req,res,next)=>{
  res.render('maintanance.hbs');
});*/

app.use(express.static(__dirname+'/public'));
/*hbs.registerHelper('getcurrentYear',()=>
{
   return new Date().getFullYear();
});*/

hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('ScreamIt',(text)=>{
   return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
    pageTitle: 'Home Page',

});
});



app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle: 'About Page',

});
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Invalid Page Request'
})
})



app.listen(port,()=>{
    console.log(`Server port ${port}`);
});