import bodyParser from 'body-parser'
import express from 'express' 
import twilio from 'twilio'
import dotenv from 'dotenv'

const app = express() 
const port = 3000

      
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))



// credenciales de Twilio (reemplaza con las tuyas)
const accountSid = process.env.SID
const authToken = process.env.TOKEN
const client = twilio(accountSid, authToken);






app.get('/', (req,res) => {
    res.send(
        'Servidor corriendo'
    )
})

app.listen( port, () => { 
    console.log('servidor corriendo en el puerto' + port) 
})   