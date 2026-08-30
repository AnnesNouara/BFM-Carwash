<script lang="ts">
    let {
        title,
        description,
        icon
    }: {
        title: string;
        description: string;
        icon: string;
    } = $props();
</script>

<div class="group border-t border-white/10 py-8">
    <div
        class="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-xl text-blue-400 transition duration-300 group-hover:bg-blue-500 group-hover:text-white"
    >
        {icon}
    </div>

    <h3 class="mb-3 text-xl font-bold text-white">
        {title}
    </h3>

    <p class="leading-7 text-gray-400">
        {description}
    </p>
</div>