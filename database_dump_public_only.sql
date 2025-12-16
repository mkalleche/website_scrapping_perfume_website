--
-- PostgreSQL database cluster dump
--
\restrict KpEL57aQx0Ow8deeQIwXHNMmLE8oZhbjATbOZJozpYLbyC7FVzSbuF4axF7lSUI
SET default_transaction_read_only = off;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
--
-- Roles
--
--
-- User Configurations
--
--
-- User Config "anon"
--
--
-- User Config "authenticated"
--
--
-- User Config "authenticator"
--
--
-- User Config "postgres"
--
--
-- User Config "supabase_admin"
--
--
-- User Config "supabase_auth_admin"
--
--
-- User Config "supabase_read_only_user"
--
--
-- User Config "supabase_storage_admin"
--
--
-- Role memberships
--
GRANT anon TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticated TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_create_subscription TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_signal_backend TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT service_role TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT supabase_realtime_admin TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
\unrestrict KpEL57aQx0Ow8deeQIwXHNMmLE8oZhbjATbOZJozpYLbyC7FVzSbuF4axF7lSUI
--
-- Databases
--
--
-- Database "template1" dump
--
\connect template1
--
-- PostgreSQL database dump
--
\restrict gqms4X4PDvh2fUjEm87EWEkLOu7TcNTiAzyse9fOV6z2qOibZe6l6xsYJaqfyeH
-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg12+1)
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- PostgreSQL database dump complete
--
\unrestrict gqms4X4PDvh2fUjEm87EWEkLOu7TcNTiAzyse9fOV6z2qOibZe6l6xsYJaqfyeH
--
-- Database "postgres" dump
--
\connect postgres
--
-- PostgreSQL database dump
--
\restrict QgBFYExayt0UsIxxpsTInkujcDxMCdIP4aToLhVEyisUj63B7dbKiwKeF6m6acb
-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg12+1)
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED'
);
ALTER TYPE public."OrderStatus" OWNER TO postgres;
--
-- Name: POSSessionStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."POSSessionStatus" AS ENUM (
    'ACTIVE',
    'PAUSED',
    'CLOSED',
    'CANCELLED'
);
ALTER TYPE public."POSSessionStatus" OWNER TO postgres;
--
-- Name: POSTransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."POSTransactionStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'CANCELLED',
    'REFUNDED'
);
ALTER TYPE public."POSTransactionStatus" OWNER TO postgres;
--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."PaymentMethod" AS ENUM (
    'CASH',
    'CARD',
    'BANK_TRANSFER',
    'MOBILE_PAYMENT',
    'GIFT_CARD',
    'OTHER'
);
ALTER TYPE public."PaymentMethod" OWNER TO postgres;
--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'PARTIALLY_REFUNDED'
);
ALTER TYPE public."PaymentStatus" OWNER TO postgres;
--
-- Name: PickItemStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."PickItemStatus" AS ENUM (
    'PENDING',
    'PICKED',
    'PARTIALLY_PICKED',
    'OUT_OF_STOCK'
);
ALTER TYPE public."PickItemStatus" OWNER TO postgres;
--
-- Name: PicklistStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."PicklistStatus" AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
);
ALTER TYPE public."PicklistStatus" OWNER TO postgres;
--
-- Name: ProductStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."ProductStatus" AS ENUM (
    'CONCEPT',
    'ACTIEF',
    'NIET_BESCHIKBAAR',
    'VERVALLEN'
);
ALTER TYPE public."ProductStatus" OWNER TO postgres;
--
-- Name: ReviewStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."ReviewStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);
ALTER TYPE public."ReviewStatus" OWNER TO postgres;
--
-- Name: ScrapingAlertType; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."ScrapingAlertType" AS ENUM (
    'MARGIN_OPPORTUNITY',
    'PRICE_DROP',
    'COMPETITOR_ALERT',
    'SUPPLY_ISSUE',
    'DATA_QUALITY'
);
ALTER TYPE public."ScrapingAlertType" OWNER TO postgres;
--
-- Name: ScrapingHealthStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."ScrapingHealthStatus" AS ENUM (
    'HEALTHY',
    'DEGRADED',
    'UNHEALTHY',
    'OFFLINE'
);
ALTER TYPE public."ScrapingHealthStatus" OWNER TO postgres;
--
-- Name: ScrapingJobStatus; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."ScrapingJobStatus" AS ENUM (
    'PENDING',
    'RUNNING',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);
ALTER TYPE public."ScrapingJobStatus" OWNER TO postgres;
--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--
CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'BUYER'
);
ALTER TYPE public."UserRole" OWNER TO postgres;