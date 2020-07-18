/**
 * Преобразовывает в строку с заглавной буквы
 * @param {string} string - получаем исходный текст
 * @return {string} - возвращаем текст с заглавной буквы
 */
// Концепт Pure Functions - функции не привязаны к глобальным переменным, на входе принимают параметр(ы),
// делают какие-то преобразования и выдают результат
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1, string.length);
}

/**
 * Приватная функция, которая преобразует к примеру: 'input' в 'onInput'
 * @param {string} eventName - на вход получает название эвента, например: 'click'
 * @return {string} - возвращает преобразованный эвент: 'onClick'
 */
export function _getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

/**
 * Вспомогательный метод, возвращает массив из диапазона чисел: input 0, 3; output: [0, 1, 2, 3]
 * @param {number} begin
 * @param {number} end
 * @return {[]}
 */
export function range(begin, end) {
  begin > end ? [end, begin] = [begin, end] : null;
  return new Array(end - begin + 1)
    .fill('')
    .map((_, index) => begin + index);
}