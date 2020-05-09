const express = require('express');
const bodyParser = require('body-parser');
const apisms = require('./bin/apisms');
const morgan = require('morgan');
const port = process.env.PORT || 4000;
const app = express();

app.get('/',  async (req, res) => {
    var text = "/apisms/v1 <b>GET</b><br>/apisms/v2 <b>POST</b><br><br>Query: pesan= & nohp=";
    res.send(text)
})

app.get('/apisms/v1', async (req, res) => {
    if(!req.query.pesan || !req.query.nohp){
        res.send('Query required')
       }else{
        const {pesan, nohp} = req.query;
        const daftar  = await  apisms.Register();
        const getUsername = daftar.split(' ')[1];
        const cookie  = await  apisms.getCookie(getUsername);
        const Cookie = cookie[0].split(';')[0];
        const getApi  = await  apisms.getApi(Cookie);
        const kirimpesan = await apisms.apisms(getApi, pesan, nohp);
        res.send(kirimpesan);
       }
})
app.post('/apisms/v2', async (req, res) => {
        const {pesan, nohp} = req.query;
        const daftar  = await  apisms.Register();
        const getUsername = daftar.split(' ')[1];
        const cookie  = await  apisms.getCookie(getUsername);
        const Cookie = cookie[0].split(';')[0];
        const getApi  = await  apisms.getApi(Cookie);
        const kirimpesan = await apisms.apisms(getApi, pesan, nohp);
        res.send(kirimpesan);
       
})

app.listen(port, function(){
    console.log(`server berjalan pada port ${port}`);
});