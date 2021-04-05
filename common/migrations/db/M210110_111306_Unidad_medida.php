<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111306_Unidad_medida
 */
class M210110_111306_Unidad_medida extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'unidad_medida';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('unidad_medida',
            [
                'id_um' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                 'PRIMARY KEY (`id_um`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_um'))
                $this->addColumn('unidad_medida', 'id_um', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('unidad_medida', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('unidad_medida', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            }
        /*Generating index*/

        /*Generating foreignkey*/


    }

   public function down()
    {
        echo 'M210110_111325_Unidad_medida cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Unidad_medida cannot be reverted.


        return false;
    }
    */
}
