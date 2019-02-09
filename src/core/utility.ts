export const copyToClipboard = (value: string) => {
  const el = document.createElement('textarea');
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const scrollToElement = (element: HTMLDivElement, padding = 40) => {
  const rect = element.getBoundingClientRect();
  const diff = rect.top - padding;
  scrollToPosition(diff);
};

const scrollToPosition = (change: number, duration = 300) => {
  const start = window.scrollY;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = (() => {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    window.scrollTo(0, val);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  });
  animateScroll();
};

const easeInOutQuad = (currTime: number, start: number, change: number, duration: number) =>  {
  currTime /= duration / 2;
  if (currTime < 1) {
    return change / 2 * currTime * currTime + start;
  }
  currTime--;
  return -change / 2 * (currTime * (currTime - 2) - 1) + start;
};
