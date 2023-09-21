export default function removeAccents(str) {
    return str
        .normalize('NFD')  // Normalise la chaîne en décomposant les caractères accentués
        .replace(/[\u0300-\u036f]/g, '') // Supprime les caractères diacritiques
        .replace(/[éèêë]/g, 'e')  // Remplace les caractères accentués par 'e' (ajoutez d'autres remplacements au besoin)
        .replace(/[àâä]/g, 'a')  // Remplace les caractères accentués par 'a'
        // Ajoutez d'autres remplacements au besoin
        .toLowerCase(); // Convertit la chaîne en minuscules (facultatif)
}