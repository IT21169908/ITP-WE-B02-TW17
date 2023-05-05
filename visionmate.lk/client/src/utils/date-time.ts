
export function formatDate(date: string): string {
    return new Date(date).toLocaleString("en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
}

export function getCurrentDateTime() {
    return new Date().toLocaleString('en-US', {
        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
}
