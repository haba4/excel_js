import {Table} from '@/components/table/Table';
import {range} from '@core/utils';
import {COLLS} from '@/components/table/table.template';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

/**
 * Возвращает data аттрибут, согласно нажатой кнопке
 * @param {string} key
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  const MAX_VALUE_COL = COLLS - 1;
  const MAX_VALUE_ROW = Table.ROWS_COUNTS - 1;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE_ROW ? MAX_VALUE_ROW : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE_COL ? MAX_VALUE_COL : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}