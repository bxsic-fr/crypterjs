var CryptoJS = require("crypto-js");    // pkg node & init
var srs = require('secure-random-string');
const key = srs();
const fs = require('fs-extra');
var isDirectory = require('isdir-async');
const ora = require('ora');
const readlineSync = require('readline-sync');
const spinner = ora().start();
const pseudokey = "VOTRE PSEUDO";
var now = new Date();                   // date
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();
var seconde = now.getSeconds();
console.log("CRYPTER - BXSIC")
var confirm = readlineSync.question('Souhaitez-vous réellement chiffrer vos données ? oui/non \n>> ');  // confirmation
if(confirm == "oui"){
    var mdp_confirm = readlineSync.question("\nSaisissez votre mot de passe : \n>> ");
    if(mdp_confirm == "mdp"){
        spinner.succeed("Script lancé avec succès, veuillez patienter...");
        var fichier_key = "keys.txt";
        var key1 = CryptoJS.AES.encrypt(key, pseudokey).toString();
        fs.appendFileSync(fichier_key, jour + '/' + mois + '/' + annee + '@' + heure + ':' + minute + ':' + seconde + ' | key : ' + key1 + `\n`);
        spinner.info("Clé de chiffrement sauvegardée dans : " + fichier_key + ", ces données sont elles mêmes chiffrées avec votre identifiant en tant que key.");
        spinner.succeed("Clé sauvegardée avec succès !");
        spinner.info("Collez le chemin d'accès au dossier ici :");
        const path = readlineSync.question("Path : ");
        var dossier = path;
        const doslist = fs.readdirSync(dossier);
        console.log("Chiffrement :")
            for(var i=0 in doslist) {
                var idos = doslist[i];
                var fich = dossier + '/' + idos;
                var stats = fs.statSync(fich);
                if(stats.isDirectory()) {
                    console.log("------------ \nFichier : non " + "\n DOSSIERS NON PRIS EN CHARGE ------------");}
                else{
                    console.log("------------ \nFichier : oui" + "\nNom : " + fich + '\n------------')
                    const crypt = CryptoJS.AES.encrypt(fs.readFileSync(fich, 'utf8'), key).toString();
                    fs.writeFileSync(fich, crypt, 'utf8');}
        }
        console.log()
        spinner.succeed("Chiffrement terminé !");
            const list = readlineSync.question("Souhaitez vous afficher la liste des fichiers affectés ? oui/non\n>>");
            if(list == "oui"){
                console.log(doslist)
            }else{
                spinner.warn("Fin du programme.")
                process.exit();}
    }else{spinner.warn("Mauvais mot de passe, réessayez en relançant le script.");} //si mauvais mdp

} else {spinner.info('Arrêt du processus en cours...') //si confirmation!="oui"
    process.exit();}
