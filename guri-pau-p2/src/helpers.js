// Helper function that performs a fetch to the specific API
// it helps reduce the length of the url in the components
export function fetchAPI(endpointString) {
    const promise = fetch('https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/eventos-de-la-agenda-cultural-categorizados-y-geolocalizados/records' + endpointString);
    return promise;
}

// Helper function that formats a date from the standard format (YYYY-MM-DD)
// to the spanish format DD/MM/YYYY
export function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
}