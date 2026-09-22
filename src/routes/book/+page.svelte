<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    const businessName = "BFM Carwash";

    type Service = {
        id: string;
        name: string;
        description: string;
        duration: number;
        price: number;
        icon: string;
    };

    type Extra = {
        id: string;
        name: string;
        description: string;
        price: number;
        icon: string;
    };

    type VehicleType = {
        id: string;
        name: string;
        icon: string;
    };

    type CalendarDay = {
        date: string;
        day: number;
    };

    const services: Service[] = [
        {
            id: "car-wash",
            name: "Car Wash",
            description: "A thorough exterior clean for your vehicle.",
            duration: 15,
            price: 15,
            icon: "🚗"
        },
        {
            id: "mini-valet",
            name: "Mini Valet",
            description: "A deeper clean for a spotless finish.",
            duration: 45,
            price: 45,
            icon: "✨"
        },
        {
            id: "full-valet",
            name: "Full Valet",
            description: "A complete interior and exterior valet.",
            duration: 120,
            price: 65,
            icon: "⭐"
        }
    ];

    const vehicleTypes: VehicleType[] = [
        {
            id: "car",
            name: "Car",
            icon: "🚗"
        },
        {
            id: "jeep-suv",
            name: "Jeep / SUV",
            icon: "🚙"
        },
        {
            id: "small-van",
            name: "Small Van",
            icon: "🚐"
        },
        {
            id: "large-van",
            name: "Large Van",
            icon: "🚐"
        }
    ];

    const extras: Extra[] = [
    {
        id: "ceramic-coating",
        name: "Ceramic Coating",
        description: "Add an extra layer of protection and shine to your vehicle.",
        price: 60,
        icon: "💎"
    },
    {
        id: "polishing",
        name: "Polishing",
        description: "Give your vehicle an enhanced shine and smoother finish.",
        price: 25,
        icon: "✨"
    },
    {
        id: "none",
        name: "No Thanks",
        description: "Continue without adding any extras to your booking.",
        price: 0,
        icon: "✓"
    }
];

    let selectedService = $state<Service | null>(null);
    let selectedVehicle = $state<VehicleType | null>(null);
    let selectedExtras = $state<string[]>(["none"]);
    let selectedDate = $state("");
    let selectedTime = $state("");

    let calendarMonth = $state(new Date().getMonth());
    let calendarYear = $state(new Date().getFullYear());

    const openingHour = 9;
    const closingHour = 18;

    function getTodayString() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function formatDate(date: string) {
        if (!date) return "";

        const [year, month, day] = date.split("-").map(Number);

        const formatted = new Date(year, month - 1, day);

        return formatted.toLocaleDateString("en-IE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function getMonthName() {
        return new Date(
            calendarYear,
            calendarMonth,
            1
        ).toLocaleDateString("en-IE", {
            month: "long",
            year: "numeric"
        });
    }

    function getCalendarDays(): CalendarDay[] {
        const daysInMonth = new Date(
            calendarYear,
            calendarMonth + 1,
            0
        ).getDate();

        const firstDay = new Date(
            calendarYear,
            calendarMonth,
            1
        ).getDay();

        const mondayFirstOffset =
            firstDay === 0 ? 6 : firstDay - 1;

        const days: CalendarDay[] = [];

        for (let i = 0; i < mondayFirstOffset; i++) {
            days.push({
                date: "",
                day: 0
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date =
                `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            days.push({
                date,
                day
            });
        }

        return days;
    }

    function isToday(date: string) {
        return date === getTodayString();
    }

    function isPastDate(date: string) {
        return date < getTodayString();
    }

    function selectDate(date: string) {
        if (!date || isPastDate(date)) return;

        selectedDate = date;
        selectedTime = "";
    }

    function previousMonth() {
        const today = new Date();

        const currentMonthStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const displayedMonth = new Date(
            calendarYear,
            calendarMonth,
            1
        );

        if (displayedMonth <= currentMonthStart) {
            return;
        }

        if (calendarMonth === 0) {
            calendarMonth = 11;
            calendarYear -= 1;
        } else {
            calendarMonth -= 1;
        }
    }

    function nextMonth() {
        if (calendarMonth === 11) {
            calendarMonth = 0;
            calendarYear += 1;
        } else {
            calendarMonth += 1;
        }
    }

    function toggleExtra(extraId: string) {
        selectedExtras = [extraId];
    }

    function getSelectedExtras() {
        return extras.filter((extra) =>
            selectedExtras.includes(extra.id)
        );
    }

    function getExtrasTotal() {
        return getSelectedExtras().reduce(
            (total, extra) => total + extra.price,
            0
        );
    }

    function getTotal() {
        return (selectedService?.price ?? 0) + getExtrasTotal();
    }

    function generateTimeSlots(duration: number) {
        const slots: string[] = [];

        const openingMinutes = openingHour * 60;
        const closingMinutes = closingHour * 60;

        for (
            let minutes = openingMinutes;
            minutes + duration <= closingMinutes;
            minutes += 15
        ) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;

            const time =
                `${hours.toString().padStart(2, "0")}:${mins
                    .toString()
                    .padStart(2, "0")}`;

            slots.push(time);
        }

        return slots;
    }

    function formatTime(time: string) {
        const [hours, minutes] = time.split(":").map(Number);

        const suffix = hours >= 12 ? "PM" : "AM";
        const displayHour = hours % 12 || 12;

        return `${displayHour}:${minutes
            .toString()
            .padStart(2, "0")} ${suffix}`;
    }
</script>

<svelte:head>
    <title>Book Your Service | {businessName}</title>

    <meta
        name="description"
        content="Book a car wash or valet service with BFM Carwash in Dundalk."
    />
</svelte:head>

<main class="min-h-screen bg-black text-white">

    <Navbar businessName={businessName} />

    <!-- HEADER -->

    <section class="px-6 pb-14 pt-36 text-center lg:px-8">

        <div class="mx-auto max-w-3xl">

            <p
                class="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Book Your Service
            </p>

            <h1
                class="text-4xl font-black uppercase tracking-tight sm:text-5xl"
            >
                Book With BFM
            </h1>

            <p
                class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400"
            >
                Choose your service, select a date and time, and we'll
                take care of the rest.
            </p>

        </div>

    </section>

    <!-- BOOKING -->

    <section class="px-6 pb-24 lg:px-8">

        <div class="mx-auto max-w-5xl">

            <!-- STEP 1 -->

            <div
                class="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
            >

                <div class="mb-8">

                    <p
                        class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                    >
                        Step 1
                    </p>

                    <h2 class="mt-2 text-2xl font-black uppercase">
                        Choose Your Service
                    </h2>

                </div>

                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {#each services as service}

                        <button
                            type="button"
                            onclick={() => {
                                selectedService = service;
                                selectedTime = "";
                            }}
                            class={`group rounded-2xl border-2 p-6 text-left transition-all duration-200 sm:p-7 ${
                                selectedService?.id === service.id
                                    ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                                    : "border-white/15 bg-black hover:border-blue-500/60 hover:bg-zinc-900"
                            }`}
                        >

                            <div class="flex items-start justify-between">

                                <div
                                    class={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${
                                        selectedService?.id === service.id
                                            ? "bg-blue-600/20"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    {service.icon}
                                </div>

                                {#if selectedService?.id === service.id}

                                    <div
                                        class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold"
                                    >
                                        ✓
                                    </div>

                                {/if}

                            </div>

                            <h3
                                class="mt-6 text-2xl font-black uppercase tracking-tight"
                            >
                                {service.name}
                            </h3>

                            <p
                                class="mt-3 min-h-[48px] text-sm leading-6 text-gray-400"
                            >
                                {service.description}
                            </p>

                            {#if service.id === "full-valet"}

                                <div
                                    class="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
                                >
                                    <p class="text-xs leading-5 text-gray-400">
                                        <span class="font-semibold text-gray-200">
                                            Please note:
                                        </span>
                                        Full valet appointments typically take
                                        <span class="font-semibold text-white">
                                            1–2 hours
                                        </span>
                                        depending on the condition of the vehicle.
                                    </p>
                                </div>

                            {/if}

                            <div
                                class="mt-7 flex items-center justify-between border-t border-white/10 pt-5"
                            >

                                <div>

                                    <p
                                        class="text-xs uppercase tracking-wider text-gray-500"
                                    >
                                        Price
                                    </p>

                                    <p
                                        class="mt-1 text-lg font-black text-blue-400"
                                    >
                                        €{service.price}
                                    </p>

                                </div>

                                <div class="text-right">

                                    <p
                                        class="text-xs uppercase tracking-wider text-gray-500"
                                    >
                                        Duration
                                    </p>

                                    <p
                                        class="mt-1 text-lg font-bold text-white"
                                    >
                                        {service.duration === 120
                                            ? "1–2 hrs"
                                            : `${service.duration} min`}
                                    </p>

                                </div>

                            </div>

                        </button>

                    {/each}

                </div>

            </div>

            {#if selectedService}

                <!-- STEP 2 — VEHICLE TYPE -->

                <div
                    class="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
                >

                    <div class="mb-8">

                        <p
                            class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                        >
                            Step 2
                        </p>

                        <h2 class="mt-2 text-2xl font-black uppercase">
                            Choose Your Vehicle
                        </h2>

                        <p class="mt-2 text-sm text-gray-500">
                            Select the type of vehicle you're bringing to BFM.
                        </p>

                    </div>

                    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">

                        {#each vehicleTypes as vehicle}

                            <button
                                type="button"
                                onclick={() => {
                                    selectedVehicle = vehicle;
                                    selectedTime = "";
                                }}
                                class={`rounded-2xl border-2 p-5 text-center transition-all duration-200 ${
                                    selectedVehicle?.id === vehicle.id
                                        ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                                        : "border-white/10 bg-black hover:border-blue-500/50 hover:bg-zinc-900"
                                }`}
                            >

                                <div
                                    class={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-xl ${
                                        selectedVehicle?.id === vehicle.id
                                            ? "bg-blue-600/20"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    {vehicle.icon}
                                </div>

                                <h3
                                    class="mt-4 text-sm font-black uppercase"
                                >
                                    {vehicle.name}
                                </h3>

                                {#if selectedVehicle?.id === vehicle.id}

                                    <div
                                        class="mx-auto mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold"
                                    >
                                        ✓
                                    </div>

                                {/if}

                            </button>

                        {/each}

                    </div>

                </div>

                {#if selectedVehicle}

                    <!-- STEP 3 — EXTRAS -->

                    <div
                        class="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
                    >

                        <div class="mb-8">

                            <p
                                class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                            >
                                Step 3
                            </p>

                            <h2 class="mt-2 text-2xl font-black uppercase">
                                Add Extras
                            </h2>

                            <p class="mt-2 text-sm text-gray-500">
                                Optional extras for your booking.
                            </p>

                        </div>

                        <div class="grid gap-4 sm:grid-cols-3">

                            {#each extras as extra}

                                <button
                                    type="button"
                                    onclick={() => toggleExtra(extra.id)}
                                    class={`rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                                        selectedExtras.includes(extra.id)
                                            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                                            : "border-white/10 bg-black hover:border-blue-500/50 hover:bg-zinc-900"
                                    }`}
                                >

                                    <div
                                        class="flex items-start justify-between gap-4"
                                    >

                                        <div class="flex items-start gap-4">

                                            <div
                                                class={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                                                    selectedExtras.includes(extra.id)
                                                        ? "bg-blue-600/20"
                                                        : "bg-zinc-900"
                                                }`}
                                            >
                                                {extra.icon}
                                            </div>

                                            <div>

                                                <h3
                                                    class="text-lg font-black uppercase"
                                                >
                                                    {extra.name}
                                                </h3>

                                                <p
                                                    class="mt-1 text-sm leading-5 text-gray-500"
                                                >
                                                    {extra.description}
                                                </p>

                                            </div>

                                        </div>

                                        <div
                                            class={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${
                                                selectedExtras.includes(extra.id)
                                                    ? "border-blue-500 bg-blue-600 text-white"
                                                    : "border-white/20 text-transparent"
                                            }`}
                                        >
                                            ✓
                                        </div>

                                    </div>

                                    <div class="mt-5 border-t border-white/10 pt-4">
                                        {#if extra.price > 0}
                                            <span class="text-lg font-black text-blue-400">
                                                +€{extra.price}
                                            </span>
                                        {:else}
                                            <span class="text-lg font-black text-gray-400">
                                                No extra charge
                                            </span>
                                        {/if}
</div>

                                </button>

                            {/each}

                        </div>

                    </div>

                    <!-- STEP 4 — DATE -->

                    <div
                        class="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
                    >

                        <div class="mb-8">

                            <p
                                class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                            >
                                Step 4
                            </p>

                            <h2 class="mt-2 text-2xl font-black uppercase">
                                Choose A Date
                            </h2>

                            <p class="mt-2 text-sm text-gray-500">
                                Select the day you'd like to visit BFM.
                            </p>

                        </div>

                        <!-- CALENDAR -->

                        <div
                            class="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-black p-5 sm:p-7"
                        >

                            <div class="flex items-center justify-between">

                                <button
                                    type="button"
                                    onclick={previousMonth}
                                    aria-label="Previous month"
                                    class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-xl text-gray-300 transition hover:border-blue-500 hover:text-white"
                                >
                                    ‹
                                </button>

                                <h3
                                    class="text-lg font-black uppercase tracking-wide sm:text-xl"
                                >
                                    {getMonthName()}
                                </h3>

                                <button
                                    type="button"
                                    onclick={nextMonth}
                                    aria-label="Next month"
                                    class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-xl text-gray-300 transition hover:border-blue-500 hover:text-white"
                                >
                                    ›
                                </button>

                            </div>

                            <div
                                class="mt-7 grid grid-cols-7 gap-1 sm:gap-2"
                            >

                                {#each ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as day}

                                    <div
                                        class="pb-2 text-center text-[10px] font-bold tracking-wider text-gray-500 sm:text-xs"
                                    >
                                        {day}
                                    </div>

                                {/each}

                                {#each getCalendarDays() as calendarDay}

                                    {#if calendarDay.date}

                                        <button
                                            type="button"
                                            disabled={isPastDate(calendarDay.date)}
                                            onclick={() =>
                                                selectDate(calendarDay.date)}
                                            class={`aspect-square rounded-lg text-sm font-bold transition sm:text-base ${
                                                selectedDate === calendarDay.date
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                    : isToday(calendarDay.date)
                                                        ? "border border-blue-500 bg-blue-500/10 text-blue-400"
                                                        : isPastDate(calendarDay.date)
                                                            ? "cursor-not-allowed text-gray-700"
                                                            : "bg-zinc-900 text-gray-300 hover:bg-blue-600/20 hover:text-white"
                                            }`}
                                        >
                                            {calendarDay.day}
                                        </button>

                                    {:else}

                                        <div></div>

                                    {/if}

                                {/each}

                            </div>

                            <div
                                class="mt-6 flex flex-wrap items-center justify-center gap-5 border-t border-white/10 pt-5 text-xs text-gray-500"
                            >

                                <div class="flex items-center gap-2">

                                    <span
                                        class="h-3 w-3 rounded-full bg-blue-600"
                                    ></span>

                                    Selected

                                </div>

                                <div class="flex items-center gap-2">

                                    <span
                                        class="h-3 w-3 rounded-full border border-blue-500 bg-blue-500/10"
                                    ></span>

                                    Today

                                </div>

                            </div>

                        </div>

                    </div>

                    {#if selectedDate}

                        <!-- STEP 5 — TIME -->

                        <div
                            class="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
                        >

                            <div class="mb-8">

                                <p
                                    class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                                >
                                    Step 5
                                </p>

                                <h2 class="mt-2 text-2xl font-black uppercase">
                                    Choose A Time
                                </h2>

                                <p class="mt-2 text-sm text-gray-500">
                                    Available times for {formatDate(selectedDate)}.
                                </p>

                            </div>

                            <div
                                class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
                            >

                                {#each generateTimeSlots(selectedService.duration) as time}

                                    <button
                                        type="button"
                                        onclick={() => (selectedTime = time)}
                                        class={`rounded-xl border-2 px-4 py-4 text-sm font-bold transition ${
                                            selectedTime === time
                                                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                : "border-white/10 bg-black text-gray-300 hover:border-blue-500/60 hover:bg-zinc-900 hover:text-white"
                                        }`}
                                    >
                                        {formatTime(time)}
                                    </button>

                                {/each}

                            </div>

                            <div
                                class="mt-6 rounded-xl border border-white/5 bg-black px-4 py-3 text-center text-xs text-gray-500"
                            >
                                Opening hours:
                                {formatTime(`${String(openingHour).padStart(2, "0")}:00`)}
                                –
                                {formatTime(`${String(closingHour).padStart(2, "0")}:00`)}
                            </div>

                        </div>

                        {#if selectedTime}

                            <!-- STEP 6 — DETAILS -->

                            <div
                                class="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8"
                            >

                                <div class="mb-8">

                                    <p
                                        class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                                    >
                                        Step 6
                                    </p>

                                    <h2 class="mt-2 text-2xl font-black uppercase">
                                        Your Details
                                    </h2>

                                    <p class="mt-2 text-sm text-gray-500">
                                        Enter your details so we can confirm your booking.
                                    </p>

                                </div>

                                <div class="grid gap-6 sm:grid-cols-2">

                                    <!-- NAME -->

                                    <div class="sm:col-span-2">

                                        <label
                                            for="booking-name"
                                            class="mb-2 block text-sm font-semibold text-gray-300"
                                        >
                                            Name
                                        </label>

                                        <input
                                            id="booking-name"
                                            type="text"
                                            placeholder="Your name"
                                            class="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                        />

                                    </div>

                                    <!-- PHONE -->

                                    <div>

                                        <label
                                            for="booking-phone"
                                            class="mb-2 block text-sm font-semibold text-gray-300"
                                        >
                                            Phone
                                        </label>

                                        <input
                                            id="booking-phone"
                                            type="tel"
                                            placeholder="Your phone number"
                                            class="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                        />

                                    </div>

                                    <!-- EMAIL -->

                                    <div>

                                        <label
                                            for="booking-email"
                                            class="mb-2 block text-sm font-semibold text-gray-300"
                                        >
                                            Email
                                        </label>

                                        <input
                                            id="booking-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            class="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-4 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                        />

                                    </div>

                                </div>

                                <!-- SUMMARY -->

                                <div
                                    class="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 sm:p-6"
                                >

                                    <p
                                        class="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400"
                                    >
                                        Booking Summary
                                    </p>

                                    <div class="mt-5 space-y-3">

                                        <!-- SERVICE -->

                                        <div
                                            class="flex items-center justify-between text-sm"
                                        >

                                            <span class="text-gray-400">
                                                {selectedService.name}
                                            </span>

                                            <span class="font-bold">
                                                €{selectedService.price}
                                            </span>

                                        </div>

                                        <!-- VEHICLE -->

                                        <div
                                            class="flex items-center justify-between text-sm"
                                        >

                                            <span class="text-gray-400">
                                                Vehicle
                                            </span>

                                            <span class="font-bold">
                                                {selectedVehicle.name}
                                            </span>

                                        </div>

                                        <!-- EXTRAS -->

                                        {#each getSelectedExtras() as extra}

                                            {#if extra.price > 0}

                                                <div
                                                    class="flex items-center justify-between text-sm"
                                                >

                                                    <span class="text-gray-400">
                                                        {extra.name}
                                                    </span>

                                                    <span class="font-bold">
                                                        €{extra.price}
                                                    </span>

                                                </div>

                                            {/if}

                                        {/each}

                                        <!-- DIVIDER -->

                                        <div
                                            class="border-t border-white/10 pt-3"
                                        >

                                            <div
                                                class="flex items-center justify-between"
                                            >

                                                <span
                                                    class="font-bold uppercase"
                                                >
                                                    Total
                                                </span>

                                                <span
                                                    class="text-2xl font-black text-blue-400"
                                                >
                                                    €{getTotal()}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <!-- DATE / TIME -->

                                    <div
                                        class="mt-6 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-2"
                                    >

                                        <div>

                                            <p
                                                class="text-xs uppercase tracking-wider text-gray-500"
                                            >
                                                Date
                                            </p>

                                            <p class="mt-1 font-bold">
                                                {formatDate(selectedDate)}
                                            </p>

                                        </div>

                                        <div>

                                            <p
                                                class="text-xs uppercase tracking-wider text-gray-500"
                                            >
                                                Time
                                            </p>

                                            <p class="mt-1 font-bold">
                                                {formatTime(selectedTime)}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <!-- CONFIRM -->

                                <button
                                    type="button"
                                    class="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    Confirm Booking
                                </button>

                            </div>

                        {/if}

                    {/if}

                {/if}

            {/if}

        </div>

    </section>

</main>