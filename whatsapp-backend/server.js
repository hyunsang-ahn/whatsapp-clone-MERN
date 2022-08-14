// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
//app config
const app = express()
const port = process.env.PORT || 9000
//middleware
app.use(express.json())

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

//api router
app.get('/', (req, res) => res.states(200).send("hello world"))

app.get('/message/sync', (req, res) => {
  Messages.find((err, data) => {
    if(err){
      res.status(500).send(err)
    }else{
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

