const fetch = require ('node-fetch');
const { URLSearchParams } = require ('url');
const cheerio = require('cheerio');
const UsernameGenerator = require("username-generator");
const ua = require("useragent-generator");


const Register = () => new Promise((resolve,reject) =>{
    const urlregister = 'https://apisms.my.id/daftar.php';
    const params = new URLSearchParams;
    const username = UsernameGenerator.generateUsername();
    params.append('username', username);
    params.append('password', 'apisms123');
    params.append('email', `${UsernameGenerator.generateUsername()}@gmail.com`);
    params.append('nomerhp', '08122332123');
    params.append('daftar', '');
    fetch(urlregister, {
        method: 'POST',
        headers: {
            'User-Agent': ua.chrome.androidPhone({
                version: "61.0.0",
                androidVersion: "7.1.2",
                device: "Nexus 6"
              }),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'apisms.my.id',
            'Content-Length': '88',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip'
        },
        body: params

    })
    
    .then( res => res.text())
    .then( result => {
        const $ = cheerio.load(result);
        const resText = $('div.alert').text();
        resolve(resText);
    })
    .catch(err => reject(err));
    // console.log(username);
    
});

const ceklogin = (Username) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('username', `${Username}`);
    params.append('password', 'apisms123');

    fetch('https://apisms.my.id/userlogin.php', {
        method:'POST',
        headers: {
            'User-Agent': ua.chrome.androidPhone({
                version: "61.0.0",
                androidVersion: "7.1.2",
                device: "Nexus 6"
              }),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'apisms.my.id',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip'
        },
        body: params
    })
    .then(res => res.text())
    .then( result => resolve(result))
    .catch(err => reject(err))
})
const getCookie = (username) => new Promise((resolve, reject) => {
    fetch('https://apisms.my.id/userlogin.php', {
        method:'POST',
        headers: {
            'User-Agent': ua.chrome.androidPhone({
                version: "61.0.0",
                androidVersion: "7.1.2",
                device: "Nexus 6"
              }),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'apisms.my.id',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip'
        },
        body: `username=${username}&password=apisms123`
    })
    .then( res => {
        const cookie = res.headers.raw()['set-cookie'];
        resolve(cookie)
    })
    .catch(err => reject(err))
})

const getApi = (cookie) => new Promise((resolve, reject) => {
    fetch('https://apisms.my.id/profil.php', {
        method:'POST',
        headers: {
            'User-Agent': ua.chrome.androidPhone({
                version: "61.0.0",
                androidVersion: "7.1.2",
                device: "Nexus 6"
              }),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'apisms.my.id',
            'Connection': 'keep-alive',
            'Cookie': `${cookie}`,
            'Accept-Encoding': 'gzip'
        },
    })
    .then( res => res.text())
    .then( result => {
        const $ = cheerio.load(result);
        const resText = $('input[name=api]').val();
        resolve(resText);
    })
    // .then(result => resolve(result))
    .catch(err => reject(err))
})

const apisms = (api, pesan, nohp) => new Promise((resolve, reject) => {
    const url = 'https://apisms.my.id/api/sms.php';
    const params = new URLSearchParams;
    params.append('api', `${api}`);
    params.append('pesan', pesan);
    // params.append('tujuan', '082226096073');
    params.append('tujuan', nohp)
    params.append('paket', 'BIASA');
    fetch(url, {
        method: 'POST',
        headers: {
            'User-Agent': ua.chrome.androidPhone({
                version: "61.0.0",
                androidVersion: "7.1.2",
                device: "Nexus 6"
              }),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'apisms.my.id',
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip'
        },
        body: params

    })
    .then( res => res.json())
    .then( result => resolve(result))
    .catch(err => reject(err))
});

module.exports = {
    Register,
    apisms,
    ceklogin,
    getCookie,
    getApi,
}