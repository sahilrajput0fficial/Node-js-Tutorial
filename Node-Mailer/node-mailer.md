step 1 : 
install nodemailer for sending mails

step 2:
create a app password from accounts.google.com

step 3:
'''
make a transporter 
// transporter = nodemailer.createTransporter({
//     "service":"gmail",{
//         "user":"emial",
//         "pass":"app password"
//     }
 })
'''

step 4:
make a mailOptions object containing from , to , subject , body

step 5:
use transporter.sendMailer(mailOptions , callback())

step 6:
pass err, info in callback 
