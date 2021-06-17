<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\reportes\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Entidad;
use api\modules\gestion\models\Proceso;
use common\modules\seguridad\models\Usuario;
/**
 * Este es la clase modelo para la tabla registro.
 *
 * Los siguientes son los campos de la tabla 'registro':
 * @property integer $id_registro
 * @property integer $id_usuario
 * @property integer $id_entidad
 * @property integer $id_proceso
 * @property string $nombre_proceso
 * @property string $accion
 * @property string $atributo
 * @property string $tabla
 * @property string $intervalo
 * @property date $fecha_registro

 * Los siguientes son las relaciones de este modelo :

 * @property Usuario $usuario
 * @property Entidad $entidad
 * @property Proceso $proceso
 */

class Registro extends RestModel
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
    protected $primaryKey = 'id_registro';

    const MODEL = 'Registro';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'registro';
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
       const RELATIONS = ['usuario','entidad','proceso'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_registro';

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
			[['id_usuario','fecha_registro','id_entidad'],'required','on'=>['create','default']],
			[['id_registro'],'required', 'on' => 'update'],
			[['id_registro','id_usuario','id_entidad','id_proceso'],'integer'],
			[['fecha_registro'],'safe'],
			['fecha_registro','format_fecha_registro'],
			[['accion','atributo','tabla','intervalo','nombre_proceso'], 'string', 'max'=>50],
			[['id_registro'], 'unique' , 'on' => 'create'],
        ];
    }
	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_usuario
     */
	  public function getUsuario()
		{
			return $this->hasOne(Usuario::class, ['id_usuario' => 'id_usuario']);
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
     * @description hace referencia al campo foráneo id_entidad
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
        $select = ['*', 'registro.id_registro as id', 'registro.accion as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('registro.accion LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha_registro(){
        $timestamp = str_replace('/', '-', $this->fecha_registro);
        $this->fecha_registro = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
