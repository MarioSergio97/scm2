<?php
/**
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\seguridad\controllers;

use common\controllers\SecureController;
use common\modules\seguridad\models\Usuario;

class Usuario_soapController extends SecureController
{

    /** @var bool */
    public $enableCsrfValidation = false;

    /**
     * {@inheritdoc}
     */
    public $modelClass = 'common\modules\seguridad\models\Usuario';


    public function behaviors()
    {
        $array = parent::behaviors();
        $array['authenticator']['except'] = ['usuario_data'];
        return $array;
    }
    /**
     * {@inheritdoc}
     * redefine las acciones restful de la controladora
     */
    public function actions()
    {
        return [
            'usuario_data' => [
                'class' => 'mongosoft\soapserver\Action',
                'classMap' => ['Usuario' => 'common\modules\seguridad\models\Usuario'],
                'serviceOptions' => [
                    'disableWsdlMode' => true,
                ]
            ],
        ];
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        parent::checkAccess($action, $model, $params); // TODO: Change the autogenerated stub
    }


    public function encode_result($result)
    {
        $encode = false;
        if (strpos(\Yii::$app->getRequest()->contentType, "application/json") !== false)
            $encode = true;
        if ($encode)
            return json_encode($result, JSON_UNESCAPED_UNICODE);
        return $result;
    }

    /**
     * Simple test which returns a List of usuario in order to see how the wsdl pans out
     * @param [] $params
     * @return object[]
     * @soap
     */

    public function usuario_list()
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Usuario::list_model($params));
    }

    /**
     * Simple test which returns a data of usuario  with id in order to see how the wsdl pans out
     * @param int $id
     * @return common\modules\seguridad\models\Usuario
     * @soap
     */
    public function usuario_view($id)
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Usuario::view($id, $params));
    }
}
