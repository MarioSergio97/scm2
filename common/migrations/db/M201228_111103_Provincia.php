<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111103_Provincia
 */
class M201228_111103_Provincia extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'provincia';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('provincia',
            [
                'id_provincia' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                 'PRIMARY KEY (`id_provincia`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_provincia'))
                $this->addColumn('provincia', 'id_provincia', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('provincia', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('provincia', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            }
        /*Generating index*/

        /*Generating foreignkey*/


    }

   public function down()
    {
        echo 'M201228_111215_Provincia cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Provincia cannot be reverted.


        return false;
    }
    */
}
