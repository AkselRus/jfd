export function paginate(items, pageNumber, pageSize) {
    if (items) {
        const startIndex = (pageNumber - 1) * pageSize;
        return [...items].splice(startIndex, pageSize);
    }
}
