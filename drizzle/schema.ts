import { pgTable, serial, varchar, date, time, integer, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const bookings = pgTable("bookings", {
	id: serial().primaryKey().notNull(),
	customerName: varchar("customer_name", { length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 30 }).notNull(),
	service: varchar({ length: 50 }).notNull(),
	vehicleType: varchar("vehicle_type", { length: 50 }).notNull(),
	extra: varchar({ length: 50 }).notNull(),
	date: date().notNull(),
	time: time().notNull(),
	duration: integer().notNull(),
	price: integer().notNull(),
	status: text().default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
