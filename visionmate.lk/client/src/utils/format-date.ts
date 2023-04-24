/**
 * Formatter for date (Ex: Apr 14, 2023, 04:20 PM)
 *
 * @author M.M.N.H. Fonseka
 * */

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