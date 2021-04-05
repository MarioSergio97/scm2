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
 * Este es la clase modelo para la tabla interrelacion.
 *
 * Los siguientes son los campos de la tabla 'interrelacion':
 * @property integer $id_interrelacion
 * @property float $procesamiento
 * @property float $rendimiento
 * @property float $equivalencia
 * @property float $perdida
 * @property float $perdida_final
 * @property integer $id_proceso

 * Los siguientes son las relaciones de este modelo :

 * @property Proceso $proceso
 */

class Interrelacion extends RestModel 
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
    protected $primaryKey = 'id_interrelacion';

    const MODEL = 'Interrelacion';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'interrelacion';
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

       const PKEY = 'id_interrelacion';

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
			[['procesamiento','rendimiento','equivalencia','perdida','perdida_final','id_proceso'],'required','on'=>['create','default']],
			[['id_interrelacion'],'required', 'on' => 'update'],
			[['id_interrelacion','id_proceso'],'integer'],
			[['procesamiento','rendimiento','equivalencia','perdida','perdida_final'],'number'],
			[['procesamiento','rendimiento','equivalencia','perdida','perdida_final'],'safe'],
			[['id_interrelacion','id_proceso'], 'unique' , 'on' => 'create'],
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
        $select = ['*', 'interrelacion.id_interrelacion as id', 'interrelacion.id_interrelacion as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('interrelacion.id_interrelacion LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
