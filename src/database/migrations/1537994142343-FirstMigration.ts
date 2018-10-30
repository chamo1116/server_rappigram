import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1537994142343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(50) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `role_id` int NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `description` varchar(100) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `permissions` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `description` varchar(100) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles_has_permissions` (`role_id` int NOT NULL, `permission_id` int NOT NULL, PRIMARY KEY (`role_id`, `permission_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)");
        await queryRunner.query("ALTER TABLE `roles_has_permissions` ADD CONSTRAINT `FK_2ae558c5fda877f068bf7a6b877` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `roles_has_permissions` ADD CONSTRAINT `FK_f9cde1fc9ba1b624e4862652e48` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `roles_has_permissions` DROP FOREIGN KEY `FK_f9cde1fc9ba1b624e4862652e48`");
        await queryRunner.query("ALTER TABLE `roles_has_permissions` DROP FOREIGN KEY `FK_2ae558c5fda877f068bf7a6b877`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_a2cecd1a3531c0b041e29ba46e1`");
        await queryRunner.query("DROP TABLE `roles_has_permissions`");
        await queryRunner.query("DROP TABLE `permissions`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
