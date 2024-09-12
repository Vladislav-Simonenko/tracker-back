-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MASTER');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "verificationToken" TEXT NOT NULL,
    "resetToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");
