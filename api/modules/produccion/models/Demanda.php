<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\produccion\models;
use Yii;
use common\models\RestModel;

use api\modules\gestion\models\Scm;
/**
 * Este es la clase modelo para la tabla demanda.
 *
 * Los siguientes son los campos de la tabla 'demanda':
 * @property integer $id_demanda
 * @property integer $no_intervalo
 * @property float $demanda_final
 * @property float $demanda_agrupada
 * @property date $fecha
 * @property integer $id_scm

 * Los siguientes son las relaciones de este modelo :

 * @property Scm $scm
 */

class Demanda extends RestModel 
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
    protected $primaryKey = 'id_demanda';

    const MODEL = 'Demanda';

    /**
     * @return string the associated database table name
     */
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'demanda';
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
       const RELATIONS = ['scm'];



    /**
     * The primary key of the table
     *
     * @var mixed
     */

       const PKEY = 'id_demanda';

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
			[['no_intervalo','demanda_final','demanda_agrupada','fecha','id_scm'],'required','on'=>['create','default']],
			[['id_demanda'],'required', 'on' => 'update'],
			[['id_demanda','no_intervalo','id_scm'],'integer'],
			[['demanda_final','demanda_agrupada'],'number'],
			[['demanda_final','demanda_agrupada'],'safe'],
			[['fecha'],'safe'],
			['fecha','format_fecha'],
			[['id_demanda'], 'unique' , 'on' => 'create'],
        ];
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
        $select = ['*', 'demanda.id_demanda as id', 'demanda.id_demanda as text'];
        $result = new \stdClass();
        $result->data = [];
        if ($parameters->relations == 'all')
            $result->data = $query->select($select)->with(get_called_class()::RELATIONS);
        if (!is_null($parameters->relations) && $parameters->relations != 'all')
            $result->data = $query->select($select)->with($parameters->relations);
        if (is_null($parameters->relations))
            $result->data = $query->select($select);
        $result->data=$result->data->andWhere('demanda.id_demanda LIKE '."'%".$like."%'")->asArray()->all();
        return $result;

    }
   public function format_fecha(){
        $timestamp = str_replace('/', '-', $this->fecha);
        $this->fecha = date('Y-m-d h:i:s', strtotime($timestamp));
    }
}
?>
