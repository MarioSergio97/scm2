<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\seguridad\models;
use Yii;
use common\models\RestModel;

/**
 * Este es la clase modelo para la tabla rol.
 *
 * Los siguientes son los campos de la tabla 'rol':
 * @property integer $id_rol
 * @property string $role

 * Los siguientes son las relaciones de este modelo :

 * @property Usuario[] $arrayusuario
 */

class Rol extends RestModel 
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
    protected $primaryKey = 'id_rol';

    const MODEL = 'Rol';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'rol';
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
       const RELATIONS = ['arrayusuario'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_rol';

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
			[['role'],'required','on'=>['create','default']],
			[['id_rol'],'required', 'on' => 'update'],
			[['id_rol'],'integer'],
			[['role'], 'string', 'max'=>50],
			[['id_rol'], 'unique' , 'on' => 'create'],
			[['role'], 'unique' , 'on' => 'create'],
			[['role'], 'unique' , 'on' => 'update','when' =>function ($model, $value) {
                $elem = self::find()->where([$value => $model[$value]])->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
        ];
    }

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_rol
     */
	  public function getArrayusuario()
		{
			return $this->hasMany(Usuario::class, ['id_rol' => 'id_rol']);
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
        $select = ['*', 'rol.id_rol as id', 'rol.role as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('rol.role LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
