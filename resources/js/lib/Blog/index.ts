
/**
 * formatting and stripping html tags from the excerpt string
 * @param excerpt The text excerpt to format.
 * @param maxLength The maximum length of the formatted excerpt.
 * @returns The formatted excerpt, truncated with ellipsis if it exceeds the maximum length.
 */
export function formatExcerpt(excerpt: string, maxLength: number = 100): string {
    if (excerpt.length <= maxLength) {
        return excerpt;
    }
    return excerpt.substring(0, maxLength) + '...';
}