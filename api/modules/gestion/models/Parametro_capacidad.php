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
 * Este es la clase modelo para la tabla parametro_capacidad.
 *
 * Los siguientes son los campos de la tabla 'parametro_capacidad':
 * @property integer $id_parametro
 * @property string $nombre
 * @property float $valor
 * @property integer $id_capacidad

 * Los siguientes son las relaciones de este modelo :

 * @property Capacidad $capacidad
 */

class Parametro_capacidad extends RestModel 
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
    protected $primaryKey = 'id_parametro';

    const MODEL = 'Parametro_capacidad';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'parametro_capacidad';
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
       const RELATIONS = ['capacidad'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_parametro';

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
			[['nombre','valor','id_capacidad'],'required','on'=>['create','default']],
			[['id_parametro'],'required', 'on' => 'update'],
			[['id_parametro','id_capacidad'],'integer'],
			[['valor'],'number'],
			[['valor'],'safe'],
			[['nombre'], 'string', 'max'=>50],
			[['id_parametro'], 'unique' , 'on' => 'create'],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo for??neo id_capacidad
     */
	  public function getCapacidad()
		{
			return $this->hasOne(Capacidad::class, ['id_capacidad' => 'id_capacidad']);
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
        $select = ['*', 'parametro_capacidad.id_parametro as id', 'parametro_capacidad.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('parametro_capacidad.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
