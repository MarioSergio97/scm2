<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\nomencladores\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Proceso;
/**
 * Este es la clase modelo para la tabla tipo_proceso.
 *
 * Los siguientes son los campos de la tabla 'tipo_proceso':
 * @property integer $id_tipo_proceso
 * @property string $nombre
 * @property string $descripcion

 * Los siguientes son las relaciones de este modelo :

 * @property Proceso[] $arrayproceso
 */

class Tipo_proceso extends RestModel 
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
    protected $primaryKey = 'id_tipo_proceso';

    const MODEL = 'Tipo_proceso';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tipo_proceso';
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
       const RELATIONS = ['arrayproceso'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_tipo_proceso';

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
			[['nombre','descripcion'],'required','on'=>['create','default']],
			[['id_tipo_proceso'],'required', 'on' => 'update'],
			[['id_tipo_proceso'],'integer'],
			[['nombre'], 'string', 'max'=>50],
			[['descripcion'], 'string', 'max'=>65535],
			[['id_tipo_proceso'], 'unique' , 'on' => 'create'],
        ];
    }

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_tipo_proceso
     */
	  public function getArrayproceso()
		{
			return $this->hasMany(Proceso::class, ['id_tipo_proceso' => 'id_tipo_proceso']);
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
        $select = ['*', 'tipo_proceso.id_tipo_proceso as id', 'tipo_proceso.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('tipo_proceso.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
