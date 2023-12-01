/*
  Warnings:

  - You are about to drop the column `createAt` on the `LogModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
