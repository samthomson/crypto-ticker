import { getCryptoUSDValue } from 'get-crypto-fiat-values'
import * as mailgun from 'mailgun-js'

const {
    CURRENCIES,
    EMAIL_TARGET,
    MAILGUN_DOMAIN,
    MAILGUN_KEY,
} = process.env

console.log('EMAIL_TARGET', EMAIL_TARGET)
console.log('CURRENCIES', CURRENCIES)

const dryrun = async () => {
    const result:number = await getCryptoUSDValue(CURRENCIES || '') || -1

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
      
      const formattedDollarAmmount: string = formatter.format(result); /* $2,500.00 */

    const literalPrice: string = `${CURRENCIES} value is ${formattedDollarAmmount}`

    const mailgunInstance = mailgun({
        apiKey: MAILGUN_KEY || '',
        domain: MAILGUN_DOMAIN || ''
    })
    const oMessageData: any = {
        from: `${EMAIL_TARGET} <${EMAIL_TARGET}>`,
        to: `${EMAIL_TARGET} <${EMAIL_TARGET}>`,
        subject: literalPrice,
        text: literalPrice,
        html: literalPrice
    }

    mailgunInstance.messages().send(oMessageData, (err, body) => {
        if (body) {
            console.log('mail sent Ok ', body)
        }
        if (err) {
            console.log('err sending mail, ', err)
        }
    })
}

dryrun()