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

// 🟢 1️⃣ Detectar cuando se crea un nuevo pedido
app.post('/webhook/nuevo-pedido', async (req, res) => {
    try {
        const { id, billing, total, status } = req.body; // Extraer datos del pedido
        const phone = billing.phone;
        const name = billing.first_name;

        if (!phone) {
            console.log(`❌ Pedido #${id} no tiene número de teléfono.`);
            return res.status(400).json({ error: "Número de teléfono no encontrado" });
        }

        const mensaje = `Hola ${name}, hemos recibido tu pedido #${id}. Total: $${total}. Estado: ${status}.`;

        // Enviar mensaje por WhatsApp
        await client.messages.create({
            from: twilioNumber,
            to: `whatsapp:${phone}`,
            body: mensaje,
        });

        console.log(`✅ Mensaje enviado a ${phone}: ${mensaje}`);
        res.status(200).json({ success: true, message: "Notificación de nuevo pedido enviada correctamente" });

    } catch (error) {
        console.error("❌ Error enviando mensaje:", error);
        res.status(500).json({ success: false, error: "Error enviando mensaje de WhatsApp" });
    }
});

// 🟢 2️⃣ Detectar cuando cambia el estatus de un pedido
app.post('/webhook/cambio-estatus', async (req, res) => {
    try {
        const { id, billing, total, status } = req.body; // Extraer datos del pedido
        const phone = billing.phone;
        const name = billing.first_name;

        if (!phone) {
            console.log(`❌ Pedido #${id} no tiene número de teléfono.`);
            return res.status(400).json({ error: "Número de teléfono no encontrado" });
        }

        const mensaje = `Hola ${name}, tu pedido #${id} ha cambiado a '${status}'. Total: $${total}.`;

        // Enviar mensaje por WhatsApp
        await client.messages.create({
            from: twilioNumber,
            to: `whatsapp:${phone}`,
            body: mensaje,
        });

        console.log(`✅ Mensaje enviado a ${phone}: ${mensaje}`);
        res.status(200).json({ success: true, message: "Notificación de cambio de estado enviada correctamente" });

    } catch (error) {
        console.error("❌ Error enviando mensaje:", error);
        res.status(500).json({ success: false, error: "Error enviando mensaje de WhatsApp" });
    }
});



app.get('/', (req,res) => {
    res.send(
        'Servidor corriendo'
    )
})

app.listen( port, () => { 
    console.log('servidor corriendo en el puerto' + port) 
})   