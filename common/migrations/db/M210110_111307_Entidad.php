<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111307_Entidad
 */
class M210110_111307_Entidad extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'entidad';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('entidad',
            [
                'id_entidad' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'telefono' =>$this->string(50),
                'descripcion' =>$this->text()->notNull(),
                'fecha_registro' =>$this->date()->notNull(),
                'id_provincia' =>$this->integer(10),
                'id_pais' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_entidad`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_entidad'))
                $this->addColumn('entidad', 'id_entidad', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('entidad', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('entidad', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('telefono'))
                $this->addColumn('entidad', 'telefono', $this->string(50));
             else{

                $this->alterColumn('entidad', 'telefono', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('descripcion'))
                $this->addColumn('entidad', 'descripcion', $this->text()->notNull());
             else{
                $this->alterColumn('entidad', 'descripcion', $this->text()->notNull());
                }
            if (!$exist_table->getColumn('fecha_registro'))
                $this->addColumn('entidad', 'fecha_registro', $this->date()->notNull());
             else{
                $this->alterColumn('entidad', 'fecha_registro', $this->date()->notNull());
                }
            if (!$exist_table->getColumn('id_provincia'))
                $this->addColumn('entidad', 'id_provincia', $this->integer(10));
             else{
                $this->alterColumn('entidad', 'id_provincia', $this->integer(10));
                }
            if (!$exist_table->getColumn('id_pais'))
                $this->addColumn('entidad', 'id_pais', $this->integer(10)->notNull());
             else{
                $this->alterColumn('entidad', 'id_pais', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('entidad_pais',$exist_table->foreignKeys) || !array_key_exists('id_pais',$exist_table->foreignKeys['entidad_pais'])) 
            $this->addForeignKey(
                'entidad_pais',
                'entidad',
                'id_pais',
                'pais',
                'id_pais',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('entidad_pais','entidad' );
            $this->addForeignKey(
                'entidad_pais',
                'entidad',
                'id_pais',
                'pais',
                'id_pais',
                'CASCADE',
                'CASCADE'
            );
           }
        if ($exist_table === null || !array_key_exists('entidad_provincia',$exist_table->foreignKeys) || !array_key_exists('id_provincia',$exist_table->foreignKeys['entidad_provincia'])) 
            $this->addForeignKey(
                'entidad_provincia',
                'entidad',
                'id_provincia',
                'provincia',
                'id_provincia',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('entidad_provincia','entidad' );
            $this->addForeignKey(
                'entidad_provincia',
                'entidad',
                'id_provincia',
                'provincia',
                'id_provincia',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M210110_111325_Entidad cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Entidad cannot be reverted.


        return false;
    }
    */
}
