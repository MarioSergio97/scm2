<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111109_Scm
 */
class M201228_111109_Scm extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'scm';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('scm',
            [
                'id_scm' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'descripcion' =>$this->text()->notNull(),
                'fecha_registro' =>$this->date()->notNull(),
                'unidad_tiempo_demanda' =>$this->string(50)->notNull(),
                'id_entidad_gestora' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_scm`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_scm'))
                $this->addColumn('scm', 'id_scm', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('scm', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('scm', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('descripcion'))
                $this->addColumn('scm', 'descripcion', $this->text()->notNull());
             else{
                $this->alterColumn('scm', 'descripcion', $this->text()->notNull());
                }
            if (!$exist_table->getColumn('fecha_registro'))
                $this->addColumn('scm', 'fecha_registro', $this->date()->notNull());
             else{
                $this->alterColumn('scm', 'fecha_registro', $this->date()->notNull());
                }
            if (!$exist_table->getColumn('unidad_tiempo_demanda'))
                $this->addColumn('scm', 'unidad_tiempo_demanda', $this->string(50)->notNull());
             else{

                $this->alterColumn('scm', 'unidad_tiempo_demanda', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('id_entidad_gestora'))
                $this->addColumn('scm', 'id_entidad_gestora', $this->integer(10)->notNull());
             else{
                $this->alterColumn('scm', 'id_entidad_gestora', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('scm_entidad_gestora',$exist_table->foreignKeys) || !array_key_exists('id_entidad_gestora',$exist_table->foreignKeys['scm_entidad_gestora'])) 
            $this->addForeignKey(
                'scm_entidad_gestora',
                'scm',
                'id_entidad_gestora',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('scm_entidad_gestora','scm' );
            $this->addForeignKey(
                'scm_entidad_gestora',
                'scm',
                'id_entidad_gestora',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M201228_111215_Scm cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Scm cannot be reverted.


        return false;
    }
    */
}
