<?php 
/**Generate by ASGENS
*@author mb   
*@date Sun Jan 10 11:13:09 GMT-05:00 2021  
*@time Sun Jan 10 11:13:09 GMT-05:00 2021  
*/
namespace api\modules\nomencladores\models;


/** 
*  Esta es  ActiveQuery clase de [[Unidad_medida]].
 *
 * @see Unidad_medida
 */
/**
 * Unidad_medidaQuery representa la clase de Consulta del modelo Unidad_medida
 */
class Unidad_medidaQuery extends \yii\db\ActiveQuery{
/*public function active()
    {
        $this->andWhere('[[status]]=1');
        return $this;
    }*/

    /**
     * @inheritdoc
     * @return Unidad_medida[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return Unidad_medida|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}

