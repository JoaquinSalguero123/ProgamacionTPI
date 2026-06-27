export const normalizeName = (str) =>
    str
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export const normalizeEmail = (str) =>
    str
        .toLowerCase()
        .trim();

export const normalizePhoneAR = (phone) => {
    if (!phone || typeof phone !== "string") return null;

    // eliminar todo lo que no sea número
    let cleaned = phone.replace(/\D/g, "");

    // eliminar 0 inicial (prefijo nacional)
    if (cleaned.startsWith("0")) {
        cleaned = cleaned.slice(1);
    }

    // eliminar código país si ya lo tiene
    if (cleaned.startsWith("54")) {
        cleaned = cleaned.slice(2);
    }

    // eliminar 9 si viene duplicado o mal puesto
    if (cleaned.startsWith("9")) {
        cleaned = cleaned.slice(1);
    }

    // validación básica (longitud típica argentina)
    if (cleaned.length !== 10) {
        return null; // inválido
    }

    // devolver en formato internacional
    return `+549${cleaned}`;
};