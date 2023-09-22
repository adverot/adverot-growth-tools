import legit from 'legit';
import { ping } from 'smtp-ping';

export const handler = async (event, context) => {
    const mails = event.multiValueQueryStringParameters.mails;
    const domain = event.multiValueQueryStringParameters.domain;
    let mxStatus = '';
    let theMail = '';

    try {
        const legitData = await legit('adrien.verot@' + domain);
        if (!legitData.isValid || legitData.mxArray.length === 0) {
            mxStatus = 'NO_MX';
        } else {
            const pingData = await ping('adrien.verot@' + domain);
            if (pingData.status !== 'INVALID') {
                mxStatus = 'ACCEPT_ALL';
            } else {
                mxStatus = 'OK';
                for (let mail of mails) {
                    try {
                        const pingData = await ping(mail + '@' + domain);
                        if(pingData.status === 'OK') {
                            theMail = mail + '@' + domain;
                            break;
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

    return {
        statusCode: 200,
        body: JSON.stringify({
            mxStatus: mxStatus,
            mail: theMail
        })
    }
}