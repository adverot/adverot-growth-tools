import buildMails from './utils/buildMails.js';
import removeAccents from './utils/removeAccents.js';

document.getElementById('email-checker').addEventListener('submit', (event) => {
    event.preventDefault();
    const zoneResultat = document.getElementById('resultat');
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const domain = document.getElementById('domaine').value;
    zoneResultat.innerText = '';
    const mails = buildMails(removeAccents(prenom), removeAccents(nom));
    console.log(mails);
});