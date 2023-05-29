-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_rol_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `rol_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
