const express = require('express');
const db = require('./config/config');
const adminDb = require('./config/config');

const app = express();

app.use(express.json());

app.listen('5000', (req, res) => {
    console.log('Server is running on port 5000');
})

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
})

// Users
app.post('/users/', async (req, res) => {
    try{
        const response = await adminDb.collection('users').add(req.body)
        const id = response.id;
        await adminDb.collection('users').doc(id.toString()).update({"id": id.toString()});
        return res.status(200).send({
            "id": id
        });
    } catch(error){
        return res.status(500).send(error);
    }
})

app.get('/users/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await db.collection('users').doc(uid.toString()).get();
        if(response.exists){
            res.status(200).send(response.data());
        } else {
            res.status(404).send("User not found");
        }
    } catch(error){
        res.status(500).send(error);
    }
})

app.delete('/users/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const dbResponse = await db.collection('users').doc(uid.toString()).get();
        if(dbResponse.exists){
            res.status(200).send("User deleted from firestore");
        } else {
            res.status(404).send("User don't exist");
        }
        await adminDb.collection('users').doc(uid.toString()).delete();
    } catch(error){
        res.status(500).send(error);
    }
})

app.put('/users/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await adminDb.collection('users').doc(uid.toString()).update(req.body);
        res.status(200).send(response);
    } catch(error){
        res.status(500).send(error);
    }
})

// Carts
app.post('/carts', async (req, res) => {
    try{
        const response = await adminDb.collection('carts').add(req.body)
        const id = response.id;
        res.status(200).send({
            "id": id
        });
    } catch(error){
        res.status(500).send(error);
    }
})

app.get('/carts/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await db.collection('carts').doc(uid.toString()).get();
        if(response.exists){
            res.status(200).send(response.data());
        } else {
            res.status(404).send("Cart not found");
        }
    } catch(error){
        res.status(500).send(error);
    }
})

app.delete('/carts/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const dbResponse = await db.collection('carts').doc(uid.toString()).get();
        if(dbResponse.exists){
            res.status(200).send("Cart deleted from firestore");
        } else {
            res.status(404).send("Cart don't exist");
        }
        await adminDb.collection('carts').doc(uid.toString()).delete();
    } catch(error){
        res.status(500).send(error);
    }
})

app.put('/carts/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await adminDb.collection('carts').doc(uid.toString()).update(req.body);
        res.status(200).send(response);
    } catch(error){
        res.status(500).send(error);
    }
})

// Products
app.post('/products', async (req, res) => {
    try{
        const response = await adminDb.collection('products').add(req.body)
        const id = response.id;
        await adminDb.collection('products').doc(id.toString()).update({"id": id.toString()});
        res.status(200).send({
            "id": id
        });
    } catch(error){
        res.status(500).send(error);
    }
})

app.get('/products/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await db.collection('products').doc(uid.toString()).get();
        res.status(200).send(response.data());
    } catch(error){
        res.status(500).send(error);
    }
})

app.get('/products', async (req, res) => {
    try{
        const response = await db.collection('products').get();
        const docs = response.docs.map(doc => doc.data());
        res.status(200).send(docs);
    } catch(error){
        res.status(500).send(error);
    }
})

app.delete('/products/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const dbResponse = await db.collection('products').doc(uid.toString()).get();
        if(dbResponse.exists){
            res.status(200).send("Product deleted from firestore");
        } else {
            res.status(404).send("Product don't exist");
        }
        await adminDb.collection('products').doc(uid.toString()).delete();
    } catch(error){
        res.status(500).send(error);
    }
})

app.put('/products/:uid', async (req, res) => {
    try{
        let uid = req.params.uid;
        const response = await adminDb.collection('products').doc(uid.toString()).update(req.body);
        res.status(200).send(response);
    } catch(error){
        res.status(500).send(error);
    }
})

// Categories

app.get('/categories', async (req, res) => {
    try{
        const response = await db.collection('categories').get();
        const docs = response.docs.map(doc => doc.data());
        res.status(200).send(docs);
    } catch(error){
        res.status(500).send(error);
    }
})
