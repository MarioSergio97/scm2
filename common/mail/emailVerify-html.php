<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user \common\modules\seguridad\models\Usuario */

$verifyLink = Yii::$app->urlManager->createAbsoluteUrl(['site/verify-email', 'token' => $user->authkey]);
?>
<div class="verify-email">
    <p>Hello <?= Html::encode($user->email) ?>,</p>

    <p>Siga el link de abajo para realizar la activación:</p>

    <p><?= Html::a(Html::encode($verifyLink), $verifyLink) ?></p>
</div>

