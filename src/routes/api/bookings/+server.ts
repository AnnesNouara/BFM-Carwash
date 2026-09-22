import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { bookings } from "$lib/server/db/schema";
import { Resend } from "resend";
import { env } from "$env/dynamic/private";
import { and, eq, gte, lt } from "drizzle-orm";

const resend = new Resend(env.RESEND_API_KEY);

const services = {
    "car-wash": {
        name: "Car Wash",
        duration: 15,
        price: 15
    },
    "mini-valet": {
        name: "Mini Valet",
        duration: 45,
        price: 45
    },
    "full-valet": {
        name: "Full Valet",
        duration: 120,
        price: 65
    }
} as const;

const extras = {
    "ceramic-coating": {
        name: "Ceramic Coating",
        price: 60
    },
    polishing: {
        name: "Polishing",
        price: 25
    },
    none: {
        name: "No Thanks",
        price: 0
    }
} as const;

const vehicleTypes = {
    car: "Car",
    "jeep-suv": "Jeep / SUV",
    "small-van": "Small Van",
    "large-van": "Large Van"
} as const;

function timeToMinutes(time: string) {
    const [hours, minutes] = time
        .split(":")
        .map(Number);

    return hours * 60 + minutes;
}

/*
|--------------------------------------------------------------------------
| GET — Check availability
|--------------------------------------------------------------------------
*/

