/*
  Warnings:

  - Added the required column `movement_type` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movement` ADD COLUMN `movement_type` VARCHAR(191) NOT NULL;
