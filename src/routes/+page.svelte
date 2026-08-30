<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import BenefitCard from "$lib/components/BenefitCard.svelte";
    import ServiceCategory from "$lib/components/ServiceCategory.svelte";
    import ReviewCard from "$lib/components/ReviewCard.svelte";

    let businessName = "BFM Carwash";
    
    const benefits = [
        {
            title: "Premium Quality",
            description: "We use quality products and proven techniques to deliver a finish that stands out.",
            icon: "✦"
        },
        {
            title: "Attention to Detail",
            description: "Every part of your vehicle gets the attention it deserves, inside and out.",
            icon: "◇"
        },
        {
            title: "Safe for Your Car",
            description: "We use products and methods designed to clean your vehicle while protecting its finish.",
            icon: "✓"
        },
        {
            title: "Customer Satisfaction",
            description: "We take pride in our work and want every customer to leave completely satisfied.",
            icon: "★"
        }
    ];

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

const reviews = [
    {
        name: "Sean Murphy",
        rating: 5,
        review: "Absolutely brilliant job from start to finish! You can really tell they put in the extra effort and take pride in their work. The car was spotless, and they were ..."
    },
    {
        name: "Ben O'Callaghan",
        rating: 5,
        review: "Great place, very friendly staff, had the car shining. I’d recommend going if you want your car spotless."
    }
];

</script>

<svelte:head>
    <title>{businessName} | Professional Car Detailing</title>

    <meta
        name="description"
        content="Professional car detailing and car wash services from BFM Carwash."
    />
</svelte:head>

<main class="min-h-screen overflow-hidden bg-black text-white">

    <Navbar businessName={businessName} />

    <!-- HERO -->
    <section class="relative isolate min-h-screen overflow-hidden bg-black">

        <!-- Subtle blue background glow -->
        <div
            class="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]"
        ></div>

        <!-- Main hero container -->
        <div
            class="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 lg:px-8"
        >

            <!-- LEFT: Hero content -->
            <div class="relative z-20 w-full lg:w-1/2">

                <!-- Small label -->
                <div
                    class="mb-6 inline-flex items-center rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-2"
                >
                    <span
                        class="text-sm font-semibold tracking-wider text-blue-400"
                    >
                        ✦ PREMIUM CAR DETAILING
                    </span>
                </div>

                <!-- Main heading -->
                <h1
                    class="text-6xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl"
                >
                    <span class="block text-white">
                        Sparkling
                    </span>

                    <span class="block text-blue-500">
                        Clean
                    </span>

                    <span
                        class="mt-5 block text-3xl italic tracking-[0.18em] text-white sm:text-4xl"
                    >
                        Every Time ✦
                    </span>
                </h1>

                <!-- Description -->
                <p
                    class="mt-8 max-w-lg text-base leading-7 text-gray-300 sm:text-lg"
                >
                    Professional car detailing services that bring your car
                    back to life. Quality products, attention to detail and a
                    finish you can see.
                </p>

                <!-- Buttons -->
                <div class="mt-10 flex flex-col gap-4 sm:flex-row">

                    <a
                        href="/contact"
                        class="rounded-lg bg-blue-600 px-8 py-4 text-center font-bold text-white transition duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
                    >
                        BOOK YOUR DETAIL
                    </a>

                    <a
                        href="/services"
                        class="rounded-lg border border-blue-500 px-8 py-4 text-center font-bold text-white transition duration-300 hover:bg-blue-500/10"
                    >
                        VIEW SERVICES
                    </a>

                </div>

                <!-- Small trust indicators -->
                <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-400">

                    <div class="flex items-center gap-2">
                        <span class="text-blue-500">✦</span>
                        Professional Finish
                    </div>

                    <div class="flex items-center gap-2">
                        <span class="text-blue-500">✦</span>
                        Quality Products
                    </div>

                    <div class="flex items-center gap-2">
                        <span class="text-blue-500">✦</span>
                        Attention to Detail
                    </div>

                </div>

            </div>

            <!-- RIGHT: Porsche -->
            <div
                class="absolute right-0 top-0 hidden h-full w-[58%] lg:block"
            >

                <!-- Porsche image -->
                <img
                    src="/porsche.jpg"
                    alt="Porsche after professional detailing"
                    class="h-full w-full object-cover object-[50%_72%]"
                />

                <!-- Left-side blend -->
                <div
                    class="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/70 to-transparent"
                ></div>

                <!-- Bottom blend -->
                <div
                    class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent"
                ></div>

                <!-- Blue atmosphere -->
                <div
                    class="absolute right-10 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]"
                ></div>

            </div>

        </div>

        <!-- Bottom fade -->
        <div
            class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"
        ></div>

    </section>


