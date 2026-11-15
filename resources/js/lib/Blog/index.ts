export function formatExcerpt(excerpt: string, maxLength: number = 100): string {
    if (excerpt.length <= maxLength) {
        return excerpt;
    }
    return excerpt.substring(0, maxLength) + '...';
}