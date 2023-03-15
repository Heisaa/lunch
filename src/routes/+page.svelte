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

    const convertHtmlToDoc = (htmlString) => {
        return new DOMParser().parseFromString(htmlString, "text/html");
    };

    const restaurants = [
        {
            name: "P2",
            url: "https://www.restaurangp2.se/lunch",
            getHtml(data) {
                const doc = new DOMParser().parseFromString(data, "text/html");
                const htmlOfToday = doc.querySelector(
                    `#${todayName.toLowerCase()}`
                );

                if (htmlOfToday) {
                    return htmlOfToday.childNodes[3].innerHTML;
                } else {
                    return "No lunch today!";
                }
            },
        },
        {
            name: "Ubåtshallen",
            url: "https://www.ubatshallen.se/",
            getHtml(data) {
                const doc = new DOMParser().parseFromString(data, "text/html");
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
            url: "https://cms.restaurangspill.se/wp-json/wp/v2/pages/12",
            getHtml(data) {
                const dataAsJSON = JSON.parse(data);
                console.log(dataAsJSON.acf);

                try {
                    return dataAsJSON.acf.dagens_primar + "<br>" + dataAsJSON.acf.dagens_veg
                } catch {
                    return "No lunch today!";
                }
            },
        },
        {
            name: "Mia Maria",
            url: "http://www.miamarias.nu/",
            getHtml(data) {
                const doc = new DOMParser().parseFromString(data, "text/html");
                const dagensHtml = doc.querySelectorAll(
                    `div.et_pb_toggle_content`
                );
                console.log(dagensHtml);
                try {
                    return [...dagensHtml]
                        .map((node) => node.textContent)
                        .join("<br><br>");
                } catch {
                    return "No lunch today!";
                }
            },
        },
        // {
        //     name: "Niagara",
        //     url: "https://restaurangspill.se/",
        //     getHtml(doc) {
        //         // Get the day name for today
        //         const dagensHtml = doc.querySelector(`#dagens`);

        //         try {
        //             const htmlOfToday = dagensHtml.childNodes[0].childNodes[0].childNodes[1]
        //             .childNodes[0].childNodes[1].childNodes[1].textContent;

        //             return htmlOfToday;
        //         } catch {
        //             return "No lunch today!"
        //         }

        //     },
        // },
    ];
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div id="site">
    <div class="container">
        <h1 class="header">Äh, de e lunch</h1>
        {#each restaurants as restaurant}
            <Restaurant {restaurant} />
        {/each}
    </div>
</div>

<style>
    #site {
        margin: 0 20px;
        font-family: "Cormorant Garamond", serif;
        display: flex;
        justify-content: center;
    }

    .container {
        max-width: 1000px;
        flex-grow: 1;
    }

    .header {
        border-bottom: 2px solid black;
    }
</style>
