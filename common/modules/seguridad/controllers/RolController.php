<?php
/**
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace common\modules\seguridad\controllers;


use common\controllers\RestController;
use common\modules\seguridad\services\RolService;
use yii\helpers\Url;
use yii\filters\Cors;
use common\modules\seguridad\models\Rol;
use yii\web\ServerErrorHttpException;

class RolController extends RestController
{
    /**
     * {@inheritdoc}
     */
    public $service ;
    public $modelClass = 'common\modules\seguridad\models\Rol';


    public function behaviors()
    {
        $array= parent::behaviors();
        $array['authenticator']['except']= ['index','create', 'update', 'delete', 'view', 'select_2_list', 'validate', 'delete_parameters', 'delete_by_id','update_multiple'];
        $array['cors']=[
            'class' => Cors::class,
            'actions' => [
                'your-action-name' => [
                    #web-servers which you alllow cross-domain access
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['POST','OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => null,
                    'Access-Control-Max-Age' => 86400,
                    'Access-Control-Expose-Headers' => [],
                ]
            ],
        ];
        return $array;
    }

    protected function verbs()
    {
        $array= [];
        return array_merge(parent::verbs(),$array);
    }
   public function getService()
    {
        if ($this->service == null)
            $this->service = new RolService();
        return $this->service;
    }

}
