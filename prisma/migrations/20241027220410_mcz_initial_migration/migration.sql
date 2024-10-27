-- CreateEnum
CREATE TYPE "public"."BorrowerStatus" AS ENUM ('active', 'inactive', 'ban');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('active', 'inactive', 'ban', 'pending', 'approve', 'rejected');

-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "birthDate" DATE,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR,
    "address" VARCHAR,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loanTypes" (
    "id" TEXT NOT NULL,
    "loan" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loanTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."penalties" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "interest" DECIMAL NOT NULL,

    CONSTRAINT "penalties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loanPlans" (
    "id" TEXT NOT NULL,
    "months" INTEGER NOT NULL,
    "interest" DECIMAL NOT NULL,
    "penaltyId" TEXT NOT NULL,

    CONSTRAINT "loanPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loans" (
    "id" TEXT NOT NULL,
    "refCode" VARCHAR,
    "coMaker" VARCHAR,
    "effectiveDate" DATE NOT NULL,
    "principalLoan" DECIMAL NOT NULL,
    "totalBalance" DECIMAL NOT NULL,
    "unearnedInterest" DECIMAL NOT NULL,
    "penaltyInterest" DECIMAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT NOT NULL,
    "loanTypesId" TEXT NOT NULL,
    "borrowersId" TEXT NOT NULL,
    "loanPlanId" TEXT NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."borrowers" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "email" VARCHAR,
    "phoneNumber" VARCHAR,
    "status" "public"."BorrowerStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrowers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" TEXT NOT NULL,
    "refCode" VARCHAR NOT NULL,
    "datePay" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "loanId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."loanPlans" ADD CONSTRAINT "loanPlans_penaltyId_fkey" FOREIGN KEY ("penaltyId") REFERENCES "public"."penalties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_borrowersId_fkey" FOREIGN KEY ("borrowersId") REFERENCES "public"."borrowers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_loanTypesId_fkey" FOREIGN KEY ("loanTypesId") REFERENCES "public"."loanTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_loanPlanId_fkey" FOREIGN KEY ("loanPlanId") REFERENCES "public"."loanPlans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "public"."loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enable RLS in users
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in loanTypes
ALTER TABLE "public"."loanTypes" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in penalties
ALTER TABLE "public"."penalties" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in loanPlans
ALTER TABLE "public"."loanPlans" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in loans
ALTER TABLE "public"."loans" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in borrowers
ALTER TABLE "public"."borrowers" ENABLE ROW LEVEL SECURITY;

-- Enable RLS in payments
ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;