<script>
	let stars = Array(200)
		.fill()
		.map(() => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			opacity: Math.random() * 0.7 + 0.3,
			animationDelay: `${Math.random() * 2}s`
		}));
</script>

<div class="absolute inset-0 bg-slate-950">
	{#each stars as star}
		<div
			class="star absolute rounded-full bg-white"
			style="
        left: {star.x}%;
        top: {star.y}%;
        width: {star.size}px;
        height: {star.size}px;
        opacity: {star.opacity};
        animation-delay: {star.animationDelay};
      "
		></div>
	{/each}
</div>

<style>
	.star {
		animation: twinkle 3s infinite ease-in-out;
		box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
	}
</style>
