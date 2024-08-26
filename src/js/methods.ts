export function toggleClass(selectorElem:string, className:string):void {
  const elem:Element | null = document.querySelector(selectorElem);

  if(!elem) {
    return;
  }

  if (elem.classList.contains(className)) {
    elem.classList.remove(className);
  } else {
    elem.classList.add(className);
  }
}
