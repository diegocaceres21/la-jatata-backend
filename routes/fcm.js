const express =require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
const router = express.Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, payload) => {
    try {
        const response = await admin.messaging().sendToDevice(token, payload);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

router.post('/subscribe-to-topic', async (req, res) => {
    const { token, topic } = req.body; // Expect token and topic in request body

    try {
        // Subscribe the token to the topic
        const response = await admin.messaging().subscribeToTopic(token, topic);
        console.log('Successfully subscribed to topic:', response);
        res.status(200).send({ success: true, response });
    } catch (error) {
        console.error('Error subscribing to topic:', error);
        res.status(500).send({ success: false, error });
    }
});
router.post('/send-notification', (req, res) => {
    const { topic, message } = req.body; // Extracting data from request body

    const payload = {
        topic: topic, // Replace with your topic name
        notification: {
            title: 'Nueva Comanda',
            body: 'Revisar pedido para la Jatata',
        },
    };

    /*const payload = {
        notification: {
            title: 'Nuevo Pedido',
            body: message,
        },
        data: data, // Include data payload here
    };*/

    // Send a message to the devices subscribed to the provided topic
    admin.messaging().send(payload)
        .then((response) => {
            console.log('Notification sent successfully:', response);
            res.status(200).send('Notification sent successfully');
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            res.status(500).send('Error sending notification');
        });
});

//GET ALL PRODUCTS


module.exports = router;