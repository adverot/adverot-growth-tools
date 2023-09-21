import legit from 'legit';
import { ping } from 'smtp-ping';

export default async function findMail(mails, domain) {
    try {
        const legitData = await legit('adrien.verot@' + domain);
        if (!legitData.isValid) {
            return `Pas d'enreistrement MX valide pour le domaine ${domain}.`;
        } else {
            const pingData = await ping('adrien.verot@' + domain);
            if (pingData.status !== 'INVALID') {
                return `Le domaine ${domain} est paramétré en Accept All.`;
            } else {
                for (let mail in mails) {
                    try {
                        const pingData = await ping(mail + '@' + domain);
                        if(pingData.status === 'OK') {
                            return mail + '@' + domain;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}