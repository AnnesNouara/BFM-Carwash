CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"service" varchar(50) NOT NULL,
	"vehicle_type" varchar(50) NOT NULL,
	"extra" varchar(50) NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"duration" integer NOT NULL,
	"price" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
