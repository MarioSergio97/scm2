<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111105_Tipo_proceso
 */
class M201228_111105_Tipo_proceso extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'tipo_proceso';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('tipo_proceso',
            [
                'id_tipo_proceso' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'descripcion' =>$this->text()->notNull(),
                 'PRIMARY KEY (`id_tipo_proceso`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_tipo_proceso'))
                $this->addColumn('tipo_proceso', 'id_tipo_proceso', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('tipo_proceso', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('tipo_proceso', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('descripcion'))
                $this->addColumn('tipo_proceso', 'descripcion', $this->text()->notNull());
             else{
                $this->alterColumn('tipo_proceso', 'descripcion', $this->text()->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/


    }

   public function down()
    {
        echo 'M201228_111215_Tipo_proceso cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Tipo_proceso cannot be reverted.


        return false;
    }
    */
}
