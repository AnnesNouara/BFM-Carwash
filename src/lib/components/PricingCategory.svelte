<script lang="ts">
    let {
        title,
        services,
        featured = false
    }: {
        title: string;
        services: {
            name: string;
            price: number;
        }[];
        featured?: boolean;
    } = $props();
</script>

<div
    class={`rounded-2xl border p-8 ${
        featured
            ? "border-blue-500/50 bg-blue-500/[0.03]"
            : "border-white/10 bg-zinc-950"
    }`}
>
    <!-- Heading -->
    <div class="mb-8 text-center">

        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            BFM
        </p>

        <h3 class="mt-2 text-3xl font-black uppercase text-white">
            {title}
        </h3>

    </div>


    <!-- Prices -->
    <div class="divide-y divide-white/10">

        {#each services as service}
            <div class="flex items-center justify-between gap-6 py-5">

                <span class="text-base font-medium text-gray-300 sm:text-lg">
                    {service.name}
                </span>

                <span class="shrink-0 text-2xl font-black text-blue-500">
                    €{service.price}
                </span>

            </div>
        {/each}

    </div>


    <!-- Button -->
    <a
        href="/book"
        class="mt-8 block rounded-lg bg-blue-600 px-6 py-4 text-center font-bold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
    >
        BOOK {title.toUpperCase()}
    </a>

</div>