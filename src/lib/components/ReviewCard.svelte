<script lang="ts">
    let {
        name,
        review,
        rating
    }: {
        name: string;
        review: string;
        rating: number;
    } = $props();
</script>

<div
    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-8 transition duration-300 hover:border-blue-500/40"
>
    <!-- Blue glow -->
    <div
        class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl transition duration-500 group-hover:bg-blue-600/20"
    ></div>

    <div class="relative">

        <!-- Stars -->
        <div class="flex gap-1 text-lg text-blue-400">
            {#each Array(rating) as _}
                ★
            {/each}
        </div>

        <!-- Review -->
        <p class="mt-6 text-lg leading-8 text-gray-300">
            "{review}"
        </p>

        <!-- Customer -->
        <div class="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">

            <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 font-bold text-blue-400"
            >
                {name.charAt(0)}
            </div>

            <div>
                <p class="font-semibold text-white">
                    {name}
                </p>

                <p class="text-sm text-gray-500">
                    Google Review
                </p>
            </div>

        </div>

    </div>
</div>