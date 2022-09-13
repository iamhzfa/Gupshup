// importing
const express = require('express');
const mongoose = require('mongoose');
const messageModel = require('./messageSchema.js');
const Pusher = require('pusher');
const cors = require('cors');

// app config
const app = express();
const port = process.env.PORT || 4000;


// middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });


// DB config
const connectionUrl = 'mongodb+srv://<username>:<password>@cluster0.096rywt.mongodb.net/gupshupdb?retryWrites=true&w=majority'
mongoose.connect(connectionUrl)
.then(()=>{
    console.log("DB IS LIVE")
})
.catch((err)=>{
    console.log("DB gayi dibbi m")
    console.log(err)
})

// use pusher a realtime message sender and receiver for chatting app(middleware b/w frontend and backend)
const pusher = new Pusher({
    // pusher channels keys
    // remove for safety purpose
});
const db = mongoose.connection;
db.once("open", ()=>{
    console.log("DB is connected with pusher");
    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch(); 

    changeStream.on('change', (change)=>{
        console.log(change);
        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    received: messageDetails.received
                }    
            );
        } else{
            console.log('Error triggering pusher');
        }

    })
})



// api routes
app.get('/',(req, res)=>res.status(200).send('Success'));

app.post('/message/new', (req, res)=>{
    
    // first way
    const dbMessage = req.body;
    messageModel.create(dbMessage, (err, data)=>{
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }
        else{
            return res.status(201).send(data);
        }
    });

    // Second way 
    // const fullMessage = req.body;
   
    // messageModel.create(fullMessage)
    // .then((user)=>{
    //     res.send(user)
    // }).
    // catch((err)=>{
    //     res.send(err);
    // })

    // third way
    // const fullMessage = req.body;
   
    // messageModel.create({
    //     message : fullMessage.message,
    //     name  : fullMessage.name
    // }).then((user)=>{
    //     res.send(user)
    // }).
    // catch((err)=>{
    //     res.send(err);
    // })
});

app.get('/message/sync', (req, res)=>{
    
    messageModel.find((err, data)=>{
        if(err){
            console.log("Error");
            res.status(500).send(err);
        }
        else{
            console.log("Data");
            res.status(200).send(data);
        }
    });
});

app.use('/auth', require('./routes/auth'))

// listen
app.listen(port, ()=>console.log(`Backend ready at port : ${port}`))