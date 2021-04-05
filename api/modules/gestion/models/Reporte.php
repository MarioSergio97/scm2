<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\models;
use Yii;
use common\models\RestModel;

/**
 * Este es la clase modelo para la tabla reporte.
 *
 * Los siguientes son los campos de la tabla 'reporte':
 * @property integer $id_reporte
 * @property float $lanzamiento
 * @property float $entregado
 * @property integer $id_proceso

 * Los siguientes son las relaciones de este modelo :

 * @property Proceso $proceso
 */

class Reporte extends RestModel 
{

    /**
     * The number of models to return for pagination.
     *
     * @var int
     */
    protected $perPage = 15;

    /**
     * The primarykey associated with the table-model.
     *
     * @var integer
     */
    protected $primaryKey = 'id_reporte';

    const MODEL = 'Reporte';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'reporte';
    }

     
        /**
     *
     * The names of the hidden fields.
     *
     * @var array
     */
    const HIDE = [];
    /**

     * The names of the relation tables.
     *
     */
       const RELATIONS = ['proceso'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_reporte';

     /*
     * @return \yii\db\Connection the database connection used by this AR class.
     */
    public static function getDb()
    {
        return Yii::$app->get('db');
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
			[['lanzamiento','entregado','id_proceso'],'required','on'=>['create','default']],
			[['id_reporte'],'required', 'on' => 'update'],
			[['id_reporte','id_proceso'],'integer'],
			[['lanzamiento','entregado'],'number'],
			[['lanzamiento','entregado'],'safe'],
			[['id_reporte','id_proceso'], 'unique' , 'on' => 'create'],
            [['id_proceso'], 'unique' , 'on' => 'update','when' =>function ($model, $value) {
                $elem = self::find()->where([$value => $model[$value]])->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_proceso
     */
	  public function getProceso()
		{
			return $this->hasOne(Proceso::class, ['id_proceso' => 'id_proceso']);
		}

 /**
     * Get the list model with select2 schema.
     * @var $relation array
     * @var $parameters array
     * @return array|mixed
     */
    static function select_2_list($parameters = [])
    {
        $parameters = get_called_class()::parameters_request($parameters);
        $like = '';
        if (isset($_GET['q']))
            $like = $_GET['q'];
        else
            if (isset($parameters->q))
                $like = $parameters->q;
        $query = get_called_class()::query_list($parameters);
        get_called_class()::process_find_parameters($query, $parameters);
        $select = ['*', 'reporte.id_reporte as id', 'reporte.id_reporte as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('reporte.id_reporte LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
