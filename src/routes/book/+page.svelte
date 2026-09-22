<script lang="ts">
    type Service = {
        id: string;
        name: string;
        description: string;
        price: number;
        duration: number;
        icon: string;
    };

    type VehicleType = {
        id: string;
        name: string;
        description: string;
        icon: string;
    };

    type Extra = {
        id: string;
        name: string;
        description: string;
        price: number;
        icon: string;
    };

    type BookedSlot = {
        time: string;
        duration: number;
    };

    type CalendarDay = {
        date: string;
        day: number;
        isCurrentMonth: boolean;
    };

    const services: Service[] = [
        {
            id: "car-wash",
            name: "Car Wash",
            description: "A quick exterior clean to leave your car looking fresh.",
            price: 15,
            duration: 15,
            icon: "🚗"
        },
        {
            id: "mini-valet",
            name: "Mini Valet",
            description: "A quick interior and exterior clean for your vehicle.",
            price: 45,
            duration: 45,
            icon: "✨"
        },
        {
            id: "full-valet",
            name: "Full Valet",
            description: "A complete interior and exterior valet for your vehicle.",
            price: 65,
            duration: 120,
            icon: "💎"
        }
    ];

    const vehicleTypes: VehicleType[] = [
        {
            id: "car",
            name: "Car",
            description: "Standard car",
            icon: "🚗"
        },
        {
            id: "jeep-suv",
            name: "Jeep / SUV",
            description: "Larger car or SUV",
            icon: "🚙"
        },
        {
            id: "small-van",
            name: "Small Van",
            description: "Small commercial van",
            icon: "🚐"
        },
        {
            id: "large-van",
            name: "Large Van",
            description: "Large commercial van",
            icon: "🚌"
        }
    ];

    const extras: Extra[] = [
        {
            id: "ceramic-coating",
            name: "Ceramic Coating",
            description:
                "Add an extra layer of protection and shine to your vehicle.",
            price: 60,
            icon: "💎"
        },
        {
            id: "polishing",
            name: "Polishing",
            description:
                "Give your vehicle an enhanced shine and smoother finish.",
            price: 25,
            icon: "✨"
        },
        {
            id: "none",
            name: "No Thanks",
            description:
                "Continue without adding any extras to your booking.",
            price: 0,
            icon: "✓"
        }
    ];

    let selectedService = $state<Service | null>(null);
    let selectedVehicle = $state<VehicleType | null>(null);
    let selectedExtras = $state<string[]>(["none"]);

    let selectedDate = $state("");
    let selectedTime = $state("");

    let customerName = $state("");
    let customerPhone = $state("");
    let customerEmail = $state("");

    let isSubmitting = $state(false);
    let bookingMessage = $state("");
    let bookingSuccess = $state(false);

    let calendarMonth = $state(new Date().getMonth());
    let calendarYear = $state(new Date().getFullYear());

    let bookedSlots = $state<BookedSlot[]>([]);
    let monthlyBookings = $state<Record<string, BookedSlot[]>>({});
    let loadingAvailability = $state(false);

    const openingHour = 9;
    const closingHour = 18;

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    function formatPrice(price: number) {
        return `€${price}`;
    }

    function formatTime(time: string) {
        const [hours, minutes] = time
            .split(":")
            .map(Number);

        const period = hours >= 12 ? "PM" : "AM";
        const displayHour =
            hours % 12 === 0 ? 12 : hours % 12;

        return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
    }

    function timeToMinutes(time: string) {
        const [hours, minutes] = time
            .split(":")
            .map(Number);

        return hours * 60 + minutes;
    }

    function getSelectedExtra() {
        const extraId = selectedExtras[0] ?? "none";

        return (
            extras.find(
                (extra) => extra.id === extraId
            ) ?? extras[2]
        );
    }

    function getTotalPrice() {
        if (!selectedService) {
            return 0;
        }

        return (
            selectedService.price +
            getSelectedExtra().price
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Date helpers
    |--------------------------------------------------------------------------
    */

    function toDateString(
        year: number,
        month: number,
        day: number
    ) {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    function getTodayString() {
        const today = new Date();

        return toDateString(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
    }

    function isToday(date: string) {
        return date === getTodayString();
    }

    function isPastDate(date: string) {
        return date < getTodayString();
    }

    function getCalendarDays(): CalendarDay[] {
        const firstDay = new Date(
            calendarYear,
            calendarMonth,
            1
        );

        const lastDay = new Date(
            calendarYear,
            calendarMonth + 1,
            0
        );

        const firstDayOfWeek =
            firstDay.getDay();

        const daysInMonth =
            lastDay.getDate();

        const days: CalendarDay[] = [];

        /*
         * Previous month's trailing days
         */
        for (
            let i = firstDayOfWeek - 1;
            i >= 0;
            i--
        ) {
            const date = new Date(
                calendarYear,
                calendarMonth,
                -i
            );

            days.push({
                date: toDateString(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                ),
                day: date.getDate(),
                isCurrentMonth: false
            });
        }

        /*
         * Current month's days
         */
        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {
            days.push({
                date: toDateString(
                    calendarYear,
                    calendarMonth,
                    day
                ),
                day,
                isCurrentMonth: true
            });
        }

        /*
         * Next month's leading days
         */
        const remaining =
            42 - days.length;

        for (
            let day = 1;
            day <= remaining;
            day++
        ) {
            const date = new Date(
                calendarYear,
                calendarMonth + 1,
                day
            );

            days.push({
                date: toDateString(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                ),
                day: date.getDate(),
                isCurrentMonth: false
            });
        }

        return days;
    }

    function getMonthName() {
        return new Date(
            calendarYear,
            calendarMonth,
            1
        ).toLocaleString("default", {
            month: "long"
        });
    }

    function previousMonth() {
        if (calendarMonth === 0) {
            calendarMonth = 11;
            calendarYear--;
        } else {
            calendarMonth--;
        }
    }

    function nextMonth() {
        if (calendarMonth === 11) {
            calendarMonth = 0;
            calendarYear++;
        } else {
            calendarMonth++;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Time slots
    |--------------------------------------------------------------------------
    */

    function generateTimeSlots(
        duration: number
    ) {
        const slots: string[] = [];

        const openingMinutes =
            openingHour * 60;

        const closingMinutes =
            closingHour * 60;

        for (
            let minutes = openingMinutes;
            minutes + duration <= closingMinutes;
            minutes += 15
        ) {
            const hours =
                Math.floor(minutes / 60);

            const mins =
                minutes % 60;

            slots.push(
                `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
            );
        }

        return slots;
    }

    /*
    |--------------------------------------------------------------------------
    | Availability
    |--------------------------------------------------------------------------
    */

    async function loadAvailability(date: string) {
        if (!date) {
            bookedSlots = [];
            return;
        }

        loadingAvailability = true;

        try {
            const response = await fetch(
                `/api/bookings?date=${encodeURIComponent(date)}`
            );

            const result =
                await response.json();

            if (!response.ok) {
                bookedSlots = [];
                return;
            }

            bookedSlots =
                result.bookings ?? [];
        } catch (error) {
            console.error(
                "Availability error:",
                error
            );

            bookedSlots = [];
        } finally {
            loadingAvailability = false;
        }
    }

    async function loadMonthlyAvailability() {
        loadingAvailability = true;

        try {
            const response = await fetch(
                `/api/bookings?year=${calendarYear}&month=${calendarMonth + 1}`
            );

            const result =
                await response.json();

            if (!response.ok) {
                monthlyBookings = {};
                return;
            }

            const grouped:
                Record<string, BookedSlot[]> = {};

            for (
                const booking of
                result.bookings ?? []
            ) {
                if (
                    !grouped[booking.date]
                ) {
                    grouped[booking.date] = [];
                }

                grouped[booking.date].push({
                    time: booking.time,
                    duration:
                        booking.duration
                });
            }

            monthlyBookings = grouped;
        } catch (error) {
            console.error(
                "Monthly availability error:",
                error
            );

            monthlyBookings = {};
        } finally {
            loadingAvailability = false;
        }
    }

    function isTimeSlotAvailable(
        time: string,
        duration: number
    ) {
        const slotStart =
            timeToMinutes(time);

        const slotEnd =
            slotStart + duration;

        return !bookedSlots.some(
            (booking) => {
                const bookingStart =
                    timeToMinutes(
                        booking.time
                    );

                const bookingEnd =
                    bookingStart +
                    booking.duration;

                return (
                    slotStart < bookingEnd &&
                    slotEnd > bookingStart
                );
            }
        );
    }

    function getAvailableTimeSlots() {
        if (!selectedService) {
            return [];
        }

        return generateTimeSlots(
            selectedService.duration
        ).filter((time) =>
            isTimeSlotAvailable(
                time,
                selectedService.duration
            )
        );
    }

    function isDateFullyBooked(
        date: string
    ) {
        if (!selectedService) {
            return false;
        }

        const bookingsForDate =
            monthlyBookings[date] ?? [];

        const timeSlots =
            generateTimeSlots(
                selectedService.duration
            );

        return timeSlots.every(
            (time) => {
                const slotStart =
                    timeToMinutes(time);

                const slotEnd =
                    slotStart +
                    selectedService.duration;

                return bookingsForDate.some(
                    (booking) => {
                        const bookingStart =
                            timeToMinutes(
                                booking.time
                            );

                        const bookingEnd =
                            bookingStart +
                            booking.duration;

                        return (
                            slotStart <
                                bookingEnd &&
                            slotEnd >
                                bookingStart
                        );
                    }
                );
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Selection
    |--------------------------------------------------------------------------
    */

    function selectService(
        service: Service
    ) {
        selectedService = service;
        selectedTime = "";

        /*
         * Reload monthly availability because
         * a different service has a different duration.
         */
        loadMonthlyAvailability();

        if (selectedDate) {
            loadAvailability(
                selectedDate
            );
        }
    }

    function selectVehicle(
        vehicle: VehicleType
    ) {
        selectedVehicle = vehicle;
    }

    function toggleExtra(
        extraId: string
    ) {
        selectedExtras = [extraId];
    }

    async function selectDate(
        date: string
    ) {
        if (
            !date ||
            isPastDate(date)
        ) {
            return;
        }

        if (
            selectedService &&
            isDateFullyBooked(date)
        ) {
            return;
        }

        selectedDate = date;
        selectedTime = "";

        await loadAvailability(date);
    }

    /*
    |--------------------------------------------------------------------------
    | Booking
    |--------------------------------------------------------------------------
    */

    async function submitBooking() {
        bookingMessage = "";
        bookingSuccess = false;

        if (!selectedService) {
            bookingMessage =
                "Please select a service.";

            return;
        }

        if (!selectedVehicle) {
            bookingMessage =
                "Please select a vehicle type.";

            return;
        }

        if (!selectedDate) {
            bookingMessage =
                "Please select a date.";

            return;
        }

        if (!selectedTime) {
            bookingMessage =
                "Please select a time.";

            return;
        }

        if (!customerName.trim()) {
            bookingMessage =
                "Please enter your name.";

            return;
        }

        if (!customerPhone.trim()) {
            bookingMessage =
                "Please enter your phone number.";

            return;
        }

        if (!customerEmail.trim()) {
            bookingMessage =
                "Please enter your email address.";

            return;
        }

        isSubmitting = true;

        try {
            /*
             * Final client-side availability check
             */
            if (
                !isTimeSlotAvailable(
                    selectedTime,
                    selectedService.duration
                )
            ) {
                selectedTime = "";

                bookingMessage =
                    "That time is no longer available. Please choose another time.";

                return;
            }

            const response = await fetch(
                "/api/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        customerName:
                            customerName.trim(),

                        email:
                            customerEmail.trim(),

                        phone:
                            customerPhone.trim(),

                        serviceId:
                            selectedService.id,

                        vehicleTypeId:
                            selectedVehicle.id,

                        extraId:
                            selectedExtras[0] ??
                            "none",

                        date:
                            selectedDate,

                        time:
                            selectedTime
                    })
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                bookingMessage =
                    result.message ??
                    "Something went wrong while creating your booking.";

                return;
            }

            bookingSuccess = true;

            bookingMessage =
                `Booking confirmed! Your booking number is #${result.bookingId}.`;

            /*
             * Refresh availability after
             * successfully creating the booking.
             */
            await loadAvailability(
                selectedDate
            );

            await loadMonthlyAvailability();

            /*
             * If another booking somehow took
             * the selected slot, clear it.
             */
            if (
                selectedService &&
                !isTimeSlotAvailable(
                    selectedTime,
                    selectedService.duration
                )
            ) {
                selectedTime = "";
            }
        } catch (error) {
            console.error(
                "Booking submission error:",
                error
            );

            bookingMessage =
                "Something went wrong. Please try again.";
        } finally {
            isSubmitting = false;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Load monthly availability when the
    | calendar month or service changes
    |--------------------------------------------------------------------------
    */

    $effect(() => {
        calendarYear;
        calendarMonth;
        selectedService;

        loadMonthlyAvailability();
    });
</script>

<svelte:head>
    <title>Book an Appointment | BFM Carwash</title>
    <meta
        name="description"
        content="Book your car wash or valet appointment with BFM Carwash in Dundalk."
    />
</svelte:head>

<div class="min-h-screen bg-black text-white">
    <div
        class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
        <!-- Header -->

        <div class="mb-10">
            <a
                href="/"
                class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
            >
                ← Back to home
            </a>

            <h1
                class="text-3xl font-black tracking-tight sm:text-4xl"
            >
                Book an Appointment
            </h1>

            <p class="mt-2 text-gray-400">
                Choose your service, date and time.
            </p>
        </div>

        <!-- Main content -->

        <div class="space-y-10">
            <!-- Service -->

            <section>
                <div class="mb-5">
                    <h2 class="text-xl font-black">
                        1. Choose a Service
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        Select the service you'd like.
                    </p>
                </div>

                <div
                    class="grid gap-4 md:grid-cols-3"
                >
                    {#each services as service}
                        <button
                            type="button"
                            onclick={() =>
                                selectService(
                                    service
                                )
                            }
                            class={`rounded-2xl border-2 p-5 text-left transition ${
                                selectedService?.id ===
                                service.id
                                    ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                                    : "border-white/10 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900"
                            }`}
                        >
                            <div
                                class="mb-4 flex items-start justify-between"
                            >
                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-2xl"
                                >
                                    {service.icon}
                                </div>

                                {#if selectedService?.id === service.id}
                                    <div
                                        class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-black"
                                    >
                                        ✓
                                    </div>
                                {/if}
                            </div>

                            <h3 class="text-lg font-black">
                                {service.name}
                            </h3>

                            <p
                                class="mt-2 min-h-[48px] text-sm leading-6 text-gray-500"
                            >
                                {service.description}
                            </p>

                            <div
                                class="mt-5 flex items-center justify-between border-t border-white/10 pt-4"
                            >
                                <span
                                    class="text-lg font-black text-white"
                                >
                                    {formatPrice(
                                        service.price
                                    )}
                                </span>

                                <span
                                    class="text-sm font-bold text-gray-500"
                                >
                                    {service.duration ===
                                    120
                                        ? "1–2 hrs"
                                        : `${service.duration} min`}
                                </span>
                            </div>
                        </button>
                    {/each}
                </div>

                {#if selectedService?.id === "full-valet"}
                    <div
                        class="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-400"
                    >
                        Please note: Full valet appointments
                        typically take 1–2 hours, depending
                        on the condition of the vehicle.
                    </div>
                {/if}
            </section>

            <!-- Vehicle -->

            <section>
                <div class="mb-5">
                    <h2 class="text-xl font-black">
                        2. Choose Your Vehicle
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        Select the type of vehicle you're bringing.
                    </p>
                </div>

                <div
                    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {#each vehicleTypes as vehicle}
                        <button
                            type="button"
                            onclick={() =>
                                selectVehicle(
                                    vehicle
                                )
                            }
                            class={`rounded-2xl border-2 p-5 text-left transition ${
                                selectedVehicle?.id ===
                                vehicle.id
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-white/10 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900"
                            }`}
                        >
                            <div
                                class="flex items-center justify-between"
                            >
                                <span class="text-3xl">
                                    {vehicle.icon}
                                </span>

                                {#if selectedVehicle?.id === vehicle.id}
                                    <span
                                        class="text-sm font-black text-blue-400"
                                    >
                                        ✓
                                    </span>
                                {/if}
                            </div>

                            <h3
                                class="mt-4 font-black"
                            >
                                {vehicle.name}
                            </h3>

                            <p
                                class="mt-1 text-sm text-gray-500"
                            >
                                {vehicle.description}
                            </p>
                        </button>
                    {/each}
                </div>
            </section>

            <!-- Extras -->

            <section>
                <div class="mb-5">
                    <h2 class="text-xl font-black">
                        3. Add an Extra
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        Choose one optional extra.
                    </p>
                </div>

                <div
                    class="grid gap-4 md:grid-cols-3"
                >
                    {#each extras as extra}
                        <button
                            type="button"
                            onclick={() =>
                                toggleExtra(
                                    extra.id
                                )
                            }
                            class={`rounded-2xl border-2 p-5 text-left transition ${
                                selectedExtras.includes(
                                    extra.id
                                )
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-white/10 bg-zinc-950 hover:border-blue-500/50 hover:bg-zinc-900"
                            }`}
                        >
                            <div
                                class="flex items-start justify-between"
                            >
                                <div
                                    class="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-xl"
                                >
                                    {extra.icon}
                                </div>

                                {#if selectedExtras.includes(extra.id)}
                                    <div
                                        class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-black"
                                    >
                                        ✓
                                    </div>
                                {/if}
                            </div>

                            <h3
                                class="mt-4 font-black"
                            >
                                {extra.name}
                            </h3>

                            <p
                                class="mt-2 min-h-[48px] text-sm leading-6 text-gray-500"
                            >
                                {extra.description}
                            </p>

                            <div
                                class="mt-4 font-black text-blue-400"
                            >
                                {extra.price === 0
                                    ? "Free"
                                    : `+${formatPrice(extra.price)}`}
                            </div>
                        </button>
                    {/each}
                </div>
            </section>

            <!-- Date -->

            <section>
                <div class="mb-5">
                    <h2 class="text-xl font-black">
                        4. Choose a Date
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        Select an available date.
                    </p>
                </div>

                <div
                    class="rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:p-6"
                >
                    <!-- Calendar header -->

                    <div
                        class="mb-6 flex items-center justify-between"
                    >
                        <button
                            type="button"
                            onclick={previousMonth}
                            class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black text-gray-300 transition hover:border-blue-500 hover:text-white"
                        >
                            ←
                        </button>

                        <div
                            class="text-lg font-black"
                        >
                            {getMonthName()}
                            {calendarYear}
                        </div>

                        <button
                            type="button"
                            onclick={nextMonth}
                            class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black text-gray-300 transition hover:border-blue-500 hover:text-white"
                        >
                            →
                        </button>
                    </div>

                    <!-- Days -->

                    <div
                        class="mb-3 grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-wider text-gray-600 sm:gap-2"
                    >
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>

                    <!-- Calendar -->

                    <div
                        class="grid grid-cols-7 gap-1 sm:gap-2"
                    >
                        {#each getCalendarDays() as calendarDay}
                            <button
                                type="button"
                                onclick={() =>
                                    selectDate(
                                        calendarDay.date
                                    )
                                }
                                disabled={
                                    !calendarDay.isCurrentMonth ||
                                    isPastDate(
                                        calendarDay.date
                                    ) ||
                                    (
                                        selectedService !==
                                            null &&
                                        isDateFullyBooked(
                                            calendarDay.date
                                        )
                                    )
                                }
                                class={`aspect-square rounded-lg text-sm font-bold transition sm:text-base ${
                                    !calendarDay.isCurrentMonth
                                        ? "cursor-default text-gray-800"
                                        : selectedDate ===
                                            calendarDay.date
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : isPastDate(
                                                calendarDay.date
                                            )
                                                ? "cursor-not-allowed text-gray-700"
                                                : selectedService &&
                                                    isDateFullyBooked(
                                                        calendarDay.date
                                                    )
                                                    ? "cursor-not-allowed bg-zinc-950 text-gray-700"
                                                    : isToday(
                                                        calendarDay.date
                                                    )
                                                        ? "border border-blue-500 bg-blue-500/10 text-blue-400"
                                                        : "bg-zinc-900 text-gray-300 hover:bg-blue-600/20 hover:text-white"
                                }`}
                            >
                                {calendarDay.day}
                            </button>
                        {/each}
                    </div>

                    <!-- Calendar legend -->

                    <div
                        class="mt-6 flex flex-wrap gap-4 text-xs text-gray-500"
                    >
                        <div
                            class="flex items-center gap-2"
                        >
                            <div
                                class="h-3 w-3 rounded bg-blue-600"
                            ></div>

                            Selected
                        </div>

                        <div
                            class="flex items-center gap-2"
                        >
                            <div
                                class="h-3 w-3 rounded border border-blue-500 bg-blue-500/10"
                            ></div>

                            Today
                        </div>

                        {#if selectedService}
                            <div
                                class="flex items-center gap-2"
                            >
                                <div
                                    class="h-3 w-3 rounded bg-zinc-950"
                                ></div>

                                Fully booked
                            </div>
                        {/if}
                    </div>
                </div>
            </section>

            <!-- Time -->

            {#if selectedDate && selectedService}
                <section>
                    <div class="mb-5">
                        <h2 class="text-xl font-black">
                            5. Choose a Time
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            Available times for
                            {selectedService.name}.
                        </p>
                    </div>

                    <div
                        class="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6"
                    >
                        {#if loadingAvailability}

                            <div
                                class="py-8 text-center text-sm text-gray-500"
                            >
                                Checking availability...
                            </div>

                        {:else if getAvailableTimeSlots().length === 0}

                            <div
                                class="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-8 text-center"
                            >
                                <p
                                    class="font-bold text-red-400"
                                >
                                    No times available
                                </p>

                                <p
                                    class="mt-2 text-sm text-gray-500"
                                >
                                    Please select another date.
                                </p>
                            </div>

                        {:else}

                            <div
                                class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                            >
                                {#each generateTimeSlots(
                                    selectedService.duration
                                ) as time}

                                    {#if isTimeSlotAvailable(
                                        time,
                                        selectedService.duration
                                    )}

                                        <button
                                            type="button"
                                            onclick={() =>
                                                (selectedTime =
                                                    time)
                                            }
                                            class={`rounded-xl border-2 px-4 py-4 text-sm font-bold transition ${
                                                selectedTime ===
                                                time
                                                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                    : "border-white/10 bg-black text-gray-300 hover:border-blue-500/60 hover:bg-zinc-900 hover:text-white"
                                            }`}
                                        >
                                            {formatTime(
                                                time
                                            )}
                                        </button>

                                    {/if}

                                {/each}
                            </div>

                        {/if}
                    </div>
                </section>
            {/if}

            <!-- Customer details -->

            {#if selectedDate && selectedTime}
                <section>
                    <div class="mb-5">
                        <h2 class="text-xl font-black">
                            6. Your Details
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            Enter your details to complete the booking.
                        </p>
                    </div>

                    <div
                        class="grid gap-5 rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6 md:grid-cols-2"
                    >
                        <div>
                            <label
                                for="customerName"
                                class="mb-2 block text-sm font-bold text-gray-300"
                            >
                                Full Name
                            </label>

                            <input
                                id="customerName"
                                type="text"
                                bind:value={customerName}
                                placeholder="Your name"
                                class="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                for="customerPhone"
                                class="mb-2 block text-sm font-bold text-gray-300"
                            >
                                Phone Number
                            </label>

                            <input
                                id="customerPhone"
                                type="tel"
                                bind:value={customerPhone}
                                placeholder="085 123 4567"
                                class="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-blue-500"
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label
                                for="customerEmail"
                                class="mb-2 block text-sm font-bold text-gray-300"
                            >
                                Email Address
                            </label>

                            <input
                                id="customerEmail"
                                type="email"
                                bind:value={customerEmail}
                                placeholder="you@example.com"
                                class="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Summary -->

            {#if selectedService}
                <section>
                    <div class="mb-5">
                        <h2 class="text-xl font-black">
                            7. Booking Summary
                        </h2>
                    </div>

                    <div
                        class="rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-6"
                    >
                        <div
                            class="grid gap-5 sm:grid-cols-2"
                        >
                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Service
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {selectedService.name}
                                </p>
                            </div>

                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Vehicle
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {selectedVehicle?.name ??
                                        "Not selected"}
                                </p>
                            </div>

                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Extra
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {getSelectedExtra().name}
                                </p>
                            </div>

                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Date
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {selectedDate ||
                                        "Not selected"}
                                </p>
                            </div>

                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Time
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {selectedTime
                                        ? formatTime(
                                            selectedTime
                                        )
                                        : "Not selected"}
                                </p>
                            </div>

                            <div>
                                <p
                                    class="text-xs font-bold uppercase tracking-wider text-gray-600"
                                >
                                    Duration
                                </p>

                                <p
                                    class="mt-1 font-bold"
                                >
                                    {selectedService.duration ===
                                    120
                                        ? "1–2 hours"
                                        : `${selectedService.duration} minutes`}
                                </p>
                            </div>
                        </div>

                        <div
                            class="mt-6 flex items-center justify-between border-t border-white/10 pt-6"
                        >
                            <span
                                class="text-lg font-black"
                            >
                                Total
                            </span>

                            <span
                                class="text-2xl font-black text-blue-400"
                            >
                                €{getTotalPrice()}
                            </span>
                        </div>
                    </div>
                </section>
            {/if}

            <!-- Message -->

            {#if bookingMessage}
                <div
                    class={`rounded-xl border px-4 py-4 text-sm font-medium ${
                        bookingSuccess
                            ? "border-green-500/20 bg-green-500/5 text-green-400"
                            : "border-red-500/20 bg-red-500/5 text-red-400"
                    }`}
                >
                    {bookingMessage}
                </div>
            {/if}

            <!-- Submit -->

            {#if selectedService}
                <div class="pb-10">
                    <button
                        type="button"
                        onclick={submitBooking}
                        disabled={
                            isSubmitting ||
                            !selectedVehicle ||
                            !selectedDate ||
                            !selectedTime ||
                            !customerName.trim() ||
                            !customerPhone.trim() ||
                            !customerEmail.trim()
                        }
                        class="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                    >
                        {#if isSubmitting}
                            Processing Booking...
                        {:else if bookingSuccess}
                            Booking Confirmed ✓
                        {:else}
                            Confirm Booking — €
                            {getTotalPrice()}
                        {/if}
                    </button>

                    <p
                        class="mt-3 text-center text-xs text-gray-600"
                    >
                        By confirming your booking, you agree
                        to the appointment details shown above.
                    </p>
                </div>
            {/if}
        </div>
    </div>
</div>