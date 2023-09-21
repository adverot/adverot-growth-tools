import legit from 'legit';

export default async function checkDomain(domain) {
    try {
        const legitData = await legit('adrien.verot@' + domain);
        if (!legitData.isValid) {
            return 'NO_MX';
        } else {
            const pingData = await ping('adrien.verot@' + domain);
            if (pingData.status !== 'INVALID') {
                return 'ACCEPT_ALL';
            } else {
                return 'OK';
            }
        }
    } catch (error) {
        console.log(error)
    }
}