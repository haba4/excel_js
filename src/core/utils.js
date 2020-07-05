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