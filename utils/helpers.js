function esTextoValido(texto) {
    if (typeof texto !== 'string') {
        return false;
    }
    return texto.trim() !== '';
}

module.exports = {
    esTextoValido
};