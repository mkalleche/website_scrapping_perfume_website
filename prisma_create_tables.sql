-- ============================================
-- SQL to Create Tables from Prisma Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- First, create all Enum Types
CREATE TYPE public."UserRole" AS ENUM ('ADMIN', 'BUYER');
CREATE TYPE public."OrderStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE public."ProductStatus" AS ENUM ('CONCEPT', 'ACTIEF', 'NIET_BESCHIKBAAR', 'VERVALLEN');
CREATE TYPE public."ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE public."PicklistStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE public."PickItemStatus" AS ENUM ('PENDING', 'PICKED', 'PARTIALLY_PICKED', 'OUT_OF_STOCK');
CREATE TYPE public."POSSessionStatus" AS ENUM ('ACTIVE', 'PAUSED', 'CLOSED', 'CANCELLED');
CREATE TYPE public."POSTransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED');
CREATE TYPE public."PaymentMethod" AS ENUM ('CASH', 'CARD', 'BANK_TRANSFER', 'MOBILE_PAYMENT', 'GIFT_CARD', 'OTHER');
CREATE TYPE public."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');
CREATE TYPE public."ScrapingHealthStatus" AS ENUM ('HEALTHY', 'DEGRADED', 'UNHEALTHY', 'OFFLINE');
CREATE TYPE public."ScrapingJobStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');
CREATE TYPE public."ScrapingAlertType" AS ENUM ('MARGIN_OPPORTUNITY', 'PRICE_DROP', 'COMPETITOR_ALERT', 'SUPPLY_ISSUE', 'DATA_QUALITY');

-- Note: The actual CREATE TABLE statements need to be generated from your Prisma schema
-- For now, use Prisma to generate them:
-- 1. Fix IP allowlist in Supabase
-- 2. Run: npx prisma db push --skip-generate
-- 
-- OR manually create tables based on prisma/schema.prisma

-- ============================================
-- IMPORTANT: After creating tables, restore your data
-- ============================================
-- 1. Go to Supabase SQL Editor
-- 2. Copy content from database_dump_public_only.sql
-- 3. Paste and run to restore your data



