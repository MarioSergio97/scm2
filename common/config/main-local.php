<?php
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
return [
    'components' => [
           'mailer' => [
               'class' => 'yii\swiftmailer\Mailer',
               'transport' => [
                   'class' => 'Swift_SmtpTransport',
                   'host' => 'localhost',  // ej. smtp.mandrillapp.com o smtp.gmail.com
                   'username' => getenv('email_username'),
                   'password' => getenv('email_password'),
                   'port' => '25', // El puerto 25 es un puerto comun tambien
               ],
           ],
        'db' => require(__DIR__ . '/db.php'),
        
    ],
];

