<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\gestion\models;


/** 
*  Esta es  ActiveQuery clase de [[Scm]].
 *
 * @see Scm
 */
/**
 * ScmQuery representa la clase de Consulta del modelo Scm
 */
class ScmQuery extends \yii\db\ActiveQuery{
/*public function active()
    {
        $this->andWhere('[[status]]=1');
        return $this;
    }*/

    /**
     * @inheritdoc
     * @return Scm[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return Scm|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}

