const fetch = require ('node-fetch');
const readlineSync = require ('readline-sync');
const { URLSearchParams } = require ('url');
const register = require('./bin/apisms');

(async () => {
    try{
        // const Username  = readlineSync.question('username : ');
        // const Password  = readlineSync.question('Password : ');
        // const Email     = readlineSync.question('Email : ');
        // const Nohp      = readlineSync.question('Nohp : ');
        const daftar  = await  register.Register();
        const getUsername = daftar.split(' ')[1];
        // console.log(getUsername);
        const login  = await  register.ceklogin(getUsername);
        // console.log(login)
        const cookie  = await  register.getCookie(getUsername);
        const Cookie = cookie[0].split(';')[0];
        // console.log(Cookie);
        const getApi  = await  register.getApi(Cookie);
        // console.log(getApi);


        const Pesan = readlineSync.question('Isi Pesan : ');
        const Nohp   = readlineSync.question('No Tujuan : ');
        const kirimpesan = await register.apisms(getApi, Pesan, Nohp);
        console.log(kirimpesan);
    }catch(e){
        console.log(e)
    }
})();
