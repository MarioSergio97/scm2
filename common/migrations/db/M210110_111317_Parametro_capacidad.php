<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111317_Parametro_capacidad
 */
class M210110_111317_Parametro_capacidad extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'parametro_capacidad';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('parametro_capacidad',
            [
                'id_parametro' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'valor' =>$this->double(22)->notNull(),
                'id_capacidad' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_parametro`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_parametro'))
                $this->addColumn('parametro_capacidad', 'id_parametro', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('parametro_capacidad', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('parametro_capacidad', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('valor'))
                $this->addColumn('parametro_capacidad', 'valor', $this->double(22)->notNull());
             else{
                $this->alterColumn('parametro_capacidad', 'valor', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('id_capacidad'))
                $this->addColumn('parametro_capacidad', 'id_capacidad', $this->integer(10)->notNull());
             else{
                $this->alterColumn('parametro_capacidad', 'id_capacidad', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('parametro_capacidad',$exist_table->foreignKeys) || !array_key_exists('id_capacidad',$exist_table->foreignKeys['parametro_capacidad'])) 
            $this->addForeignKey(
                'parametro_capacidad',
                'parametro_capacidad',
                'id_capacidad',
                'capacidad',
                'id_capacidad',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('parametro_capacidad','parametro_capacidad' );
            $this->addForeignKey(
                'parametro_capacidad',
                'parametro_capacidad',
                'id_capacidad',
                'capacidad',
                'id_capacidad',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M210110_111325_Parametro_capacidad cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Parametro_capacidad cannot be reverted.


        return false;
    }
    */
}
