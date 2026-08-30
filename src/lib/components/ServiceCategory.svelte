<script lang="ts">
    let {
        title,
        icon,
        services
    }: {
        title: string;
        icon: string;
        services: {
            name: string;
            price: number;
        }[];
    } = $props();
</script>

<div
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-8 transition duration-300 hover:border-blue-500/40"
>
    <!-- Blue glow -->
    <div
        class="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl transition duration-500 group-hover:bg-blue-600/20"
    ></div>

    <div class="relative">

        <!-- Header -->
        <div class="mb-8 flex items-center gap-4">

            <div
                class="flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-2xl"
            >
                {icon}
            </div>

            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                    BFM
                </p>

                <h3 class="text-2xl font-black uppercase text-white">
                    {title}
                </h3>
            </div>

        </div>

        <!-- Services -->
        <div class="divide-y divide-white/10">

            {#each services as service}
                <div class="flex items-center justify-between py-5">

                    <span class="text-base font-medium text-gray-300 sm:text-lg">
                        {service.name}
                    </span>

                    <span class="text-2xl font-black text-blue-500">
                        €{service.price}
                    </span>

                </div>
            {/each}

        </div>

        <!-- Button -->
        <a
            href="/contact"
            class="mt-8 block rounded-lg bg-blue-600 px-6 py-4 text-center font-bold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
        >
            BOOK {title.toUpperCase()}
        </a>

    </div>
</div>