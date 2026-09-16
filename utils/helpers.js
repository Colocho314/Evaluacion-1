function esTextoValido(texto) {
    if (typeof texto !== 'string') {
        return false;
    }
    return texto.trim() !== '';
};

function convertirAMinusculas(texto) {
      return texto.trim().toLowerCase();
    };