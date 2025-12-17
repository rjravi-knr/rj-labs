CREATE TABLE IF NOT EXISTS "users" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"tenant_id" varchar(32) NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(150),
	"first_name" varchar(150),
	"last_name" varchar(150),
	"full_name" varchar(255),
	"display_name" varchar(150),
	"member_code" varchar(50),
	"password_hash" varchar(255),
	"is_super_admin" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"email_verified_timestamp" timestamp,
	"phone_verified" boolean DEFAULT false NOT NULL,
	"phone_verified_timestamp" timestamp,
	"user_verified" boolean DEFAULT false NOT NULL,
	"user_verified_timestamp" timestamp,
	"reset_token" varchar(255),
	"reset_token_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" bigint NOT NULL,
	"tenant_id" varchar(256) NOT NULL,
	"token" varchar(255) NOT NULL,
	"auth_method" varchar(50),
	"ip_address" varchar(45),
	"user_agent" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otp_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" varchar(256) NOT NULL,
	"identifier" varchar(256) NOT NULL,
	"code" varchar(20) NOT NULL,
	"type" varchar(50) NOT NULL,
	"channel" varchar(50) NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" bigint NOT NULL,
	"type" varchar(50) NOT NULL,
	"provider" varchar(50) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"access_token" varchar,
	"refresh_token" varchar,
	"expires_at" timestamp,
	"token_type" varchar(50),
	"scope" varchar(255),
	"id_token" varchar,
	"session_state" varchar(255),
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enabled_providers" jsonb DEFAULT '["email_password"]'::jsonb NOT NULL,
	"provider_config" jsonb,
	"sso_config" jsonb,
	"password_policy" jsonb DEFAULT '{"minLength":8}'::jsonb,
	"otp_policy" jsonb,
	"pin_policy" jsonb,
	"login_methods" jsonb,
	"mfa_enabled" boolean DEFAULT false NOT NULL,
	"self_registration_enabled" boolean DEFAULT true NOT NULL,
	"terms_url" varchar(512),
	"privacy_url" varchar(512),
	"name" varchar(255),
	"email_policy" jsonb,
	"settings" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_config_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"config_id" uuid NOT NULL,
	"snapshot" jsonb NOT NULL,
	"changed_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_config_history" ADD CONSTRAINT "auth_config_history_config_id_auth_config_id_fk" FOREIGN KEY ("config_id") REFERENCES "public"."auth_config"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId_unique_idx" ON "accounts" USING btree ("provider","provider_account_id");