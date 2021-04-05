<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111110_Usuario
 */
class M201228_111110_Usuario extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'usuario';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('usuario',
            [
                'id_usuario' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'email' =>$this->string(50)->notNull(),
                'contrasenna' =>$this->string(255)->notNull(),
                'telefono' =>$this->string(50),
                'cargo_empresa' =>$this->string(50),
                'id_entidad' =>$this->integer(10),
                'authkey' =>$this->integer(10),
                'id_rol' =>$this->integer(10)->notNull(),
                 'PRIMARY KEY (`id_usuario`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_usuario'))
                $this->addColumn('usuario', 'id_usuario', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('usuario', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('usuario', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('email'))
                $this->addColumn('usuario', 'email', $this->string(50)->notNull());
             else{

                $this->alterColumn('usuario', 'email', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('contrasenna'))
                $this->addColumn('usuario', 'contrasenna', $this->string(255)->notNull());
             else{

                $this->alterColumn('usuario', 'contrasenna', 'VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('telefono'))
                $this->addColumn('usuario', 'telefono', $this->string(50));
             else{

                $this->alterColumn('usuario', 'telefono', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('cargo_empresa'))
                $this->addColumn('usuario', 'cargo_empresa', $this->string(50));
             else{

                $this->alterColumn('usuario', 'cargo_empresa', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('id_entidad'))
                $this->addColumn('usuario', 'id_entidad', $this->integer(10));
             else{
                $this->alterColumn('usuario', 'id_entidad', $this->integer(10));
                }
            if (!$exist_table->getColumn('authkey'))
                $this->addColumn('usuario', 'authkey', $this->integer(10));
             else{
                $this->alterColumn('usuario', 'authkey', $this->integer(10));
                }
            if (!$exist_table->getColumn('id_rol'))
                $this->addColumn('usuario', 'id_rol', $this->integer(10)->notNull());
             else{
                $this->alterColumn('usuario', 'id_rol', $this->integer(10)->notNull());
                }
            }
        /*Generating index*/

        /*Generating foreignkey*/

        if ($exist_table === null || !array_key_exists('usuario_entidad',$exist_table->foreignKeys) || !array_key_exists('id_entidad',$exist_table->foreignKeys['usuario_entidad'])) 
            $this->addForeignKey(
                'usuario_entidad',
                'usuario',
                'id_entidad',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           else {
            $this->dropForeignKey('usuario_entidad','usuario' );
            $this->addForeignKey(
                'usuario_entidad',
                'usuario',
                'id_entidad',
                'entidad',
                'id_entidad',
                'CASCADE',
                'CASCADE'
            );
           }
        if ($exist_table === null || !array_key_exists('usuario_fk',$exist_table->foreignKeys) || !array_key_exists('id_rol',$exist_table->foreignKeys['usuario_fk'])) 
            $this->addForeignKey(
                'usuario_fk',
                'usuario',
                'id_rol',
                'rol',
                'id_rol',
                'NO ACTION',
                'NO ACTION'
            );
           else {
            $this->dropForeignKey('usuario_fk','usuario' );
            $this->addForeignKey(
                'usuario_fk',
                'usuario',
                'id_rol',
                'rol',
                'id_rol',
                'NO ACTION',
                'NO ACTION'
            );
           }

    }

   public function down()
    {
        echo 'M201228_111215_Usuario cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Usuario cannot be reverted.


        return false;
    }
    */
}
