<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111114_Capacidad
 */
class M201228_111114_Capacidad extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'capacidad';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('capacidad',
            [
                'id_capacidad' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'id_proceso' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_capacidad`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_capacidad'))
                $this->addColumn('capacidad', 'id_capacidad', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('id_proceso'))
                $this->addColumn('capacidad', 'id_proceso', $this->integer(10)->notNull());
             else{
                $this->alterColumn('capacidad', 'id_proceso', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('capacidad_proceso',$exist_table->foreignKeys) || !array_key_exists('id_proceso',$exist_table->foreignKeys['capacidad_proceso'])) 
            $this->addForeignKey(
                'capacidad_proceso',
                'capacidad',
                'id_proceso',
                'proceso',
                'id_proceso',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('capacidad_proceso','capacidad' );
            $this->addForeignKey(
                'capacidad_proceso',
                'capacidad',
                'id_proceso',
                'proceso',
                'id_proceso',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M201228_111215_Capacidad cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Capacidad cannot be reverted.


        return false;
    }
    */
}
