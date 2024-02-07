import onWheel from './onWheel';
import onDrag from './onDarag';

export default function setupZoom(container: HTMLElement, view: paper.View, onChange: (zoom: number) => void = () => {}) {
  const initialCenter = view.center;
  document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.code === 'Digit0' && ev.altKey) {
      // eslint-disable-next-line no-param-reassign
      view.zoom = 1;
      // eslint-disable-next-line no-param-reassign
      view.center = initialCenter;
    }
    if (ev.key === 'Alt') {
      // eslint-disable-next-line no-param-reassign
      container.style.cursor = 'move';
      const handleWheel = (e: Event) => onWheel(e as WheelEvent, view);
      container.addEventListener('mousewheel', handleWheel);
      const cancelDrag = onDrag(view);
      document.addEventListener(
        'keyup',
        () => {
          // eslint-disable-next-line no-param-reassign
          container.style.cursor = 'unset';
          container.removeEventListener('mousewheel', handleWheel);
          cancelDrag();
        },
        { once: true },
      );
    }
  });
}
