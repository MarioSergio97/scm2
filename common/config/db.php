<?php

/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
(new Dotenv\Dotenv(__DIR__ . '/../'))->load();

   return [
        'class' => 'yii\db\Connection',
        'dsn' => 'mysql:host='.getenv('server_scm').';port='.getenv('port_scm').';dbname='.getenv('db_scm').'',
        'username' => getenv('user_scm'),
        'password' => getenv('password_db_scm'),
        'charset' => 'utf8',
        'tablePrefix' => '',
    ];


