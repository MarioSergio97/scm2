<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111311_Demanda
 */
class M210110_111311_Demanda extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'demanda';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('demanda',
            [
                'id_demanda' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'no_intervalo' =>$this->integer(10)->notNull(),
                'demanda_final' =>$this->double(22)->notNull(),
                'demanda_agrupada' =>$this->double(22)->notNull(),
                'fecha' =>$this->date()->notNull(),
                'id_scm' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_demanda`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_demanda'))
                $this->addColumn('demanda', 'id_demanda', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('no_intervalo'))
                $this->addColumn('demanda', 'no_intervalo', $this->integer(10)->notNull());
             else{
                $this->alterColumn('demanda', 'no_intervalo', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('demanda_final'))
                $this->addColumn('demanda', 'demanda_final', $this->double(22)->notNull());
             else{
                $this->alterColumn('demanda', 'demanda_final', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('demanda_agrupada'))
                $this->addColumn('demanda', 'demanda_agrupada', $this->double(22)->notNull());
             else{
                $this->alterColumn('demanda', 'demanda_agrupada', $this->double(22)->notNull());
                }
            if (!$exist_table->getColumn('fecha'))
                $this->addColumn('demanda', 'fecha', $this->date()->notNull());
             else{
                $this->alterColumn('demanda', 'fecha', $this->date()->notNull());
                }
            if (!$exist_table->getColumn('id_scm'))
                $this->addColumn('demanda', 'id_scm', $this->integer(10)->notNull());
             else{
                $this->alterColumn('demanda', 'id_scm', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('demanda_scm',$exist_table->foreignKeys) || !array_key_exists('id_scm',$exist_table->foreignKeys['demanda_scm'])) 
            $this->addForeignKey(
                'demanda_scm',
                'demanda',
                'id_scm',
                'scm',
                'id_scm',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('demanda_scm','demanda' );
            $this->addForeignKey(
                'demanda_scm',
                'demanda',
                'id_scm',
                'scm',
                'id_scm',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M210110_111325_Demanda cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Demanda cannot be reverted.


        return false;
    }
    */
}
