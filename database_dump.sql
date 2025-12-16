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
CREATE ROLE anon;
ALTER ROLE anon WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticated;
ALTER ROLE authenticated WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticator;
ALTER ROLE authenticator WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE dashboard_user;
ALTER ROLE dashboard_user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE pgbouncer;
ALTER ROLE pgbouncer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE service_role;
ALTER ROLE service_role WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_admin;
ALTER ROLE supabase_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE supabase_auth_admin;
ALTER ROLE supabase_auth_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_read_only_user;
ALTER ROLE supabase_read_only_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_realtime_admin;
ALTER ROLE supabase_realtime_admin WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_replication_admin;
ALTER ROLE supabase_replication_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE supabase_storage_admin;
ALTER ROLE supabase_storage_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
--
-- User Configurations
--
--
-- User Config "anon"
--
ALTER ROLE anon SET statement_timeout TO '3s';
--
-- User Config "authenticated"
--
ALTER ROLE authenticated SET statement_timeout TO '8s';
--
-- User Config "authenticator"
--
ALTER ROLE authenticator SET session_preload_libraries TO 'safeupdate';
ALTER ROLE authenticator SET statement_timeout TO '8s';
ALTER ROLE authenticator SET lock_timeout TO '8s';
--
-- User Config "postgres"
--
ALTER ROLE postgres SET search_path TO E'\\$user', 'public', 'extensions';
--
-- User Config "supabase_admin"
--
ALTER ROLE supabase_admin SET search_path TO '$user', 'public', 'auth', 'extensions';
ALTER ROLE supabase_admin SET log_statement TO 'none';
--
-- User Config "supabase_auth_admin"
--
ALTER ROLE supabase_auth_admin SET search_path TO 'auth';
ALTER ROLE supabase_auth_admin SET idle_in_transaction_session_timeout TO '60000';
ALTER ROLE supabase_auth_admin SET log_statement TO 'none';
--
-- User Config "supabase_read_only_user"
--
ALTER ROLE supabase_read_only_user SET default_transaction_read_only TO 'on';
--
-- User Config "supabase_storage_admin"
--
ALTER ROLE supabase_storage_admin SET search_path TO 'storage';
ALTER ROLE supabase_storage_admin SET log_statement TO 'none';
--
-- Role memberships
--
GRANT anon TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT anon TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticated TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT authenticated TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO supabase_storage_admin WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT pg_create_subscription TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_read_only_user WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_signal_backend TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT service_role TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
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
CREATE SCHEMA auth;
ALTER SCHEMA auth OWNER TO supabase_admin;
--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--
CREATE SCHEMA extensions;
ALTER SCHEMA extensions OWNER TO postgres;
--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE SCHEMA graphql;
ALTER SCHEMA graphql OWNER TO supabase_admin;
--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE SCHEMA graphql_public;
ALTER SCHEMA graphql_public OWNER TO supabase_admin;
--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--
CREATE SCHEMA pgbouncer;
ALTER SCHEMA pgbouncer OWNER TO pgbouncer;
--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE SCHEMA realtime;
ALTER SCHEMA realtime OWNER TO supabase_admin;
--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE SCHEMA storage;
ALTER SCHEMA storage OWNER TO supabase_admin;
--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--
CREATE SCHEMA vault;
ALTER SCHEMA vault OWNER TO supabase_admin;
--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;
--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';
--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;
--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';
--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS pg_crypto WITH SCHEMA extensions;
--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION pg_crypto IS 'cryptographic functions';
--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;
--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
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



