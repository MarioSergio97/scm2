<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\produccion\models;
use Yii;
use common\models\RestModel;

use api\modules\nomencladores\models\Unidad_medida;
use api\modules\gestion\models\Proceso;
/**
 * Este es la clase modelo para la tabla producto.
 *
 * Los siguientes son los campos de la tabla 'producto':
 * @property integer $id_producto
 * @property string $nombre
 * @property integer $id_um

 * Los siguientes son las relaciones de este modelo :

 * @property Unidad_medida $um
 * @property Proceso[] $arrayproceso
 */

class Producto extends RestModel 
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
    protected $primaryKey = 'id_producto';

    const MODEL = 'Producto';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'producto';
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
       const RELATIONS = ['um','arrayproceso'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_producto';

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
			[['nombre','id_um'],'required','on'=>['create','default']],
			[['id_producto'],'required', 'on' => 'update'],
			[['id_producto','id_um'],'integer'],
			[['nombre'], 'string', 'max'=>50],
			[['id_producto'], 'unique' , 'on' => 'create'],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_um
     */
	  public function getUm()
		{
			return $this->hasOne(Unidad_medida::class, ['id_um' => 'id_um']);
		}


	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_producto
     */
	  public function getArrayproceso()
		{
			return $this->hasMany(Proceso::class, ['id_producto' => 'id_producto']);
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
        $select = ['*', 'producto.id_producto as id', 'producto.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('producto.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
