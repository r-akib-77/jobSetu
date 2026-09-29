/*
  Warnings:

  - Made the column `lastSentAt` on table `PendingRegistration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PendingRegistration" ADD COLUMN     "resendCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastSentAt" SET NOT NULL;
