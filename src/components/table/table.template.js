const LETTER_MAPPING = {
  'A': 65,
  'Z': 91
};

export const COLLS = LETTER_MAPPING['Z'] - LETTER_MAPPING['A'];

/**
 * Функция формирует клетки таблицы
 * @param {number} row
 * @return {function}
 */
function toCell(row) {
  return function(_, col) {
    return `
      <div
        class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
       ></div>
    `;
  };
}

/**
 * Функция создает колонки таблицы
 * @param {string} col - название колонки
 * @param {number} index - индекс колонки
 * @return {string}
 */
function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

/**
 * Функция создает строчки таблицы
 * @param {number} index - номер строки
 * @param {string} content - содержимое строки
 * @return {string} - возвращает готовую строку
 */
function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${index ? index : ''}
          ${resize}
        </div>
        <div class="data">${content}</div>
    </div>
  `;
}

/**
 * Функция преобразовывает цифры в символы.
 * @param {string} _
 * @param {number} index
 * @return {string} - возвращает символ
 */
function toChar(_, index) {
  return String.fromCharCode(LETTER_MAPPING.A + index);
}

/**
 * Метод возвращает строку таблицы
 * @param {number} row - номер строки
 * @return {string}
 */
function getCells(row) {
  const colsCount = LETTER_MAPPING.Z - LETTER_MAPPING.A;
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row))
      .join('');
  return createRow(row + 1, cells);
}

/**
 * Функция возвращает первую строку таблицы (заголовок таблицы) в виде массива
 * @return {string}
 */
function getTableHeader() {
  const colsCount = LETTER_MAPPING.Z - LETTER_MAPPING.A;
  const cols = new Array(colsCount)
      .fill('') // получаем массив из пустых строк: ['', '', ..., '']
      .map(toChar) // получаем массив, содержащий буквы англ. алфавита: ['A', 'B', ..., 'Z']
      .map(toColumn) // получаем массив div элементов: ['<div class="column">A</div>', ...]
      .join('');
  
  return createRow(0, cols);
}

/**
 * Функция формирует отображение таблицы
 * @param {number} rowsCount
 * @return {string}
 */
export function createTable(rowsCount = 25) {
  const rows = [];
  
  rows.push(getTableHeader()); // первая строка - зоголовок таблицы: A, B, C, ...
  for (let row = 0; row < rowsCount; row++) {
    rows.push(getCells(row));
  }
  
  return rows.join('');
}