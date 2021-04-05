<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111108_Producto
 */
class M201228_111108_Producto extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'producto';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('producto',
            [
                'id_producto' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'id_um' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_producto`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_producto'))
                $this->addColumn('producto', 'id_producto', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('producto', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('producto', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('id_um'))
                $this->addColumn('producto', 'id_um', $this->integer(10)->notNull());
             else{
                $this->alterColumn('producto', 'id_um', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('producto_um',$exist_table->foreignKeys) || !array_key_exists('id_um',$exist_table->foreignKeys['producto_um'])) 
            $this->addForeignKey(
                'producto_um',
                'producto',
                'id_um',
                'unidad_medida',
                'id_um',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('producto_um','producto' );
            $this->addForeignKey(
                'producto_um',
                'producto',
                'id_um',
                'unidad_medida',
                'id_um',
                'CASCADE',
                'CASCADE'
            );
           }

    }

   public function down()
    {
        echo 'M201228_111215_Producto cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Producto cannot be reverted.


        return false;
    }
    */
}
