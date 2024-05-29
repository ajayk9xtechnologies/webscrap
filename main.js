
        const webscrap = document.querySelector('.webscrap');
        const scraptext = document.querySelector('.scraptext');

        async function submit() {
            const url = webscrap.value;
            await fetchData(url);
        }

        async function fetchData(url) {
            try {
                let response = await fetch(url);
                let html = await response.text();
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, 'text/html');

                // Get the table element containing the content
                let tableContent = doc.querySelector('table');

                if (tableContent) {
                    // Step 1: Remove every &nbsp;
                    let modifiedHTML = tableContent.innerHTML.replace(/&nbsp;/g, '');

                    // Step 2: Replace all <font color="GREEN" size="-1">x</font> with </p><p>
                    modifiedHTML = modifiedHTML.replace(/<font color="GREEN" size="-1">(\d+)<\/font>/g, '</p><p>');

                    // Step 3: Remove every <br> tag
                    modifiedHTML = modifiedHTML.replace(/<br>/g, '');

                    // Set the modified HTML to the div
                    scraptext.innerHTML = modifiedHTML;
                } else {
                    scraptext.innerHTML = 'No table found in the provided URL.';
                }
            } catch (error) {
                console.error('Error fetching the webpage:', error);
                scraptext.innerHTML = 'To ensure CORS (Cross-Origin Resource Sharing) is enabled for accessing content from different domains, you can use a browser extension. Search for "CORS" in the Chrome Web Store, add a reputable extension like "Allow CORS: Access-Control-Allow-Origin" to Chrome, and enable it. ';
            }
        }
    