<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    export let restaurant;
    let lunchHtml;

    onMount(async () => {
        fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
                restaurant.url
            )}`
        )
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                lunchHtml = restaurant.getHtml(data.contents);
            });
    });
</script>

<h2>{restaurant.name}</h2>
{#if lunchHtml}
    <div>{@html lunchHtml}</div>
{:else}
    <div>Väntar på lunchen</div>
{/if}
