export const isCmdEnter = e => (e.ctrlKey || e.metaKey) && e.keyCode == 13

export const toRuLocale = str => {
  const keys = {
    q: 'й',
    w: 'ц',
    e: 'у',
    r: 'к',
    t: 'е',
    y: 'н',
    u: 'г',
    i: 'ш',
    o: 'щ',
    p: 'з',
    '[': 'х',
    '{': 'Х',
    ']': 'ъ',
    '}': 'Ъ',
    '|': '/',
    '`': 'ё',
    '~': 'Ё',
    a: 'ф',
    s: 'ы',
    d: 'в',
    f: 'а',
    g: 'п',
    h: 'р',
    j: 'о',
    k: 'л',
    l: 'д',
    ';': 'ж',
    ':': 'Ж',
    "'": 'э',
    '"': 'Э',
    z: 'я',
    x: 'ч',
    c: 'с',
    v: 'м',
    b: 'и',
    n: 'т',
    m: 'ь',
    ',': 'б',
    '<': 'Б',
    '.': 'ю',
    '>': 'Ю',
    '/': '.',
    '?': ',',
    '@': '"',
    '#': '№',
    $: ';',
    '^': ':',
    '&': '?'
  }

  const letters = String.prototype.concat(
    [...new Set(str)].filter(letter => keys[letter])
  )

  let result = str

  for (let i = 0; i < letters.length; i++) {
    const en = letters.charAt(i)
    const ru = keys[en.toLowerCase()]

    const reg = new RegExp(en, 'mig')

    result = result.replace(reg, a =>
      a === a.toLowerCase() ? ru : ru.toUpperCase()
    )
  }

  return result
}
