<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\models;
use Yii;
use common\models\RestModel;

use api\modules\produccion\models\Producto;
use api\modules\nomencladores\models\Tipo_proceso;
use api\modules\produccion\models\Incidencia;
/**
 * Este es la clase modelo para la tabla proceso.
 *
 * Los siguientes son los campos de la tabla 'proceso':
 * @property integer $id_proceso
 * @property integer $numero
 * @property string $nombre
 * @property string $descripcion
 * @property float $costo_proceso
 * @property float $costo_gestion
 * @property float $costo_inventario
 * @property float $porciento_demanda_total
 * @property float $capacidad
 * @property integer $ciclo_proceso
 * @property integer $procesos_sucesores
 * @property float $it_lanzamiento
 * @property float $porciento_satisfaccion
 * @property integer $id_scm
 * @property integer $id_tipo_proceso
 * @property integer $id_entidad
 * @property integer $id_producto
 * @property date $fecha_registro

 * Los siguientes son las relaciones de este modelo :

 * @property Entidad $entidad
 * @property Producto $producto
 * @property Scm $scm
 * @property Tipo_proceso $tipo_proceso
 * @property Capacidad[] $arraycapacidad
 * @property Incidencia[] $arrayincidencia
 * @property Interrelacion[] $arrayinterrelacion
 * @property Reporte[] $arrayreporte
 */

class Proceso extends RestModel 
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
    protected $primaryKey = 'id_proceso';

    const MODEL = 'Proceso';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'proceso';
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
       const RELATIONS = ['entidad','producto','scm','tipo_proceso','arraycapacidad','arrayincidencia','arrayinterrelacion','arrayreporte'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_proceso';

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
			[['numero','nombre','descripcion','id_scm','id_tipo_proceso','id_entidad','id_producto','fecha_registro'],'required','on'=>['create','default']],
			[['id_proceso'],'required', 'on' => 'update'],
			[['id_proceso','numero','ciclo_proceso','procesos_sucesores','id_scm','id_tipo_proceso','id_entidad','id_producto'],'integer'],
			[['costo_proceso','costo_gestion','costo_inventario','porciento_demanda_total','capacidad','it_lanzamiento','porciento_satisfaccion'],'number'],
			[['costo_proceso','costo_gestion','costo_inventario','porciento_demanda_total','capacidad','it_lanzamiento','porciento_satisfaccion'],'safe'],
			[['fecha_registro'],'safe'],
			['fecha_registro','format_fecha_registro'],
			[['nombre'], 'string', 'max'=>50],
			[['descripcion'], 'string', 'max'=>65535],
			[['id_proceso'], 'unique' , 'on' => 'create'],
            [['nombre','id_scm'], 'unique', 'targetAttribute' => ['nombre','id_scm'],'on' => ['create','default']],
            [['nombre','id_scm'], 'unique', 'targetAttribute' => ['nombre','id_scm'],'on' => 'update','when'=> function ($model) {
                $elem = self::find()->where($model->getAttributes(['nombre','id_scm']))->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_entidad
     */
	  public function getEntidad()
		{
			return $this->hasOne(Entidad::class, ['id_entidad' => 'id_entidad']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_producto
     */
	  public function getProducto()
		{
			return $this->hasOne(Producto::class, ['id_producto' => 'id_producto']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_scm
     */
	  public function getScm()
		{
			return $this->hasOne(Scm::class, ['id_scm' => 'id_scm']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_tipo_proceso
     */
	  public function getTipo_proceso()
		{
			return $this->hasOne(Tipo_proceso::class, ['id_tipo_proceso' => 'id_tipo_proceso']);
		}


	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_proceso
     */
	  public function getArraycapacidad()
		{
			return $this->hasMany(Capacidad::class, ['id_proceso' => 'id_proceso']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_proceso
     */
	  public function getArrayincidencia()
		{
			return $this->hasMany(Incidencia::class, ['id_proceso' => 'id_proceso']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_proceso
     */
	  public function getArrayinterrelacion()
		{
			return $this->hasMany(Interrelacion::class, ['id_proceso' => 'id_proceso']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_proceso
     */
	  public function getArrayreporte()
		{
			return $this->hasMany(Reporte::class, ['id_proceso' => 'id_proceso']);
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
        $select = ['*', 'proceso.id_proceso as id', 'proceso.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('proceso.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha_registro(){
        $timestamp = str_replace('/', '-', $this->fecha_registro);
        $this->fecha_registro = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
