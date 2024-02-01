const nodemailer = require('nodemailer')
var html =  ` <h2>Confirmação de Sucesso no Envio de Email via Nodemailer</h2>

<p>Prezado Pedro,</p>

<p>Espero que este email o encontre bem. Gostaria de informar que o envio do email utilizando o Nodemailer foi um sucesso!</p>

<p>Todos os destinatários receberam a mensagem conforme o esperado, e não houve problemas técnicos durante o processo. A integração do Nodemailer mostrou-se eficiente e confiável, garantindo que a comunicação ocorresse de maneira suave.</p>

<p>Caso haja alguma dúvida ou se precisar de mais informações sobre o processo de envio, estou à disposição para ajudar. Agradeço pela colaboração e pelo empenho nesse projeto.</p>

<p>Atenciosamente,</p>

<p>[Seu Nome]<br>
    [Seu Cargo]<br>
    [Seu Email]<br>
    [Seu Número de Contato]</p>`

function transporter(){
    const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",

        starttls: {
            enable: true
        },
        secureConnection: true,
        auth:{
            user: "postmaster@sandbox780be8a824244da19de50eefc08db83b.mailgun.org",
            pass: "33fc99e07f896c3f6dd42b35062ad89a-69a6bd85-bfba9df7"
        },
        port: 587,
      

    }
    
    )
    return transporter
}
async function sendEmail(html, ){

}
const trans = transporter()
trans.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var message = {
        
    
    to: "phbm@poli.br",
    subject: "Confirmação de email na plataforma",
    text: "Confirmar email",
    html:` <h2>Confirmação de Email</h2>

    <p>Obrigado por se cadastrar! Para confirmar seu email, clique no link abaixo:</p>

   
    <p style="margin-top: 20px;">Se você não se cadastrou no nosso site, por favor, ignore este email.</p>
`,
  };

  trans.sendMail(message, function (err, info) {
    if (err) {
        console.log(err);
        return ('Error while sending email' + err)
    }
    else {
        console.log("Email sent");
        return ('Email sent')
    }
});