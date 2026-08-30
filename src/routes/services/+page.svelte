<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import ServiceCategory from "$lib/components/ServiceCategory.svelte";
import PricingCategory from "$lib/components/PricingCategory.svelte";

    const businessName = "BFM Carwash";

    const carWashServices = [
        {
            name: "Car",
            price: 15
        },
        {
            name: "Jeep + Small Van",
            price: 20
        },
        {
            name: "Large Van",
            price: 30
        }
    ];

    const valetServices = [
        {
            name: "Mini Valet",
            price: 45
        },
        {
            name: "Full Valet",
            price: 65
        }
    ];
</script>

<svelte:head>
    <title>Services | {businessName}</title>

    <meta
        name="description"
        content="Explore BFM Carwash car wash and valet services in Dundalk."
    />
</svelte:head>

<main class="min-h-screen bg-black text-white">

    <Navbar businessName={businessName} />

    <!-- Page Hero -->


        <!-- Services -->
    <section class="border-t border-white/10 bg-zinc-950 px-6 py-24 lg:px-8">

        <div class="mx-auto max-w-7xl">

            <div class="mx-auto max-w-2xl text-center">

                <p
                    class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
                >
                    What We Offer
                </p>

                <h2 class="text-4xl font-black uppercase sm:text-5xl">
                    Choose Your Service
                </h2>

                <p class="mt-6 text-lg leading-8 text-gray-400">
                    Whether your car needs a quick refresh or a deeper clean,
                    our team is here to get it looking its best.
                </p>

            </div>


            <div class="mt-16 grid gap-8 lg:grid-cols-2">

                <!-- Car Wash -->
                <div class="rounded-2xl border border-white/10 bg-black p-8">

                    <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-2xl">
                        🚗
                    </div>

                    <h3 class="text-3xl font-black uppercase">
                        Car Wash
                    </h3>

                    <p class="mt-5 leading-8 text-gray-400">
                        A thorough exterior clean designed to remove dirt,
                        grime and everyday road buildup while leaving your
                        vehicle looking fresh and clean.
                    </p>

                    <ul class="mt-8 space-y-4 text-gray-300">

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Exterior wash
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Wheels cleaned
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Windows cleaned
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Finished with a clean shine
                        </li>

                    </ul>

                </div>


                <!-- Valet -->
                <div class="rounded-2xl border border-blue-500/30 bg-black p-8">

                    <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-2xl">
                        ✦
                    </div>

                    <h3 class="text-3xl font-black uppercase">
                        Valet
                    </h3>

                    <p class="mt-5 leading-8 text-gray-400">
                        A more thorough clean for customers looking to give
                        their vehicle extra attention, inside and out.
                    </p>

                    <ul class="mt-8 space-y-4 text-gray-300">

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Interior vacuuming
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Interior surfaces cleaned
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Exterior wash
                        </li>

                        <li class="flex gap-3">
                            <span class="text-blue-500">✦</span>
                            Detailed finishing
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    </section>



    <!-- Pricing -->
    <section class="border-t border-white/10 bg-black px-6 py-24 lg:px-8">

        <div class="mx-auto max-w-5xl">

            <!-- Heading -->
            <div class="mx-auto max-w-2xl text-center">

                <p
                    class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
                >
                    Simple Pricing
                </p>

                <h2 class="text-4xl font-black uppercase sm:text-5xl">
                    Our Prices
                </h2>

                <p class="mt-6 text-lg leading-8 text-gray-400">
                    Straightforward pricing with no unnecessary complications.
                </p>

            </div>


            <!-- Pricing cards -->
            <div class="mt-14 grid gap-8 md:grid-cols-2">

                <PricingCategory
                    title="Car Wash"
                    services={carWashServices}
                />

                <PricingCategory
                    title="Valet"
                    services={valetServices}
                    featured={true}
                />

            </div>


            <!-- Disclaimer -->
            <p class="mt-8 text-center text-sm text-gray-500">
                Contact us if you're unsure which service is right for you.
            </p>

        </div>

    </section>



    <!-- FAQ -->
    <section class="border-t border-white/10 bg-zinc-950 px-6 py-24 lg:px-8">

        <div class="mx-auto max-w-5xl">

            <!-- Heading -->
            <div class="text-center">

                <p
                    class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
                >
                    Frequently Asked Questions
                </p>

                <h2
                    class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl"
                >
                    Got Questions?
                    <span class="text-blue-500">We've Got Answers.</span>
                </h2>

                <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                    Everything you need to know before bringing your vehicle to BFM
                    Carwash. <br>
                    <br>
                </p>

            </div>


            <!-- Questions -->
            <div class="mt-14 space-y-4">

                <!-- Question 1 -->
                <div class="rounded-2xl border border-blue-500/40 bg-black p-6 sm:p-8">

                    <div class="flex items-start justify-between gap-6">

                        <h3 class="text-lg font-bold text-white sm:text-xl">
                          &nbsp;  Do I need to book?
                        </h3>

                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xl text-blue-400"
                        >
                            +
                        </span>

                    </div>

                    <p class="mt-4 max-w-3xl leading-7 text-gray-400">
                        &nbsp; Booking is recommended to make sure we can fit you in at
                        your preferred time.
                    </p>

                </div>

                <br>

                <!-- Question 2 -->
                <div class="rounded-2xl border border-blue-500/40 bg-black p-6 sm:p-8">
                    <div class="flex items-start justify-between gap-6">

                        <h3 class="text-lg font-bold text-white sm:text-xl">
                           &nbsp; How long does a valet take?
                        </h3>

                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xl text-blue-400"
                        >
                            +
                        </span>

                    </div>

                    <p class="mt-4 max-w-3xl leading-7 text-gray-400">
                      &nbsp;  The time depends on the condition of the vehicle and the
                        service selected.
                    </p>

                </div>

                <br>

                <!-- Question 3 -->
                <div class="rounded-2xl border border-blue-500/40 bg-black p-6 sm:p-8">
                    <div class="flex items-start justify-between gap-6">

                        <h3 class="text-lg font-bold text-white sm:text-xl">
                          &nbsp;  What vehicles do you clean?
                        </h3>

                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xl text-blue-400"
                        >
                            +
                        </span>

                    </div>

                    <p class="mt-4 max-w-3xl leading-7 text-gray-400">
                      &nbsp;  We clean cars, jeeps, small vans and large vans.
                    </p>

                </div>

            </div>

        </div>

    </section>


    <!-- CTA -->
    <section
        class="border-t border-blue-500/20 bg-blue-500/5 px-6 py-24 lg:px-8"
    >

        <div class="mx-auto max-w-4xl text-center">

            <h2 class="text-4xl font-black uppercase sm:text-5xl">
                Ready To Get Your Car Looking Its Best?
            </h2>

            <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                Choose your service and book a time that works for you.
            </p>

            <a
                href="/book"
                class="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            >
                BOOK NOW
            </a>

        </div>

    </section>

</main>