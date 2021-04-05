<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111313_Reporte
 */
class M210110_111313_Reporte extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'reporte';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('reporte',
            [
                'id_reporte' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'lanzamiento' =>$this->double(22)->notNull(),
                'entregado' =>$this->double(22)->notNull(),
                'id_proceso' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_reporte`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_reporte'))
                $this->addColumn('reporte', 'id_reporte', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('lanzamiento'))
                $this->addColumn('reporte', 'lanzamiento', $this->double(22)->notNull());
             else{
                $this->alterColumn('reporte', 'lanzamiento', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('entregado'))
                $this->addColumn('reporte', 'entregado', $this->double(22)->notNull());
             else{
                $this->alterColumn('reporte', 'entregado', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('id_proceso'))
                $this->addColumn('reporte', 'id_proceso', $this->integer(10)->notNull());
             else{
                $this->alterColumn('reporte', 'id_proceso', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('proceso_reporte',$exist_table->foreignKeys) || !array_key_exists('id_proceso',$exist_table->foreignKeys['proceso_reporte'])) 
            $this->addForeignKey(
                'proceso_reporte',
                'reporte',
                'id_proceso',
                'proceso',
                'id_proceso',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('proceso_reporte','reporte' );
            $this->addForeignKey(
                'proceso_reporte',
                'reporte',
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
        echo 'M210110_111325_Reporte cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Reporte cannot be reverted.


        return false;
    }
    */
}
