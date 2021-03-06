<?php
/**
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\controllers;

use common\controllers\SecureController;
use api\modules\gestion\models\Scm;

class Scm_soapController extends SecureController
{

    /** @var bool */
    public $enableCsrfValidation = false;

    /**
     * {@inheritdoc}
     */
    public $modelClass = 'api\modules\gestion\models\Scm';


    public function behaviors()
    {
        $array = parent::behaviors();
        $array['authenticator']['except'] = ['scm_data'];
        return $array;
    }
    /**
     * {@inheritdoc}
     * redefine las acciones restful de la controladora
     */
    public function actions()
    {
        return [
            'scm_data' => [
                'class' => 'mongosoft\soapserver\Action',
                'classMap' => ['Scm' => 'api\modules\gestion\models\Scm'],
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
     * Simple test which returns a List of scm in order to see how the wsdl pans out
     * @param [] $params
     * @return object[]
     * @soap
     */

    public function scm_list()
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Scm::list_model($params));
    }

    /**
     * Simple test which returns a data of scm  with id in order to see how the wsdl pans out
     * @param int $id
     * @return api\modules\gestion\models\Scm
     * @soap
     */
    public function scm_view($id)
    {
        $params=[];
        if (func_get_args())
            $params = func_get_args()[0]['params'];
        return $this->encode_result(Scm::view($id, $params));
    }
}
