import {$} from '@core/Dom';

export function resizeHandler($root, event) {
  const $resize = $(event.target);
  // closest - находит ближайшего родителя, у которого дата атрибут: '[data-type="resizable"]'
  const $parent = $resize.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();
  const type = $resize.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let delta;
  let value;
  
  $resize.css({
    opacity: 1,
    [sideProp]: '-5000px'
  });
  
  document.onmousemove = (e) => {
    if (type === 'col') {
      delta = e.pageX - coordinates.right;
      value = coordinates.width + delta;
      $resize.css({right: -delta + 'px'});
    } else {
      delta = e.pageY - coordinates.bottom;
      value = coordinates.height + delta;
      $resize.css({bottom: -delta + 'px'});
    }
  };
  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'});
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((el) => el.style.width = value + 'px');
      $resize.css({
        opacity: 0,
        right: 0
      });
    } else {
      $parent.css({height: value + 'px'});
      $resize.css({
        opacity: 0,
        bottom: 0
      });
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };
}