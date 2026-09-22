import {
    pgTable,
    serial,
    varchar,
    integer,
    date,
    time,
    timestamp,
    text
} from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
    id: serial("id").primaryKey(),

    customerName: varchar("customer_name", {
        length: 100
    }).notNull(),

    email: varchar("email", {
        length: 255
    }).notNull(),

    phone: varchar("phone", {
        length: 30
    }).notNull(),

    service: varchar("service", {
        length: 50
    }).notNull(),

    vehicleType: varchar("vehicle_type", {
        length: 50
    }).notNull(),

    extra: varchar("extra", {
        length: 50
    }).notNull(),

    date: date("date").notNull(),

    time: time("time").notNull(),

    duration: integer("duration").notNull(),

    price: integer("price").notNull(),

    status: text("status")
        .notNull()
        .default("pending"),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull()
});