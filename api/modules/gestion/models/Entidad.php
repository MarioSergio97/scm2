<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\models;
use Yii;
use common\models\RestModel;

use api\modules\nomencladores\models\Pais;
use api\modules\nomencladores\models\Provincia;
use common\modules\seguridad\models\Usuario;
/**
 * Este es la clase modelo para la tabla entidad.
 *
 * Los siguientes son los campos de la tabla 'entidad':
 * @property integer $id_entidad
 * @property string $nombre
 * @property string $telefono
 * @property string $descripcion
 * @property date $fecha_registro
 * @property integer $id_provincia
 * @property integer $id_pais

 * Los siguientes son las relaciones de este modelo :

 * @property Pais $pais
 * @property Provincia $provincia
 * @property Proceso[] $arrayproceso
 * @property Scm[] $arrayscm
 * @property Usuario[] $arrayusuario
 */

class Entidad extends RestModel 
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
    protected $primaryKey = 'id_entidad';

    const MODEL = 'Entidad';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'entidad';
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
       const RELATIONS = ['pais','provincia','arrayproceso','arrayscm','arrayusuario'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_entidad';

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
			[['nombre','fecha_registro','id_pais'],'required','on'=>['create','default']],
			[['id_entidad'],'required', 'on' => 'update'],
			[['id_entidad','id_provincia','id_pais'],'integer'],
			[['fecha_registro'],'safe'],
			['fecha_registro','format_fecha_registro'],
			[['nombre','telefono'], 'string', 'max'=>50],
			[['descripcion'], 'string', 'max'=>65535],
			[['id_entidad','nombre'], 'unique' , 'on' => 'create'],
            [['nombre'], 'unique' , 'on' => 'update','when' =>function ($model, $value) {
                $elem = self::find()->where([$value => $model[$value]])->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_pais
     */
	  public function getPais()
		{
			return $this->hasOne(Pais::class, ['id_pais' => 'id_pais']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_provincia
     */
	  public function getProvincia()
		{
			return $this->hasOne(Provincia::class, ['id_provincia' => 'id_provincia']);
		}


	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_entidad
     */
	  public function getArrayproceso()
		{
			return $this->hasMany(Proceso::class, ['id_entidad' => 'id_entidad']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_entidad_gestora
     */
	  public function getArrayscm()
		{
			return $this->hasMany(Scm::class, ['id_entidad_gestora' => 'id_entidad']);
		}

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_entidad
     */
	  public function getArrayusuario()
		{
			return $this->hasMany(Usuario::class, ['id_entidad' => 'id_entidad']);
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
        $select = ['*', 'entidad.id_entidad as id', 'entidad.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('entidad.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha_registro(){
        $timestamp = str_replace('/', '-', $this->fecha_registro);
        $this->fecha_registro = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
