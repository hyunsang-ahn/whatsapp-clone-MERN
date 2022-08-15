// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors'
//app config
const app = express()
const port = process.env.PORT || 9000



const pusher = new Pusher({
  appId: "1462907",
  key: "804366273029e5fe9974",
  secret: "edab1649d97437bd50d8",
  cluster: "ap3",
  useTLS: true
});
//middleware
app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Headers", "*")
//   next()

// })
// db config
const connection_url = `mongodb+srv://admin:XfC0qDhScp7R7RUi@cluster0.ishkfi9.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(connection_url, {
  //config
  //mongoose v5 는 옵션 필요 v6는 필요x
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,

})


// ????????surprise
const db = mongoose.connection

db.once('open', () => {
  console.log("DB Connected!!!")

  const msgCollection = db.collection("messagecontents")
  const ChangeStream = msgCollection.watch()
  ChangeStream.on('change', (change) => {
    console.log('change=============', change)
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,

      });
    } else {
      console.log("Error triggering pusher")
    }
  })
})






//api router
app.get('/', (req, res) => res.states(200).send("hello world"))

app.get('/message/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/message/new', (req, res) => {
  const dbMessage = req.body
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500)
    } else {

      res.status(201).send(`new message created : \n ${data}`)
    }
  })
})
//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))

