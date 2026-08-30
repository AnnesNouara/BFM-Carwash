<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    const businessName = "BFM Carwash";

    const gallery = [
        {
            image: "/gallery/merc.jpg",
            alt: "Mercedes SUV after a BFM Carwash clean"
        },
        {
            image: "/gallery/bmw.jpg",
            alt: "Black BMW after a BFM Carwash clean"
        },
        {
            image: "/gallery/toyota-orange.jpg",
            alt: "Classic Toyota after a BFM Carwash clean"
        },
        {
            image: "/gallery/bmw5.jpg",
            alt: "Grey BMW after a BFM Carwash clean"
        },
        {
            image: "/gallery/celica.jpg",
            alt: "Black Toyota after a BFM Carwash clean"
        },
        {
            image: "/gallery/porsche.jpg",
            alt: "Porsche after a BFM Carwash clean"
        }
    ];
</script>

<svelte:head>
    <title>Our Work | {businessName}</title>

    <meta
        name="description"
        content="Take a look at vehicles cleaned and detailed by BFM Carwash in Dundalk."
    />
</svelte:head>

<main class="min-h-screen bg-black text-white">

    <Navbar businessName={businessName} />


        <!-- Hero -->
    <section class="px-6 pb-20 pt-36 text-center lg:px-8">

        <div class="mx-auto max-w-4xl">

            <!-- Small heading -->
            <p
                class="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Our Work
            </p>

            <!-- Main heading -->
            <h1
                class="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
                Real Cars.
                <span class="block text-blue-500">
                    Real Results.
                </span>
            </h1>

            <!-- Description -->
            <p
                class="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl"
            >
                Take a look at some of the vehicles we've cleaned and
                finished at BFM Carwash.
            </p>

        </div>

    </section>


    <!-- Gallery -->
    <section class="border-t border-white/10 bg-zinc-950 px-6 py-20 lg:px-8">

        <div class="mx-auto max-w-7xl">

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {#each gallery as car}
                    <button
                        type="button"
                        class="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition duration-300 hover:border-blue-500/50"
                    >

                        <img
                            src={car.image}
                            alt={car.alt}
                            loading="lazy"
                            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <!-- Dark overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-90"
                        ></div>

                        <!-- Hover indicator -->
                        <div
                            class="absolute bottom-5 left-5 right-5 flex items-center justify-between"
                        >

                            <span
                                class="text-sm font-semibold uppercase tracking-wider text-white"
                            >
                                BFM Carwash
                            </span>

                            <span
                                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition duration-300 group-hover:border-blue-400 group-hover:bg-blue-600"
                            >
                                ↗
                            </span>

                        </div>

                    </button>
                {/each}

            </div>

        </div>

    </section>


    <!-- CTA -->
    <section
        class="border-t border-blue-500/20 bg-blue-500/5 px-6 py-24 lg:px-8"
    >

        <div class="mx-auto max-w-4xl text-center">

            <p
                class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Your Car Could Be Next
            </p>

            <h2
                class="text-4xl font-black uppercase sm:text-5xl"
            >
                Ready To See The Difference?
            </h2>

            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Book your wash or valet and let BFM take care of the rest.
            </p>

            <a
                href="/book"
                class="mt-8 inline-block rounded-lg bg-blue-600 px-10 py-4 font-bold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
            >
                BOOK NOW
            </a>

        </div>

    </section>

</main>