<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace common\modules\seguridad\models;

use Yii;
use common\models\RestModel;
use api\modules\gestion\models\Entidad;

use yii\web\IdentityInterface;
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

class Usuario extends RestModel implements IdentityInterface
{

    const ACCESS_TOKEN = 'authkey';
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
    const HIDE = ['contrasenna'];
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
			[['nombre','email','contrasenna','id_entidad','id_rol'],'required','on'=>['create','default']],
			[['id_usuario'],'required', 'on' => 'update'],
			[['id_usuario','id_entidad','authkey','id_rol'],'integer'],
			[['contrasenna'],'safe'],

			[['nombre','email','contrasenna','telefono','cargo_empresa'], 'string', 'max'=>50],
			[['id_usuario','email','id_entidad'], 'unique' , 'on' => 'create'],
            [['email','id_entidad'], 'unique' , 'on' => 'update','when' =>function ($model, $value) {
                $elem = self::find()->where([$value => $model[$value]])->one();
                return !$elem ? false : $elem[$elem->primaryKey] != $model[$model->primaryKey];
            }],
            // [['email'], 'unique' , 'on' => 'update'],

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


    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id_usuario' => $id]);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne([self::PKEY => (string) $token->getClaim('uid')]);
    }

    /**
     * Finds user by username     *
     * @param string $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        return static::findOne(['email' => $username]);
    }



    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token
            ]);

    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int)substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->authkey;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->contrasenna);
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->contrasenna = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->authkey = Yii::$app->security->generateRandomString();
    }

    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }
   /* 
   *  Updating hash password 
   */
    public function beforeSave($insert)
    {
        if ($insert){
            $this->setPassword($this->contrasenna);
           }else
        if ($this->isAttributeChanged('contrasenna') && $this->contrasenna!='' && $this->contrasenna!='0')
                $this->setPassword($this->contrasenna);
            if($this->contrasenna=='' || $this->contrasenna=='0')
                $this->contrasenna=$this->getOldAttribute('contrasenna');        
        return parent::beforeSave($insert); // TODO: Change the autogenerated stub
    }
    
   public function get_data()
    {
        return array_intersect_key($this->attributes,['nombre'=>'','email'=>'','id_rol'=>'','id_entidad'=>'' ]);
    }

}
?>
