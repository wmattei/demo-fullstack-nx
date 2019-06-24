export function camelCase(str: string, firstCapital: boolean = false): string {
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (firstCapital === true && offset === 0) return p1;
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

export function snakeCase(str: string) {
    return str
        .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4')
        .toLowerCase();
}

export function parseInArray(arr: string[], str: string) {
    return arr.some(x => !!str.match(x));
}

export function removeSentence(str: string, sentence: string) {
    return str.replace(sentence, '').trim();
}

export function titleCase(str) {
    str = str.toLowerCase().split(' ');
    let final = [];
    for (let word of str) {
        final.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return final.join(' ');
}
