export function getId(url) {
    if (!url) return '';
    return url.split('=')[1].split('&')[0];
}
