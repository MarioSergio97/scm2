<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111316_Interrelacion
 */
class M210110_111316_Interrelacion extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'interrelacion';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('interrelacion',
            [
                'id_interrelacion' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'procesamiento' =>$this->double(22)->notNull(),
                'rendimiento' =>$this->double(22)->notNull(),
                'equivalencia' =>$this->double(22)->notNull(),
                'perdida' =>$this->double(22)->notNull(),
                'perdida_final' =>$this->double(22)->notNull(),
                'id_proceso' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_interrelacion`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_interrelacion'))
                $this->addColumn('interrelacion', 'id_interrelacion', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('procesamiento'))
                $this->addColumn('interrelacion', 'procesamiento', $this->double(22)->notNull());
             else{
                $this->alterColumn('interrelacion', 'procesamiento', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('rendimiento'))
                $this->addColumn('interrelacion', 'rendimiento', $this->double(22)->notNull());
             else{
                $this->alterColumn('interrelacion', 'rendimiento', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('equivalencia'))
                $this->addColumn('interrelacion', 'equivalencia', $this->double(22)->notNull());
             else{
                $this->alterColumn('interrelacion', 'equivalencia', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('perdida'))
                $this->addColumn('interrelacion', 'perdida', $this->double(22)->notNull());
             else{
                $this->alterColumn('interrelacion', 'perdida', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('perdida_final'))
                $this->addColumn('interrelacion', 'perdida_final', $this->double(22)->notNull());
             else{
                $this->alterColumn('interrelacion', 'perdida_final', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('id_proceso'))
                $this->addColumn('interrelacion', 'id_proceso', $this->integer(10)->notNull());
             else{
                $this->alterColumn('interrelacion', 'id_proceso', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('interrelacion_proceso',$exist_table->foreignKeys) || !array_key_exists('id_proceso',$exist_table->foreignKeys['interrelacion_proceso'])) 
            $this->addForeignKey(
                'interrelacion_proceso',
                'interrelacion',
                'id_proceso',
                'proceso',
                'id_proceso',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('interrelacion_proceso','interrelacion' );
            $this->addForeignKey(
                'interrelacion_proceso',
                'interrelacion',
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
        echo 'M210110_111325_Interrelacion cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Interrelacion cannot be reverted.


        return false;
    }
    */
}
