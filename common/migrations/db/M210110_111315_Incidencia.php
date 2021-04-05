<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111315_Incidencia
 */
class M210110_111315_Incidencia extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'incidencia';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('incidencia',
            [
                'id_incidencia' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'descripcion' =>$this->text()->notNull(),
                'fecha_registro' =>$this->date()->notNull(),
                'id_proceso' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_incidencia`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_incidencia'))
                $this->addColumn('incidencia', 'id_incidencia', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('descripcion'))
                $this->addColumn('incidencia', 'descripcion', $this->text()->notNull());
             else{
                $this->alterColumn('incidencia', 'descripcion', $this->text()->notNull());
                }
            if (!$exist_table->getColumn('fecha_registro'))
                $this->addColumn('incidencia', 'fecha_registro', $this->date()->notNull());
             else{
                $this->alterColumn('incidencia', 'fecha_registro', $this->date()->notNull());
                }
            if (!$exist_table->getColumn('id_proceso'))
                $this->addColumn('incidencia', 'id_proceso', $this->integer(10)->notNull());
             else{
                $this->alterColumn('incidencia', 'id_proceso', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('incidencia_proceso',$exist_table->foreignKeys) || !array_key_exists('id_proceso',$exist_table->foreignKeys['incidencia_proceso'])) 
            $this->addForeignKey(
                'incidencia_proceso',
                'incidencia',
                'id_proceso',
                'proceso',
                'id_proceso',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('incidencia_proceso','incidencia' );
            $this->addForeignKey(
                'incidencia_proceso',
                'incidencia',
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
        echo 'M210110_111325_Incidencia cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Incidencia cannot be reverted.


        return false;
    }
    */
}
