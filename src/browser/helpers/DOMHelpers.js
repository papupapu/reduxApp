// User device specs detection
export function userDevice() {
  const viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  const touchscreen = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
  let device = '';
  if (viewport.width > 950) {
    device = 'desktop';
  } else if (
    (viewport.width < 951 && viewport.width > 670) ||
    (viewport.width > 950)
  ) {
    device = 'tablet';
  } else {
    device = 'smartphone';
  }
  return { viewport, device, touchscreen };
}

// Scroll event handlers for smartphones and tablets
function artificialPreventDefault(e) {
  const event = e !== undefined ? e : window.event;
  if (event.preventDefault) {
    event.preventDefault();
  }
  event.returnValue = false;
}
export function disableScroll() {
  window.ontouchmove = artificialPreventDefault;
}
export function enableScroll() {
  window.ontouchmove = null;
}

// recursively checks if a DOM element is the child of another
export function isChildOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }
  return isChildOf(child.parentNode, parent);
}
