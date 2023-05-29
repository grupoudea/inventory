/*
  Warnings:

  - You are about to alter the column `movement_type` on the `Movement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Movement` MODIFY `movement_type` ENUM('ENTRADA', 'SALIDA') NOT NULL;
