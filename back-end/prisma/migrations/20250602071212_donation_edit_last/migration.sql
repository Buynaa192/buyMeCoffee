/*
  Warnings:

  - Added the required column `createdAt` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
