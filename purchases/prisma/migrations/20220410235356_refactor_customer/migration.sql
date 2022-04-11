/*
  Warnings:

  - You are about to drop the column `custumerId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `Custumer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_custumerId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "custumerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Custumer";

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
