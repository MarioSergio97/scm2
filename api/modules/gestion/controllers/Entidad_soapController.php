<?php
/**
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\controllers;

use common\controllers\SecureController;
use api\modules\gestion\models\Entidad;

class Entidad_soapController extends SecureController
{

    /** @var bool */
    public $enableCsrfValidation = false;

    /**
     * {@inheritdoc}
     */
    public $modelClass = 'api\modules\gestion\models\Entidad';


    public function behaviors()
    {
        $array = parent::behaviors();
        $array['authenticator']['except'] = ['entidad_data'];
        return $array;
    }
    /**
     * {@inheritdoc}
     * redefine las acciones restful de la controladora
     */
    public function actions()
    {
        return [
            'entidad_data' => [
                'class' => 'mongosoft\soapserver\Action',
                'classMap' => ['Entidad' => 'api\modules\gestion\models\Entidad'],
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
     * Simple test which returns a List of entidad in order to see how the wsdl pans out
     * @param [] $params
     * @return object[]
     * @soap
     */

    public function entidad_list()
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Entidad::list_model($params));
    }

    /**
     * Simple test which returns a data of entidad  with id in order to see how the wsdl pans out
     * @param int $id
     * @return api\modules\gestion\models\Entidad
     * @soap
     */
    public function entidad_view($id)
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Entidad::view($id, $params));
    }
}
