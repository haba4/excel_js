const LETTER_MAPPING = {
  'A': 65,
  'Z': 91
};

/**
 * Функция формирует клетки таблицы
 * @param {string} cell
 * @param {number} colIndex
 * @return {string}
 */
function toCell(cell, colIndex) {
  return `
    <div class="cell" contenteditable data-col="${colIndex}">${cell}</div>
  `;
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
 * @param {number} index - номер строки
 * @return {string}
 */
function getCells(index) {
  const colsCount = LETTER_MAPPING.Z - LETTER_MAPPING.A;
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');
  return createRow(index, cells);
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
  for (let i = 0; i < rowsCount; i++) {
    rows.push(getCells(i + 1));
  }
  
  return rows.join('');
}