<!-- Why BFM -->
<section class="bg-black px-6 py-24 lg:px-8">

    <div class="mx-auto max-w-7xl">

        <!-- Section heading -->
        <div class="mx-auto max-w-2xl text-center">

            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
                Why BFM Carwash
            </p>

            <h2 class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                More Than Just A Clean
            </h2>

            <p class="mt-6 text-lg leading-8 text-gray-400">
                We combine quality products, professional techniques and
                attention to detail to give your vehicle the finish it deserves.
            </p>

        </div>

        <!-- Benefits -->
        <div class="mt-16 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">

            {#each benefits as benefit}
                <BenefitCard
                    title={benefit.title}
                    description={benefit.description}
                    icon={benefit.icon}
                />
            {/each}

        </div>

    </div>

</section>

<!-- Location -->
<section class="border-t border-white/5 bg-zinc-950 px-6 py-24 lg:px-8">

    <div class="mx-auto max-w-7xl">

        <!-- Section heading -->
        <div class="mb-12">
            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
                Come Visit Us
            </p>

            <h2 class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Find BFM Carwash
            </h2>

            <p class="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
                Get your vehicle looking its best at BFM Carwash.
                Find us at our location below.
            </p>
        </div>

        <!-- Location layout -->
        <div class="grid gap-8 lg:grid-cols-5">

            <!-- Information -->
            <div class="flex flex-col justify-between rounded-2xl border border-white/10 bg-black p-8 lg:col-span-2">

                <div>

                    <!-- Address -->
                    <div class="mb-8">
                        <div class="mb-3 flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                📍
                            </div>

                            <h3 class="font-bold text-white">
                                Location
                            </h3>
                        </div>

                        <p class="pl-[52px] leading-7 text-gray-400">
                            BFM Carwash<br />
                            Inner Relief Rd, Marshes Upper, Dundalk, Co. Louth, A91 KD5X<br />
                            Dublin, Ireland
                        </p>
                    </div>

                    <!-- Opening hours -->
                    <div class="mb-8">
                        <div class="mb-3 flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                🕐
                            </div>

                            <h3 class="font-bold text-white">
                                Opening Hours
                            </h3>
                        </div>

                        <div class="space-y-2 pl-[52px] text-gray-400">
                            <div class="flex justify-between gap-6">
                                <span>Monday - Friday</span>
                                <span class="text-white">9:00 - 18:00</span>
                            </div>

                            <div class="flex justify-between gap-6">
                                <span>Saturday</span>
                                <span class="text-white">9:00 - 18:00</span>
                            </div>

                            <div class="flex justify-between gap-6">
                                <span>Sunday</span>
                                <span class="text-white">9:00 - 18:00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Contact -->
                    <div>
                        <div class="mb-3 flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                📞
                            </div>

                            <h3 class="font-bold text-white">
                                Contact
                            </h3>
                        </div>

                        <p class="pl-[52px] text-gray-400">
                            <a
                                href="tel:+353000000000"
                                class="transition hover:text-blue-400"
                            >
                                +353 085 192 1882
                            </a>
                        </p>
                    </div>

                </div>

                <!-- Directions button -->
                <a
                    href="#"
                    class="mt-10 block rounded-lg bg-blue-600 px-6 py-4 text-center font-bold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                >
                    GET DIRECTIONS
                </a>

            </div>

           
           <!-- Google Map -->
    <div class="relative min-h-[400px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-3">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2345.8463759720457!2d-6.380937923218778!3d53.98775102653894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4860cd1c42321c67%3A0x932ec138c930d37d!2sBFM%20Carwash!5e0!3m2!1sen!2sie!4v1787681144795!5m2!1sen!2sie"
            class="absolute inset-0 h-full w-full"
            style="border: 0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            title="BFM Carwash location"
        ></iframe>
</div>

        </div>

    </div>

</section>

<!-- Services -->
<section class="border-t border-white/5 bg-black px-6 py-24 lg:px-8">

    <div class="mx-auto max-w-7xl">

        <!-- Heading -->
        <div class="mx-auto max-w-2xl text-center">

            <p
                class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Our Services
            </p>

            <h2
                class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl"
            >
                Quality Without The Guesswork
            </h2>

            <p class="mt-6 text-lg leading-8 text-gray-400">
                Whether you need a quick wash or a full valet,
                we've got your vehicle covered.
            </p>

        </div>


        <!-- Service categories -->
        <div class="mt-16 grid gap-8 lg:grid-cols-2">

            <ServiceCategory
                title="Car Wash"
                icon="🚗"
                services={carWashServices}
            />

            <ServiceCategory
                title="Valet"
                icon="✦"
                services={valetServices}
            />

        </div>


        <!-- Bottom note -->
        <div class="mt-10 text-center">

            <p class="text-sm text-gray-500">
                Prices may vary depending on vehicle condition.
                Contact us if you're unsure which service is right for you.
            </p>

        </div>

    </div>

</section>

<!-- Reviews -->
<section class="border-t border-white/5 bg-zinc-950 px-6 py-24 lg:px-8">

    <div class="mx-auto max-w-7xl">

        <!-- Heading -->
        <div class="mx-auto max-w-2xl text-center">

            <p
                class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Customer Reviews
            </p>

            <h2
                class="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl"
            >
                Don't Just Take Our Word For It
            </h2>

            <p class="mt-6 text-lg leading-8 text-gray-400">
                See what our customers have to say about their experience
                with BFM Carwash.
            </p>

            <!-- Google rating -->
            <div class="mt-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-black px-6 py-3">

                <span class="text-xl font-bold text-white">
                    5.0
                </span>

                <span class="text-lg text-blue-400">
                    ★★★★★
                </span>

                <span class="text-sm text-gray-500">
                    on Google
                </span>

            </div>

        </div>


        <!-- Reviews -->
        <div class="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">

            {#each reviews as review}
                <ReviewCard
                    name={review.name}
                    review={review.review}
                    rating={review.rating}
                />
            {/each}

        </div>


        <!-- Google button -->
        <div class="mt-12 text-center">

            <a
                href="https://www.google.com/maps/search/?api=1&query=BFM+Carwash+Dundalk"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center rounded-lg border border-blue-500 px-8 py-4 font-bold text-white transition duration-300 hover:bg-blue-500/10"
            >
                VIEW ALL REVIEWS
            </a>

        </div>

    </div>

</section>
</main>