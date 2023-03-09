const express = require('express')
require('./src/db/mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const port =process.env.PORT 

app.use(express.json())
const postRouter = require('./src/routers/post')
const userRouter = require('./src/routers/user')

app.use(postRouter);
app.use(userRouter);

app.use(
  cors({
    origin: '*',
  }),
)

app.get('/', (req, res) => {
    res.send({ msg: 'Hey congratulations, we are connected'})
  })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
 