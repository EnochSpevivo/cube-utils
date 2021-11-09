const trimChar = (str, char) => {
    if (str[0] === char && str[str.length - 1] === char) return str.slice(1,-1);

    return str.trim();
}

export {
    trimChar,
}