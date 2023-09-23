import buildMails from './utils/buildMails.js';
import removeAccents from './utils/removeAccents.js';

document.getElementById('email-checker').addEventListener('submit', async (event) => {
    event.preventDefault();
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8888/.netlify/functions/findMail' : 'https://adverot-growth-tools.netlify.app/.netlify/functions/findMail';
    const resultat = document.getElementById('resultat');
    const prenom = document.getElementById('prenom').value;
    const nom = document.getElementById('nom').value;
    const domain = document.getElementById('domaine').value;
    resultat.innerText = '';
    resultat.className = 'spinner-border';
    let message = '';
    let alertType = '';
    const domainPattern = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!domainPattern.test(domain)) {
        message = "Domaine invalide";
        alertType = 'alert-secondary';
    } else {
        const mails = buildMails(removeAccents(prenom), removeAccents(nom));
        const mailsQuery = mails.map(mail => `mails=${encodeURIComponent(mail)}`).join('&');
        const url = `${baseUrl}?${mailsQuery}&domain=${encodeURIComponent(domain)}`;
        const response = await fetch(url).then(response => response.json());
        switch (response.mxStatus) {
            case 'NO_MX':
                message = `Le domaine ${domain} n'a pas d'enregistrement MX valide.`;
                alertType = 'alert-danger';
                break;
            case 'ACCEPT_ALL':
                message = `Le domaine ${domain} est paramétré en Accept All.`
                alertType = 'alert-warning'
                break;
            case 'OK':
                message = response.mail !== '' ? response.mail : "Pas d'adresse mail trouvée";
                alertType = response.mail !== '' ? 'alert-success' : 'alert-dark';
                break;
            default:
                message = '!! ERREUR !!'
                alertType = 'alert-dark'
        }
    }
    resultat.className = 'w-100 text-center alert ' + alertType;
    resultat.innerText = message;
});