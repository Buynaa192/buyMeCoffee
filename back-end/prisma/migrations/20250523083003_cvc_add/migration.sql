/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `successMessage` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `CVC` to the `BankCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankCard" ADD COLUMN     "CVC" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "backgroundImage",
DROP COLUMN "successMessage";
