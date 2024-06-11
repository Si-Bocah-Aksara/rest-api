//Module and dependency import here plzz
const express = require('express')
const app = express();

const sequelize = require('./db');
const pesan = require('./pesan')
const bodyParser = require('body-parser');

//Server Initialize
const server = app.listen(4000, () => {
    console.log(pesan.info("Now i am online at")+pesan.info('\u001b[1mhttp://localhost:'+server.address().port))
    })
//Sequalize initalize
sequelize.authenticate()
    .then(() => {
      console.log(pesan.sukses("Yahoo! We\'re connected to the database"));
    })
    .catch(err => {
      console.error(err, pesan.gagal("\nOw, maybe double check your service or the config, we got some error here"));
    });
  

//Lets Roll the API
app.get("/",(req,res)=>{
      res.status(200).json({message:"Hey i'm online now"})
      console.log(pesan.info('We are on /root'))
  })
  app.use(bodyParser.json());
  // app.post('/test', (req, res) => {
  //   const { name, email } = req.body; // Destructure data from body
  //   if (!name || !email) {
  //     return res.status(400).json({ message: 'Missing name or email' });
  //   }
  //   res.json({ message: `Hello, ${name}! Your email is ${email}` });
  // });
const userRouter = require('./router/users')
app.use("/users", userRouter)

