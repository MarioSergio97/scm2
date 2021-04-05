<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\seguridad\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Entidad;
/**
 * Este es la clase modelo para la tabla usuario.
 *
 * Los siguientes son los campos de la tabla 'usuario':
 * @property integer $id_usuario
 * @property string $nombre
 * @property string $email
 * @property string $contrasenna
 * @property string $telefono
 * @property string $cargo_empresa
 * @property integer $id_entidad
 * @property integer $authkey
 * @property integer $id_rol

 * Los siguientes son las relaciones de este modelo :

 * @property Entidad $entidad
 * @property Rol $rol
 */

class Usuario extends RestModel 
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
    protected $primaryKey = 'id_usuario';

    const MODEL = 'Usuario';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'usuario';
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
       const RELATIONS = ['entidad','rol'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_usuario';

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
			[['nombre','email','contrasenna','id_rol'],'required','on'=>['create','default']],
			[['id_usuario'],'required', 'on' => 'update'],
			[['id_usuario','id_entidad','authkey','id_rol'],'integer'],
			[['nombre','email','telefono','cargo_empresa'], 'string', 'max'=>50],
			[['contrasenna'], 'string', 'max'=>255],
			[['id_usuario'], 'unique' , 'on' => 'create'],
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
     * @description hace referencia al campo foráneo id_rol
     */
	  public function getRol()
		{
			return $this->hasOne(Rol::class, ['id_rol' => 'id_rol']);
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
        $select = ['*', 'usuario.id_usuario as id', 'usuario.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('usuario.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
