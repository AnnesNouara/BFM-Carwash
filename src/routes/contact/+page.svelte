<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";

    let { form } = $props();

    const businessName = "BFM Carwash";
</script>

<svelte:head>
    <title>Contact Us | {businessName}</title>

    <meta
        name="description"
        content="Contact BFM Carwash in Dundalk for enquiries about our car wash and valet services."
    />
</svelte:head>

<main class="min-h-screen bg-black text-white">

    <Navbar businessName={businessName} />

    <!-- Hero -->
    <section class="px-6 pb-16 pt-36 text-center lg:px-8">

        <div class="mx-auto max-w-3xl">

            <p
                class="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
            >
                Contact Us
            </p>

            <h1
                class="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl"
            >
                Let's Talk
            </h1>

            <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Have a question about our services? Send us an enquiry and
                we'll get back to you.
            </p>

        </div>

    </section>


    <!-- Contact content -->
    <section class="px-6 pb-24 lg:px-8">

        <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">

            <!-- Contact information -->
            <div
                class="rounded-2xl border border-white/10 bg-zinc-950 p-8 lg:col-span-2"
            >

                <p
                    class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                >
                    Get In Touch
                </p>

                <h2 class="mt-3 text-3xl font-black uppercase">
                    We'd Love To Hear From You
                </h2>

                <p class="mt-5 leading-7 text-gray-400">
                    Whether you have a question about a service, want to
                    enquire about your vehicle, or simply need some advice,
                    get in touch with the BFM team.
                </p>


                <!-- Location -->
                <div class="mt-10 flex gap-4">

                    <div>
                        <h3 class="font-bold text-white">
                            Location
                        </h3>

                        <p class="mt-1 leading-6 text-gray-400">
                            Dundalk Retail Park<br />
                            Inner Relief Road<br />
                            Marshes Upper<br />
                            Dundalk, Co. Louth<br />
                            A91 KD5X
                        </p>
                    </div>

                </div>


                <!-- Phone -->
                <div class="mt-8 flex gap-4">

                
                    <div>
                        <h3 class="font-bold text-white">
                            Phone
                        </h3>

                        <a
                            href="tel:+353851921882"
                            class="mt-1 block text-gray-400 transition hover:text-blue-400"
                        >
                            085 192 1882
                        </a>
                    </div>

                </div>


                <!-- Booking -->
                <div
                    class="mt-10 border-t border-white/10 pt-8"
                >

                    <p class="text-sm text-gray-500">
                        Looking to book a service?
                    </p>

                    <a
                        href="/book"
                        class="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        BOOK NOW
                    </a>

                </div>

            </div>


            <!-- Form -->
            <div
                class="rounded-2xl border border-blue-500/20 bg-zinc-950 p-8 lg:col-span-3"
            >

                <p
                    class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400"
                >
                    Send An Enquiry
                </p>

                <h2 class="mt-3 text-3xl font-black uppercase">
                    How Can We Help?
                </h2>

            {#if form?.success}
                <div class="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-400">
                    Thanks! Your enquiry has been sent. We'll get back to you soon.
                </div>
            {/if}

            {#if form?.error}
                <div class="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
                    {form.error}
                </div>
            {/if}

                <form method="POST" class="mt-8 space-y-6">

                    <!-- Name -->
                    <div>
                        <label
                            for="name"
                            class="mb-2 block text-sm font-semibold text-gray-300"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                            class="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                        />
                    </div>


                    <!-- Email -->
                    <div>
                        <label
                            for="email"
                            class="mb-2 block text-sm font-semibold text-gray-300"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            class="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                        />
                    </div>


                    <!-- Phone -->
                    <div>
                        <label
                            for="phone"
                            class="mb-2 block text-sm font-semibold text-gray-300"
                        >
                            Phone
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Your phone number"
                            class="w-full rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                        />
                    </div>


                    <!-- Message -->
                    <div>
                        <label
                            for="message"
                            class="mb-2 block text-sm font-semibold text-gray-300"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            placeholder="How can we help?"
                            required
                            class="w-full resize-none rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                        ></textarea>
                    </div>


                    <!-- Submit -->
                    <button
                        type="submit"
                        class="w-full rounded-lg bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        SEND INQUIRY
                    </button>

                </form>

            </div>

        </div>

    </section>

</main>