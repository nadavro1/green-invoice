const express = require('express');
const path= require('path')
const app = express();
const connectDB= require('./config/db') 

connectDB();

//Init middleware
app.use(express.json({extended:false}));


app.use('/api/managers',require('./Routes/API/managers'));
app.use('/api/employees',require('./Routes/API/employees'));
app.use('/api/departments',require('./Routes/API/departments'));

if(process.env.NODE_ENV === 'production'){
    console.log("using production")
    //set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}

const PORT= process.env.PORT || 4000;

app.listen(PORT,() => {console.log(`Listening on port ${PORT}`)});