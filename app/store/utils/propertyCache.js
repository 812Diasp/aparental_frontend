// app/utils/propertyCache.js

export const cacheProperty = (property) => {
    if (typeof window === 'undefined') return;

    const cache = JSON.parse(localStorage.getItem('propertyCache') || '{}');
    cache[property.id] = property;
    localStorage.setItem('propertyCache', JSON.stringify(cache));
};

export const getCachedProperties = (ids) => {
    if (typeof window === 'undefined') return [];

    const cache = JSON.parse(localStorage.getItem('propertyCache') || '{}');
    return ids.map(id => cache[id]).filter(Boolean);
};

export const removeFromCache = (id) => {
    if (typeof window === 'undefined') return;

    const cache = JSON.parse(localStorage.getItem('propertyCache') || '{}');
    delete cache[id];
    localStorage.setItem('propertyCache', JSON.stringify(cache));
};

export const clearPropertyCache = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('propertyCache');
    }
};