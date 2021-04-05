<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111304_Rol
 */
class M210110_111304_Rol extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'rol';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('rol',
            [
                'id_rol' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'role' =>$this->string(50)->notNull(),
                 'PRIMARY KEY (`id_rol`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_rol'))
                $this->addColumn('rol', 'id_rol', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('role'))
                $this->addColumn('rol', 'role', $this->string(50)->notNull());
             else{

                $this->alterColumn('rol', 'role', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            }
        /*Generating index*/

        if ($exist_table === null || !array_key_exists('role', $this->db->getSchema()->findUniqueIndexes($exist_table)))
        $this->createIndex(
                'role',
                'rol',
                ['role'],
                true
            );
        /*Generating foreignkey*/


    }

   public function down()
    {
        echo 'M210110_111325_Rol cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Rol cannot be reverted.


        return false;
    }
    */
}
