<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\produccion\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Proceso;
/**
 * Este es la clase modelo para la tabla incidencia.
 *
 * Los siguientes son los campos de la tabla 'incidencia':
 * @property integer $id_incidencia
 * @property string $descripcion
 * @property date $fecha_registro
 * @property integer $id_proceso

 * Los siguientes son las relaciones de este modelo :

 * @property Proceso $proceso
 */

class Incidencia extends RestModel 
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
    protected $primaryKey = 'id_incidencia';

    const MODEL = 'Incidencia';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'incidencia';
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

       const PKEY = 'id_incidencia';

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
			[['descripcion','fecha_registro','id_proceso'],'required','on'=>['create','default']],
			[['id_incidencia'],'required', 'on' => 'update'],
			[['id_incidencia','id_proceso'],'integer'],
			[['fecha_registro'],'safe'],
			['fecha_registro','format_fecha_registro'],
			[['descripcion'], 'string', 'max'=>65535],
			[['id_incidencia'], 'unique' , 'on' => 'create'],
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
        $select = ['*', 'incidencia.id_incidencia as id', 'incidencia.id_incidencia as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('incidencia.id_incidencia LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha_registro(){
        $timestamp = str_replace('/', '-', $this->fecha_registro);
        $this->fecha_registro = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
