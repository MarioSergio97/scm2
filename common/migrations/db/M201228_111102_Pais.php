<?php

namespace common\migrations\db;

use yii\db\Migration;

/**
 * Class M201228_111102_Pais
 */
class M201228_111102_Pais extends Migration
{

/**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $table_name = $this->db->tablePrefix . 'pais';
        $exist_table = $this->getDb()->getTableSchema($table_name, true);
        /*Generating tables and columns*/
        if ($exist_table === null) {
            $this->createTable('pais',
            [
                'id_pais' =>$this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique(),
                'nombre' =>$this->string(50)->notNull(),
                'iso2' =>$this->string(20)->notNull(),
                'iso3' =>$this->string(20)->notNull(),
                'prefijo' =>$this->string(20)->notNull(),
                'continente' =>$this->string(20),
                'subcontinente' =>$this->string(20),
                'iso_moneda' =>$this->string(20),
                'nombre_moneda' =>$this->string(100),
                 'PRIMARY KEY (`id_pais`)'
            ],'ENGINE=InnoDB'
            );

        } else {

            if (!$exist_table->getColumn('id_pais'))
                $this->addColumn('pais', 'id_pais', $this->integer(10)->append('AUTO_INCREMENT')->notNull()->unique());

            if (!$exist_table->getColumn('nombre'))
                $this->addColumn('pais', 'nombre', $this->string(50)->notNull());
             else{

                $this->alterColumn('pais', 'nombre', 'VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('iso2'))
                $this->addColumn('pais', 'iso2', $this->string(20)->notNull());
             else{

                $this->alterColumn('pais', 'iso2', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('iso3'))
                $this->addColumn('pais', 'iso3', $this->string(20)->notNull());
             else{

                $this->alterColumn('pais', 'iso3', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('prefijo'))
                $this->addColumn('pais', 'prefijo', $this->string(20)->notNull());
             else{

                $this->alterColumn('pais', 'prefijo', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL ');

                }
            if (!$exist_table->getColumn('continente'))
                $this->addColumn('pais', 'continente', $this->string(20));
             else{

                $this->alterColumn('pais', 'continente', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('subcontinente'))
                $this->addColumn('pais', 'subcontinente', $this->string(20));
             else{

                $this->alterColumn('pais', 'subcontinente', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('iso_moneda'))
                $this->addColumn('pais', 'iso_moneda', $this->string(20));
             else{

                $this->alterColumn('pais', 'iso_moneda', 'VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            if (!$exist_table->getColumn('nombre_moneda'))
                $this->addColumn('pais', 'nombre_moneda', $this->string(100));
             else{

                $this->alterColumn('pais', 'nombre_moneda', 'VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  ');

                }
            }
        /*Generating index*/

        /*Generating foreignkey*/


    }

   public function down()
    {
        echo 'M201228_111215_Pais cannot be reverted.';


        return false;
    }
    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo M201228_111215_Pais cannot be reverted.


        return false;
    }
    */
}
