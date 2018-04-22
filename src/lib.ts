import { getCryptoUSDValue } from 'get-crypto-fiat-values'
import * as mailgun from 'mailgun-js'
import * as currencyConvert from 'currency-convert'

const {
    CURRENCIES,
    EMAIL_TARGET,
    MAILGUN_DOMAIN,
    MAILGUN_KEY,
} = process.env

export const main = async () => {
    const result:number = await getCryptoUSDValue(CURRENCIES || '') || -1

    var formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
    })
      

    const dkkAmount = await currencyConvert(result, 'USD', 'DKK')
    const formattedAmmount: string = formatter.format(dkkAmount)
    
    const literalPrice: string = `${CURRENCIES} is at ${formattedAmmount} DKK`

    const mailgunInstance = mailgun({
        apiKey: MAILGUN_KEY || '',
        domain: MAILGUN_DOMAIN || ''
    })

    console.log(literalPrice)

    // const oMessageData: any = {
    //     from: `crypto-ticker <noreply@fake.email>`,
    //     to: `${EMAIL_TARGET} <${EMAIL_TARGET}>`,
    //     subject: literalPrice,
    //     text: literalPrice,
    //     html: literalPrice
    // }

    // mailgunInstance.messages().send(oMessageData, (err, body) => {
    //     if (body) {
    //         console.log('mail sent Ok ')
    //     }
    //     if (err) {
    //         console.log('err sending mail, ', err)
    //     }
    // })
}