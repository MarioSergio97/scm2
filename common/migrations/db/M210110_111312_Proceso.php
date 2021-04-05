<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M210110_111312_Proceso
 */
class M210110_111312_Proceso extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'proceso';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('proceso',
            [
                'id_proceso' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'numero' =>$this->integer(10)->notNull(),
                'nombre' =>$this->string(50)->notNull(),
                'descripcion' =>$this->text()->notNull(),
                'costo_proceso' =>$this->double(22),
                'costo_gestion' =>$this->double(22),
                'costo_inventario' =>$this->double(22),
                'porciento_demanda_total' =>$this->double(22),
                'capacidad' =>$this->double(22),
                'ciclo_proceso' =>$this->integer(10),
                'procesos_sucesores' =>$this->integer(10),
                'it_lanzamiento' =>$this->double(22),
                'porciento_satisfaccion' =>$this->double(22),
                'id_scm' =>$this->integer(10)->notNull(),
                'id_tipo_proceso' =>$this->integer(10)->notNull(),
                'id_entidad' =>$this->integer(10)->notNull(),
                'id_producto' =>$this->integer(10)->notNull(),
                'fecha_registro' =>$this->date()->notNull(),
                 'PRIMARY KEY (`id_proceso`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_proceso'))
                $this->addColumn('proceso', 'id_proceso', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('numero'))
                $this->addColumn('proceso', 'numero', $this->integer(10)->notNull());
             else{
                $this->alterColumn('proceso', 'numero', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('proceso', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('proceso', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('descripcion'))
                $this->addColumn('proceso', 'descripcion', $this->text()->notNull());
             else{
                $this->alterColumn('proceso', 'descripcion', $this->text()->notNull());
                }
            if (!$exist_table->getColumn('costo_proceso'))
                $this->addColumn('proceso', 'costo_proceso', $this->double(22));
             else{
                $this->alterColumn('proceso', 'costo_proceso', $this->double(22));
                }
            if (!$exist_table->getColumn('costo_gestion'))
                $this->addColumn('proceso', 'costo_gestion', $this->double(22));
             else{
                $this->alterColumn('proceso', 'costo_gestion', $this->double(22));
                }
            if (!$exist_table->getColumn('costo_inventario'))
                $this->addColumn('proceso', 'costo_inventario', $this->double(22));
             else{
                $this->alterColumn('proceso', 'costo_inventario', $this->double(22));
                }
            if (!$exist_table->getColumn('porciento_demanda_total'))
                $this->addColumn('proceso', 'porciento_demanda_total', $this->double(22));
             else{
                $this->alterColumn('proceso', 'porciento_demanda_total', $this->double(22));
                }
            if (!$exist_table->getColumn('capacidad'))
                $this->addColumn('proceso', 'capacidad', $this->double(22));
             else{
                $this->alterColumn('proceso', 'capacidad', $this->double(22));
                }
            if (!$exist_table->getColumn('ciclo_proceso'))
                $this->addColumn('proceso', 'ciclo_proceso', $this->integer(10));
             else{
                $this->alterColumn('proceso', 'ciclo_proceso', $this->integer(10));
                }
            if (!$exist_table->getColumn('procesos_sucesores'))
                $this->addColumn('proceso', 'procesos_sucesores', $this->integer(10));
             else{
                $this->alterColumn('proceso', 'procesos_sucesores', $this->integer(10));
                }
            if (!$exist_table->getColumn('it_lanzamiento'))
                $this->addColumn('proceso', 'it_lanzamiento', $this->double(22));
             else{
                $this->alterColumn('proceso', 'it_lanzamiento', $this->double(22));
                }
            if (!$exist_table->getColumn('porciento_satisfaccion'))
                $this->addColumn('proceso', 'porciento_satisfaccion', $this->double(22));
             else{
                $this->alterColumn('proceso', 'porciento_satisfaccion', $this->double(22));
                }
            if (!$exist_table->getColumn('id_scm'))
                $this->addColumn('proceso', 'id_scm', $this->integer(10)->notNull());
             else{
                $this->alterColumn('proceso', 'id_scm', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('id_tipo_proceso'))
                $this->addColumn('proceso', 'id_tipo_proceso', $this->integer(10)->notNull());
             else{
                $this->alterColumn('proceso', 'id_tipo_proceso', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('id_entidad'))
                $this->addColumn('proceso', 'id_entidad', $this->integer(10)->notNull());
             else{
                $this->alterColumn('proceso', 'id_entidad', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('id_producto'))
                $this->addColumn('proceso', 'id_producto', $this->integer(10)->notNull());
             else{
                $this->alterColumn('proceso', 'id_producto', $this->integer(10)->notNull());
                }
            if (!$exist_table->getColumn('fecha_registro'))
                $this->addColumn('proceso', 'fecha_registro', $this->date()->notNull());
             else{
                $this->alterColumn('proceso', 'fecha_registro', $this->date()->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('proceso_entidad',$exist_table->foreignKeys) || !array_key_exists('id_entidad',$exist_table->foreignKeys['proceso_entidad'])) 
            $this->addForeignKey(
                'proceso_entidad',
                'proceso',
                'id_entidad',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('proceso_entidad','proceso' );
            $this->addForeignKey(
                'proceso_entidad',
                'proceso',
                'id_entidad',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           }
        if ($exist_table === null || !array_key_exists('proceso_producto',$exist_table->foreignKeys) || !array_key_exists('id_producto',$exist_table->foreignKeys['proceso_producto'])) 
            $this->addForeignKey(
                'proceso_producto',
                'proceso',
                'id_producto',
                'producto',
                'id_producto',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('proceso_producto','proceso' );
            $this->addForeignKey(
                'proceso_producto',
                'proceso',
                'id_producto',
                'producto',
                'id_producto',
                'CASCADE',
                'CASCADE'
            );
           }
        if ($exist_table === null || !array_key_exists('proceso_scm',$exist_table->foreignKeys) || !array_key_exists('id_scm',$exist_table->foreignKeys['proceso_scm'])) 
            $this->addForeignKey(
                'proceso_scm',
                'proceso',
                'id_scm',
                'scm',
                'id_scm',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('proceso_scm','proceso' );
            $this->addForeignKey(
                'proceso_scm',
                'proceso',
                'id_scm',
                'scm',
                'id_scm',
                'CASCADE',
                'CASCADE'
            );
           }
        if ($exist_table === null || !array_key_exists('proceso_tipo_proceso',$exist_table->foreignKeys) || !array_key_exists('id_tipo_proceso',$exist_table->foreignKeys['proceso_tipo_proceso'])) 
            $this->addForeignKey(
                'proceso_tipo_proceso',
                'proceso',
                'id_tipo_proceso',
                'tipo_proceso',
                'id_tipo_proceso',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('proceso_tipo_proceso','proceso' );
            $this->addForeignKey(
                'proceso_tipo_proceso',
                'proceso',
                'id_tipo_proceso',
                'tipo_proceso',
                'id_tipo_proceso',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M210110_111325_Proceso cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M210110_111325_Proceso cannot be reverted.


        return false;
    }
    */
}
