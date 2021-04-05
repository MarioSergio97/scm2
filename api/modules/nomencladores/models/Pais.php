<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\nomencladores\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Entidad;
/**
 * Este es la clase modelo para la tabla pais.
 *
 * Los siguientes son los campos de la tabla 'pais':
 * @property integer $id_pais
 * @property string $nombre
 * @property string $iso2
 * @property string $iso3
 * @property string $prefijo
 * @property string $continente
 * @property string $subcontinente
 * @property string $iso_moneda
 * @property string $nombre_moneda

 * Los siguientes son las relaciones de este modelo :

 * @property Entidad[] $arrayentidad
 */

class Pais extends RestModel 
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
    protected $primaryKey = 'id_pais';

    const MODEL = 'Pais';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pais';
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
       const RELATIONS = ['arrayentidad'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_pais';

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
			[['nombre','iso2','iso3','prefijo'],'required','on'=>['create','default']],
			[['id_pais'],'required', 'on' => 'update'],
			[['id_pais'],'integer'],
			[['nombre'], 'string', 'max'=>50],
			[['iso2','iso3','prefijo','continente','subcontinente','iso_moneda'], 'string', 'max'=>20],
			[['nombre_moneda'], 'string', 'max'=>100],
			[['id_pais'], 'unique' , 'on' => 'create'],
        ];
    }

	 /**
     * @return \yii\db\ActiveQuery
     * @description hace referencia al campo foráneo id_pais
     */
	  public function getArrayentidad()
		{
			return $this->hasMany(Entidad::class, ['id_pais' => 'id_pais']);
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
        $select = ['*', 'pais.id_pais as id', 'pais.nombre as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('pais.nombre LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
}
?>
