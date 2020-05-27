var CryptoJS = require("crypto-js");    // pkg node & init
var nanoid = require('nanoid');
const fs = require('fs-extra');
var isDirectory = require('isdir-async');
const ora = require('ora');
const readlineSync = require('readline-sync');
const spinner = ora().start();

const motdepasse = "VOTRE MOT DE PASSE";

var now = new Date();                   // date
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();
var seconde = now.getSeconds();
var confirm = readlineSync.question('Souhaitez-vous réellement déchiffrer vos données ? oui/non \n>> ');  // confirmation
if(confirm == "oui"){
    var mdp_confirm = readlineSync.question("\nSaisissez votre mot de passe : \n>> ");
    if(mdp_confirm == motdepasse){
        spinner.succeed("Script lancé avec succès, veuillez patienter...");
        spinner.warn("ATTENTION; VEUILLEZ RENSEIGNER LA CLÉ, UTILISEZ LA BONNE OU VOS DONNÉES SERONT INUTILISABLE")
        const key = readlineSync.question(">> ")
        spinner.info("Collez le chemin d'accès au dossier ici :");
        const path = readlineSync.question("Path : ");
        var dossier = path;
        const doslist = fs.readdirSync(dossier);
        console.log("Déchiffrement :")
            for(var i=0 in doslist) {
                var idos = doslist[i];
                var fich = dossier + '/' + idos;
                var stats = fs.statSync(fich);
                if(stats.isDirectory()) {
                    console.log("------------ \nFichier : non " + "\n DOSSIERS NON PRIS EN CHARGE ------------");}
                else{
                    console.log("------------ \nFichier : oui" + "\nNom : " + fich + '\n------------')
                    var crypt = fs.readFileSync(fich, 'utf8');
                    var bytes  = CryptoJS.AES.decrypt(crypt, key);
                    var decrypt = bytes.toString(CryptoJS.enc.Utf8);
                    fs.writeFileSync(fich, decrypt, 'utf8');}
                }
        console.log()
        spinner.succeed("Déchiffrement terminé !");
            const list = readlineSync.question("Souhaitez vous afficher la liste des fichiers affectés ? oui/non\n>>");
            if(list == "oui"){
                console.log(doslist)
            }else{
                spinner.warn("Fin du programme.")
                process.exit();}
    }else{spinner.warn("Mauvais mot de passe, réessayez en relançant le script.");} //si mauvais mdp

} else {spinner.info('Arrêt du processus en cours...') //si confirmation!="oui"
    process.exit();}
