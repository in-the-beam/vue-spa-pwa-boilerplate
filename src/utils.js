/**
 * @param str
 * @returns {*}
 */
function translit (str) {
  const from = [
    'ж',
    'ё',
    'й',
    'ю',
    'ч',
    'щ',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'з',
    'х',
    'ф',
    'ы',
    'в',
    'а',
    'п',
    'р',
    'о',
    'л',
    'д',
    'э',
    'я',
    'с',
    'м',
    'и',
    'т',
    'б',
    'Ё',
    'Й',
    'Ю',
    'Ч',
    'Щ',
    'Ц',
    'У',
    'К',
    'Е',
    'Н',
    'Г',
    'Ш',
    'З',
    'Х',
    'Ф',
    'Ы',
    'В',
    'А',
    'П',
    'Р',
    'О',
    'Л',
    'Д',
    'Ж',
    'Э',
    'Я',
    'С',
    'М',
    'И',
    'Т',
    'Б',
    'ь',
    'ъ',
    'Ь',
    'Ъ',
    ' '
  ]
  const replaceTo = [
    'zh',
    'yo',
    'iy',
    'yu',
    'ch',
    'sh',
    'c',
    'u',
    'k',
    'e',
    'n',
    'g',
    'sh',
    'z',
    'h',
    'f',
    'y',
    'v',
    'a',
    'p',
    'r',
    'o',
    'l',
    'd',
    'yе',
    'jа',
    's',
    'm',
    'i',
    't',
    'b',
    'yo',
    'I',
    'YU',
    'CH',
    'SH',
    'C',
    'U',
    'K',
    'E',
    'N',
    'G',
    'SH',
    'Z',
    'H',
    'F',
    'Y',
    'V',
    'A',
    'P',
    'R',
    'O',
    'L',
    'D',
    'Zh',
    'Ye',
    'Ja',
    'S',
    'M',
    'I',
    'T',
    'B',
    '-',
    '-',
    '-',
    '-',
    '-'
  ]
  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from[i], 'g'), replaceTo[i])
  }
  return str
}

/**
 * @param number
 * @param decimals
 * @param decPoint
 * @param thousandsSeparator
 * @returns {string}
 */
function numberFormat (number, decimals, decPoint, thousandsSeparator, locale) {
  switch (locale) {
    case 'ru':
      if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2
      }
      if (decPoint === undefined) {
        decPoint = '.'
      }
      if (thousandsSeparator === undefined) {
        thousandsSeparator = ' '
      }
      break
    default:
    case 'en':
    case 'eu':
    case 'us':
      if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2
      }
      if (decPoint === undefined) {
        decPoint = ','
      }
      if (thousandsSeparator === undefined) {
        thousandsSeparator = '.'
      }
  }
  let j
  const i = parseInt(number = (+number || 0).toFixed(decimals)) + ''
  if ((j = i.length) > 3) {
    j = j % 3
  } else {
    j = 0
  }
  const km = (j ? i.substr(0, j) + thousandsSeparator : '')
  const kw = i.substr(j)
    .replace(/(\d{3})(?=\d)/g, '$1' + thousandsSeparator)
  const kd = decimals ? decPoint + Math.abs(number - i)
    .toFixed(decimals)
    .replace(/-/, 0)
    .slice(2) : ''
  return km + kw + kd
}

function generatePassword (len) {
  const length = (len) || (10)
  const string = 'abcdefghijklmnopqrstuvwxyz'
  const numeric = '0123456789'
  let password = ''
  let character = ''
  let entity1
  let hold
  let entity2
  while (password.length < length) {
    entity1 = Math.ceil(string.length * Math.random() * Math.random())
    entity2 = Math.ceil(numeric.length * Math.random() * Math.random())
    hold = string.charAt(entity1)
    hold = (password.length % 2 === 0) ? (hold.toUpperCase()) : (hold)
    character += hold
    character += numeric.charAt(entity2)
    password = character
  }
  password = password.split('')
    .sort(function () {
      return 0.5 - Math.random()
    })
    .join('')
  return password.substr(0, len)
}

/**
 * router standalone middleware
 * parse route (i.e. /category/345-cars ) to:
 * known id and/or seo title to use in pages and/or components
 * @param   object  to
 * @param   object  from
 * @param   object  next
 * @return  Closure next
 */
function seo (to, from, next) {
  const id = String(to.params.id)
  const title = to.params.title
  if (id !== undefined) {
    const pattern = /^([\d]+)-(.*)$/giu
    if (id.match(pattern)) {
      const id = to.params.id.split('-') || null
      if (id.length > 0) {
        to.params.id = id[0]
      }
    }
  }
  if (title !== undefined) {
    const pattern = /^([\d]+)-(.*)$/giu
    if (title.match(pattern)) {
      const title = to.params.title.split('-') || null
      if (title.length > 0) {
        to.params.title = title[0]
      }
    }
  }
  next()
}

export {
  translit,
  numberFormat,
  generatePassword,
  seo
}
