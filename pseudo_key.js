var CryptoJS = require("crypto-js");
var readlineSync = require('readline-sync');
const fs = require('fs-extra');
const key_hash = readlineSync.question("Indiquez la clé hashée : \n>> ");
const pseudo = readlineSync.question("Indiquez votre pseudo : \n>>")
var bytes  = CryptoJS.AES.decrypt(key_hash, pseudo);
var decrypt = bytes.toString(CryptoJS.enc.Utf8);
var result = {
    "key": `${decrypt}`
    }
let data = JSON.stringify(result);
fs.writeFileSync('cle_unhash.json', data);
console.log("Clé disponnible dans le fichier. Pour plus de sécurité, pensez à supprimer le contenu de ce dernier après utilisation.")