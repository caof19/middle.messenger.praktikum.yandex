export function toggleClass(selectorElem, className) {
  const elem = document.querySelector(selectorElem);

  if(elem.classList.contains(className)) {
    elem.classList.remove(className)
  } else {
    elem.classList.add(className)
  }
}
