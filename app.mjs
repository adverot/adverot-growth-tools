import buildMails from './utils/buildMails.js';
import removeAccents from './utils/removeAccents.js';

document.getElementById('email-checker').addEventListener('submit', async (event) => {
    event.preventDefault();
    const zoneResultat = document.getElementById('resultat');
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const domain = document.getElementById('domaine').value;
    zoneResultat.innerText = '';
    let message = '';
    const mails = buildMails(removeAccents(prenom), removeAccents(nom));
    const mailsQuery = mails.map(mail => `mails=${encodeURIComponent(mail)}`).join('&');
    const url = `http://localhost:8888/.netlify/functions/findMail?${mailsQuery}&domain=${encodeURIComponent(domain)}`;
    const response = await fetch(url).then(response => response.json());
    switch (response.mxStatus) {
        case 'NO_MX':
            message = `Le domaine ${domain} n'a pas d'enregistrement MX valide.`
            break;
        case 'ACCEPT_ALL':
            message = `Le domaine ${domain} est paramétré en Accept All.`
            break;
        case 'OK':
            message = response.mail;
            break;
        default:
            message = '!! ERREUR !!'
    }
    zoneResultat.innerText = message;
});