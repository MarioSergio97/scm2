<?php

/* @var $this yii\web\View */
/* @var $user \common\modules\seguridad\models\Usuario */


$verifyLink = Yii::$app->urlManager->createAbsoluteUrl(['site/verify-email', 'token' => $user->authkey]);
?>
Hello <?= $user->email ?>,

    <p>Siga el link de abajo para realizar la activación:</p>

<?= $verifyLink ?>

