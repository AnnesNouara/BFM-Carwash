<script lang="ts">
    let { businessName }: { businessName: string } = $props();
</script>

<nav class="absolute left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        <!-- Logo -->
        <a href="/" class="shrink-0">
            <img
                src="/logo.png"
                alt={businessName}
                class="h-12 w-auto sm:h-14"
            />
        </a>

        <!-- Desktop navigation -->
        <div class="hidden items-center gap-8 md:flex">
            <a
                href="/"
                class="text-sm font-medium text-blue-400 transition"
            >
                HOME
            </a>

            <a
                href="/services"
                class="text-sm font-medium text-white transition hover:text-blue-400"
            >
                SERVICES
            </a>


            <a
                href="/gallery"
                class="text-sm font-medium text-white transition hover:text-blue-400"
            >
                GALLERY
            </a>

            <a
                href="/contact"
                class="text-sm font-medium text-white transition hover:text-blue-400"
            >
                CONTACT
            </a>
        </div>

        <!-- Book button -->
        <a
            href="/book"
            class="rounded-full border border-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
        >
            BOOK NOW
        </a>

    </div>
</nav>