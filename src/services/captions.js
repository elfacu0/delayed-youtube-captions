export async function getCaptions(id) {
    if (!id) return '';
    const response = await fetch(
        `https://video.google.com/timedtext?lang=en&v=${id}`
    );
    let data = await response.text();
    data = convertData(data);
    if (!data) {
        console.log('Error, video doesnt have captions ');
        return '';
    }
    return data;
}

function convertData(data) {
    const captions = [];
    let parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');
    const xmlCaptions = xmlDoc.getElementsByTagName('text');
    for (let i = 0; i < xmlCaptions.length; i++) {
        // console.log(xmlCaptions[i].getAttribute('start'));
        // console.log(xmlCaptions[i].textContent.replace('&#39;', "'"));
        captions.push({
            start: Number(xmlCaptions[i].getAttribute('start')),
            duration: Number(xmlCaptions[i].getAttribute('dur')),
            text: xmlCaptions[i].textContent
                .replace('&#39;', "'")
                .replace('&quot;', '"'),
        });
    }
    return captions;
}
