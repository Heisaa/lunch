<script>
    // @ts-nocheck

    import Restaurant from "./Restaurant.svelte";

    const dayOfWeek = new Date().getDay();

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const veckodagar = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
    ];

    const todayName = dayNames[dayOfWeek];
    const todayNameSwe = veckodagar[dayOfWeek];

    const restaurants = [
        {
            name: "P2",
            url: "https://www.restaurangp2.se/lunch",
            getHtml(doc) {
                // Get the day name for today
                const htmlOfToday = doc.querySelector(
                    `#${todayName.toLowerCase()}`
                );

                if (htmlOfToday) {
                    return htmlOfToday.innerHTML;
                } else {
                    return "No lunch today!";
                }
            },
        },
        {
            name: "Ubåtshallen",
            url: "https://www.ubatshallen.se/",
            getHtml(doc) {
                const container = Array.from(
                    doc.querySelectorAll(".wp-block-group__inner-container")
                ).find(
                    (container) =>
                        container.children[0].textContent.trim() ===
                        todayNameSwe
                );
                if (!container) {
                    return "No lunch today!";
                }
                const foodDescriptions = [...container.children]
                    .slice(1)
                    .map((child) => child.textContent.trim());
                return foodDescriptions.join("<br>");
            },
        },
        {
            name: "Spill",
            url: "https://restaurangspill.se/",
            getHtml(doc) {
                // Get the day name for today
                const dagensHtml = doc.querySelector(`#dagens`);

                try {
                    const htmlOfToday = dagensHtml.childNodes[0].childNodes[0].childNodes[1]
                    .childNodes[0].childNodes[1].childNodes[1].textContent;
                    
                    return htmlOfToday;
                } catch {
                    return "No lunch today!"
                }
                
            },
        },
    ];
</script>

<div>
    <h1>Äh, de e lunch</h1>
    {#each restaurants as restaurant}
        <Restaurant {restaurant} />
    {/each}
</div>
