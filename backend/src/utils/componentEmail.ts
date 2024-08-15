const nodemailer = require("nodemailer");

async function enviandoEmail(transporterConfig: any, emailRemetente: string, assunto: string, mensagem: string, emailRecebedor: any[], nomeRecebedor: any[]): Promise<any> {
    try{
        for (let i = 0; i < emailRecebedor.length; i++) {
            const email = emailRecebedor[i];
            const nome = nomeRecebedor[i];
            let transporter = nodemailer.createTransport(transporterConfig);

            // Enviando o e-mail
            let info = await transporter.sendMail({
                from: `${nome} <${emailRemetente}>`,
                to: email,
                subject: assunto,
                html: `<p>Olá ${nome},</p><p>${mensagem}</p>`
            });
    
            return 'Sucesso';
        }
        
    }catch (error){
        return (error as Error).toString();
    }
}

module.exports = { enviandoEmail };


/*   transporterConfig = {
                host: "SMTP.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: emailRemetente,
                    pass: senhaRemetente,
                }
            };

    transporterConfig = {
                service: 'gmail',
                auth: {
                    user: emailRemetente,
                    pass: senhaRemetente,
                }
            };
*/
export {};
