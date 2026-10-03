import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Pager lays a list of items into columns that fit the space it is given,
// then splits whatever does not fit onto further pages. Nothing ever scrolls:
// readers move between pages with the arrows, the dots, the keyboard, or a swipe.

const CONTROLS_H = 44;
const CONT_LABEL_H = 18;
const MAX_DOTS = 10;

function packItems(heights, cols, availH, gap, isStart, contH) {
  const pages = [];
  let page;
  let col = 0;
  let used = 0;
  const newPage = () => {
    page = Array.from({ length: cols }, () => []);
    pages.push(page);
    col = 0;
    used = 0;
  };
  newPage();
  heights.forEach((h, i) => {
    const cost = () => (page[col].length ? gap : 0) + h + (page[col].length === 0 && !isStart(i) ? contH : 0);
    if (page[col].length && used + cost() > availH) {
      col += 1;
      used = 0;
      if (col >= cols) newPage();
    }
    used += cost();
    page[col].push(i);
  });
  return pages;
}

// An item taller than the whole page (a long card on a very short screen) is
// zoomed down to fit rather than cut off or given its own scrollbar.
const tallStyle = (h, availH) =>
  h > availH ? { zoom: Math.max(0.5, (availH - 2) / h).toFixed(3), maxHeight: availH } : undefined;

export default function Pager({
  items,
  renderItem,
  itemKey = (_, i) => i,
  minCol = 320,
  maxCols = 3,
  gap = 14,
  label,
  groupOf,
  groupLabel,
  resetKey,
}) {
  const rootRef = useRef(null);
  const measureRef = useRef(null);
  const touch = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [heights, setHeights] = useState(null);
  const [tick, setTick] = useState(0);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize((s) => (Math.abs(s.w - r.width) < 1 && Math.abs(s.h - r.height) < 1 ? s : { w: r.width, h: r.height }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setTick((t) => t + 1));
    ro.observe(el);
    document.fonts?.ready?.then(() => setTick((t) => t + 1));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [resetKey]);

  const cols = size.w ? Math.max(1, Math.min(maxCols, items.length || 1, Math.floor((size.w + gap) / (minCol + gap)))) : 1;
  const colW = size.w ? (size.w - gap * (cols - 1)) / cols : 0;

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || !colW) return;
    const hs = Array.from(el.children).map((c) => Math.ceil(c.getBoundingClientRect().height));
    setHeights((prev) => (prev && prev.length === hs.length && prev.every((v, i) => v === hs[i]) ? prev : hs));
  }, [items, colW, tick]);

  const isStart = useMemo(
    () => (i) => i === 0 || !groupOf || groupOf(items[i]) !== groupOf(items[i - 1]),
    [items, groupOf],
  );

  const layout = useMemo(() => {
    if (!heights || heights.length !== items.length || !size.h) return null;
    const contH = CONT_LABEL_H + gap;
    let availH = size.h;
    let pages = packItems(heights, cols, availH, gap, isStart, contH);
    if (pages.length > 1) {
      availH = size.h - CONTROLS_H;
      pages = packItems(heights, cols, availH, gap, isStart, contH);
    }
    return { pages, availH };
  }, [heights, items.length, size.h, cols, gap, isStart]);

  const total = layout ? layout.pages.length : 0;
  const page = Math.min(index, Math.max(0, total - 1));
  const go = (next) => setIndex(Math.max(0, Math.min(total - 1, next)));

  const onKeyDown = (e) => {
    if (total < 2) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      go(page + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      go(page - 1);
    }
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(page + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={rootRef}
      className="pager"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={total > 1 ? 0 : undefined}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (touch.current = null)}
    >
      {layout && (
        <div
          key={`${page}-${cols}`}
          className="pager-page"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, columnGap: gap }}
          aria-label={total > 1 ? `Page ${page + 1} of ${total}` : undefined}
        >
          {layout.pages[page].map((col, ci) => (
            <div key={ci} className="pager-col" style={{ gap }}>
              {col.length > 0 && !isStart(col[0]) && groupLabel && (
                <p className="pager-cont">{groupLabel(items[col[0]])} · continued</p>
              )}
              {col.map((i) => (
                <div
                  key={itemKey(items[i], i)}
                  className={`pager-item${heights[i] > layout.availH ? ' is-tall' : ''}`}
                  style={tallStyle(heights[i], layout.availH)}
                >
                  {renderItem(items[i], i)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div ref={measureRef} className="pager-measure" aria-hidden="true" inert="" style={{ width: colW || '100%' }}>
        {items.map((item, i) => (
          <div key={itemKey(item, i)} className="pager-item">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="pager-controls">
          <button type="button" className="icon-btn" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Previous page">
            <FiChevronLeft aria-hidden="true" />
          </button>
          {total <= MAX_DOTS && (
            <div className="pager-dots">
              {layout.pages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pager-dot${i === page ? ' is-active' : ''}`}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? 'true' : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          )}
          <span className="pager-count" aria-live="polite">
            {page + 1} / {total}
          </span>
          <button type="button" className="icon-btn" onClick={() => go(page + 1)} disabled={page === total - 1} aria-label="Next page">
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
