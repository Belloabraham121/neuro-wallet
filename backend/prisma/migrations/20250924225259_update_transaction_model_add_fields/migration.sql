/*
  Warnings:

  - You are about to drop the column `recipient` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "recipient",
ADD COLUMN     "fromAddress" TEXT,
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "toAddress" TEXT;
