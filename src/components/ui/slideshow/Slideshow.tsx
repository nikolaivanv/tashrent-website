import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from 'react-snap-carousel';
import './reset.css';

const styles = require('./Slideshow.module.css');

/**
 * This is an example Carousel built on top of `useSnapCarousel`
 */

export interface SlideShowProps<T> {
  readonly items: T[];
  readonly renderItem: (
    props: SlideShowRenderItemProps<T>
  ) => React.ReactElement<SlideShowItemProps>;
  readonly scrollPadding?: boolean;
}

export interface SlideShowRenderItemProps<T> {
  readonly item: T;
  readonly index: number;
  readonly isSnapPoint: boolean;
  readonly isActive: boolean;
}

export function SlideShow<T extends any>({
  items,
  renderItem,
  scrollPadding = false,
}: SlideShowProps<T>) {
  const {
    scrollRef,
    next,
    prev,
    goTo,
    pages,
    activePageIndex,
    snapPointIndexes,
    refresh,
  } = useSnapCarousel();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          next();
          return;
        case 'ArrowRight':
          prev();

        default:
      }
    };
    window.addEventListener('keypress', handle);
    return () => {
      window.removeEventListener('keypress', handle);
    };
  }, [next, prev]);

  return (
    <div
      className={classNames(styles.root, {
        [styles.scrollPadding]: scrollPadding,
      })}
    >
      <ul className={styles.scroll} ref={scrollRef}>
        {items.map((item, index) => renderItem({
          item,
          index,
          isSnapPoint: snapPointIndexes.has(index),
          isActive: activePageIndex === index,
        }))}
      </ul>
      <div className={styles.pageIndicator}>
        {activePageIndex + 1}
        {' '}
        /
        {pages.length}
      </div>
      <div className={styles.controls}>
        <button
          disabled={activePageIndex === 0}
          onClick={() => prev()}
          className={styles.prevButton}
        >
          {String.fromCharCode(8592)}
        </button>
        <ol className={styles.pagination}>
          {pages.map((_, i) => (
            <li
              key={i}
              className={classNames(styles.paginationItem, {
                [styles.paginationItemActive]: i === activePageIndex,
              })}
            >
              <button
                className={styles.paginationButton}
                onClick={() => goTo(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button
          disabled={activePageIndex === pages.length - 1}
          onClick={() => next()}
          className={styles.nextButton}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
    </div>
  );
}

export interface SlideShowItemProps {
  readonly isSnapPoint: boolean;
  readonly isActive: boolean;
  readonly src: string;
  readonly title: string;
  readonly subtitle: string;
}

export function SlideShowItem({
  isSnapPoint,
  isActive,
  src,
  title,
  subtitle,
}: SlideShowItemProps) {
  return (
    <li
      className={classNames(styles.item, {
        [styles.snapPoint]: isSnapPoint,
        [styles.itemActive]: isActive,
      })}
    >
      <div className={styles.itemText}>
        <h2 className={styles.itemTitle}>{title}</h2>
        <p className={styles.itemSubtitle}>{subtitle}</p>
      </div>
      <img src={src} className={styles.itemImage} alt="" />
    </li>
  );
}
