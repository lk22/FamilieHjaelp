/**
 * Formats a blog excerpt to a specified maximum length, adding ellipsis if necessary.
 * @param excerpt string
 * @param maxLength number
 * @returns string
 */
export function formatExcerpt(excerpt: string, maxLength: number = 100): string {
    if (excerpt.length <= maxLength) {
        return excerpt;
    }
    return excerpt.slice(0, maxLength) + '...';
}