export async function GET({ url }) {
    try {
        const date = url.searchParams.get("date");
        const year = url.searchParams.get("year");
        const month = url.searchParams.get("month");

        /*
        |--------------------------------------------------------------------------
        | Get bookings for a specific date
        |--------------------------------------------------------------------------
        */

        if (date) {
            const existingBookings = await db
                .select({
                    time: bookings.time,
                    duration: bookings.duration
                })
                .from(bookings)
                .where(
                    and(
                        eq(bookings.date, date),
                        eq(bookings.status, "pending")
                    )
                );

            return json({
                success: true,
                bookings: existingBookings
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Get bookings for an entire month
        |--------------------------------------------------------------------------
        */

        if (year && month) {
            const monthNumber = Number(month);

            if (
                Number.isNaN(Number(year)) ||
                Number.isNaN(monthNumber) ||
                monthNumber < 1 ||
                monthNumber > 12
            ) {
                return json(
                    {
                        success: false,
                        message: "Invalid month."
                    },
                    { status: 400 }
                );
            }

            const startDate =
                `${year}-${String(monthNumber).padStart(2, "0")}-01`;

            const nextMonth = new Date(
                Number(year),
                monthNumber,
                1
            );

            const endDate =
                `${nextMonth.getFullYear()}-${String(
                    nextMonth.getMonth() + 1
                ).padStart(2, "0")}-01`;

            const existingBookings = await db
                .select({
                    date: bookings.date,
                    time: bookings.time,
                    duration: bookings.duration
                })
                .from(bookings)
                .where(
                    and(
                        gte(bookings.date, startDate),
                        lt(bookings.date, endDate),
                        eq(bookings.status, "pending")
                    )
                );

            return json({
                success: true,
                bookings: existingBookings
            });
        }

        /*
        |--------------------------------------------------------------------------
        | No date/month supplied
        |--------------------------------------------------------------------------
        */

        return json(
            {
                success: false,
                message: "Date or month is required."
            },
            { status: 400 }
        );
    } catch (error) {
        console.error(
            "Availability error:",
            error
        );

        return json(
            {
                success: false,
                message: "Could not load availability."
            },
            { status: 500 }
        );
    }
}

/*
|--------------------------------------------------------------------------
| POST — Create booking
|--------------------------------------------------------------------------
*/

export async function POST({ request }) {
    try {
        const body = await request.json();

        const {
            customerName,
            email,
            phone,
            serviceId,
            vehicleTypeId,
            extraId,
            date,
            time
        } = body;

        /*
        |--------------------------------------------------------------------------
        | Basic validation
        |--------------------------------------------------------------------------
        */

        if (
            !customerName ||
            !email ||
            !phone ||
            !serviceId ||
            !vehicleTypeId ||
            !extraId ||
            !date ||
            !time
        ) {
            return json(
                {
                    success: false,
                    message: "Please complete all booking details."
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Validate service
        |--------------------------------------------------------------------------
        */

        const service =
            services[
                serviceId as keyof typeof services
            ];

        const extra =
            extras[
                extraId as keyof typeof extras
            ];

        const vehicleType =
            vehicleTypes[
                vehicleTypeId as keyof typeof vehicleTypes
            ];

        if (!service || !extra || !vehicleType) {
            return json(
                {
                    success: false,
                    message: "Invalid booking selection."
                },
                { status: 400 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Validate email
        |--------------------------------------------------------------------------
        */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return json(
                {
                    success: false,
                    message: "Please enter a valid email address."
                },
                { status: 400 }
            );
        }

        const totalPrice =
            service.price + extra.price;

        /*
        |--------------------------------------------------------------------------
        | Check for overlapping bookings
        |--------------------------------------------------------------------------
        */

        const existingBookings = await db
            .select({
                time: bookings.time,
                duration: bookings.duration
            })
            .from(bookings)
            .where(
                and(
                    eq(bookings.date, date),
                    eq(bookings.status, "pending")
                )
            );

        const newStart =
            timeToMinutes(time);

        const newEnd =
            newStart + service.duration;

        const hasConflict =
            existingBookings.some((booking) => {
                const existingStart =
                    timeToMinutes(booking.time);

                const existingEnd =
                    existingStart + booking.duration;

                return (
                    newStart < existingEnd &&
                    newEnd > existingStart
                );
            });

        if (hasConflict) {
            return json(
                {
                    success: false,
                    message:
                        "That time is no longer available. Please choose another time."
                },
                { status: 409 }
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Create booking
        |--------------------------------------------------------------------------
        */

        const [booking] = await db
            .insert(bookings)
            .values({
                customerName: customerName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                service: service.name,
                vehicleType,
                extra: extra.name,
                date,
                time,
                duration: service.duration,
                price: totalPrice,
                status: "pending"
            })
            .returning({
                id: bookings.id
            });

        /*
        |--------------------------------------------------------------------------
        | Email BFM
        |--------------------------------------------------------------------------
        */

        const { error: emailError } =
            await resend.emails.send({
                from:
                    "BFM Carwash <onboarding@resend.dev>",

                to: [env.BOOKING_EMAIL!],

                subject:
                    `New BFM Booking #${booking.id}`,

                html: `
                    <div
                        style="
                            font-family: Arial, sans-serif;
                            max-width: 600px;
                            margin: 0 auto;
                        "
                    >

                        <h1 style="color: #2563eb;">
                            New Booking Received
                        </h1>

                        <p>
                            A new booking has been made
                            through the BFM Carwash website.
                        </p>

                        <hr />

                        <h2>
                            Booking #${booking.id}
                        </h2>

                        <p>
                            <strong>Customer:</strong>
                            ${customerName}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${email}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${phone}
                        </p>

                        <hr />

                        <p>
                            <strong>Service:</strong>
                            ${service.name}
                        </p>

                        <p>
                            <strong>Vehicle:</strong>
                            ${vehicleType}
                        </p>

                        <p>
                            <strong>Extra:</strong>
                            ${extra.name}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${date}
                        </p>

                        <p>
                            <strong>Time:</strong>
                            ${time}
                        </p>

                        <h2>
                            Total: €${totalPrice}
                        </h2>

                        <p>
                            <strong>Status:</strong>
                            Pending
                        </p>

                    </div>
                `
            });

        if (emailError) {
            console.error(
                "Resend error:",
                emailError
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Confirmation email to customer
        |--------------------------------------------------------------------------
        */

        const {
            error: customerEmailError
        } = await resend.emails.send({
            from:
                "BFM Carwash <onboarding@resend.dev>",

            to: [email],

            subject:
                `Booking Confirmed - BFM Carwash #${booking.id}`,

            html: `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        color: #111827;
                    "
                >

                    <div
                        style="
                            background: #2563eb;
                            padding: 24px;
                            text-align: center;
                        "
                    >
                        <h1
                            style="
                                color: white;
                                margin: 0;
                            "
                        >
                            BFM Carwash
                        </h1>
                    </div>

                    <div style="padding: 24px;">

                        <h2>
                            Booking Confirmed ✓
                        </h2>

                        <p>
                            Hi ${customerName},
                        </p>

                        <p>
                            Your booking with BFM Carwash
                            has been confirmed.
                        </p>

                        <div
                            style="
                                background: #f3f4f6;
                                padding: 20px;
                                margin: 20px 0;
                            "
                        >

                            <h3 style="margin-top: 0;">
                                Booking #${booking.id}
                            </h3>

                            <p>
                                <strong>Service:</strong>
                                ${service.name}
                            </p>

                            <p>
                                <strong>Vehicle:</strong>
                                ${vehicleType}
                            </p>

                            <p>
                                <strong>Extra:</strong>
                                ${extra.name}
                            </p>

                            <p>
                                <strong>Date:</strong>
                                ${date}
                            </p>

                            <p>
                                <strong>Time:</strong>
                                ${time}
                            </p>

                            <p>
                                <strong>Total:</strong>
                                €${totalPrice}
                            </p>

                        </div>

                        <p>
                            Please arrive a few minutes
                            before your appointment.
                        </p>

                        <p>
                            If you need to make any changes
                            to your booking, please contact
                            BFM Carwash.
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            085 192 1882
                        </p>

                        <p>
                            Dundalk Retail Park,<br>
                            Inner Relief Road,<br>
                            Marshes Upper,<br>
                            Dundalk, Co. Louth,<br>
                            A91 KD5X
                        </p>

                        <hr
                            style="
                                border: 0;
                                border-top:
                                    1px solid #e5e7eb;
                                margin: 24px 0;
                            "
                        >

                        <p
                            style="
                                color: #6b7280;
                                font-size: 14px;
                            "
                        >
                            Thank you for choosing
                            BFM Carwash.
                        </p>

                    </div>

                </div>
            `
        });

        if (customerEmailError) {
            console.error(
                "Customer email error:",
                customerEmailError
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Success
        |--------------------------------------------------------------------------
        */

        return json({
            success: true,
            bookingId: booking.id
        });

    } catch (error) {
        console.error(
            "Booking error:",
            error
        );

        return json(
            {
                success: false,
                message:
                    "Something went wrong while creating your booking."
            },
            { status: 500 }
        );
    }
}