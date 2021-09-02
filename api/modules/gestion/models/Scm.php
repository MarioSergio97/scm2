<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\models;
use Yii;
use common\models\RestModel;

use api\modules\produccion\models\Demanda;
/**
 * Este es la clase modelo para la tabla scm.
 *
 * Los siguientes son los campos de la tabla 'scm':
 * @property integer $id_scm
 * @property string $nombre
 * @property string $descripcion
 * @property date $fecha_registro
 * @property string $unidad_tiempo_demanda
 * @property integer $intervalo_numero_control
 * @property integer $norma_inventario_total_cadena

 * Los siguientes son las relaciones de este modelo :

 * @property Entidad $entidad_gestora
 * @property Demanda[] $arraydemanda
 * @property Proceso[] $arrayproceso
 */

class Scm extends RestModel 
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
    protected $primaryKey = 'id_scm';

    const MODEL = 'Scm';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'scm';
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
       const RELATIONS = ['entidad_gestora','arraydemanda','arrayproceso'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_scm';

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
			[['nombre','fecha_registro','unidad_tiempo_demanda','id_entidad_gestora'],'required','on'=>['create','default']],
			[['id_scm'],'required', 'on' => 'update'],
			[['id_scm','id_entidad_gestora'],'integer'],
			[['fecha_registro','intervalo_numero_control','norma_inventario_total_cadena'],'safe'],
            [['intervalo_numero_control'],'integer'],
            [['norma_inventario_total_cadena'],'number'],
			['fecha_registro','format_fecha_registro'],
			[['nombre','unidad_tiempo_demanda'], 'string', 'max'=>50],
			[['descripcion'], 'string', 'max'=>65535],
			[['id_scm','nombre'], 'unique' , 'on' => 'create'],
            [['nombre'], 'unique' , 'on' => 'update','when' =>function ($model, $value) {
                $elem = self::find()->where([$value => $model[$value]])->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_entidad_gestora
     */
	  public function getEntidad_gestora()
		{
			return $this->hasOne(Entidad::class, ['id_entidad' => 'id_entidad_gestora']);
		}


	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_scm
     */
	  public function getArraydemanda()
		{
			return $this->hasMany(Demanda::class, ['id_scm' => 'id_scm']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_scm
     */
	  public function getArrayproceso()
		{
			return $this->hasMany(Proceso::class, ['id_scm' => 'id_scm']);
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
        $select = ['*', 'scm.id_scm as id', 'scm.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('scm.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha_registro(){
        $timestamp = str_replace('/', '-', $this->fecha_registro);
        $this->fecha_registro = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
