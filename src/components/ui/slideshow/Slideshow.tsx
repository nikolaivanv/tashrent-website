import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from 'react-snap-carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'react-feather';
// import './reset.css';

// const styles = require('./Slideshow.module.css');

// console.log(styles.scroll);

/**
 * This is an example Carousel built on top of `useSnapCarousel`
 */

export interface SlideShowProps<T> {
  readonly items: T[];
  readonly pagination?: boolean;
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
  pagination = false,
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
      className="relative group" // styles.root
    >
      {/* <ul className={styles.scroll} */}
      <ul
        className={classNames(
          'box-border relative flex overflow-auto snap-x snap-mandatory overscroll-contain no-scrollbar rounded-xl',
          { 'scroll-p-5': scrollPadding },
        )}
        ref={scrollRef}
      >
        {items.map((item, index) => renderItem({
          item,
          index,
          isSnapPoint: snapPointIndexes.has(index),
          isActive: activePageIndex === index,
        }))}
      </ul>
      {/* className={styles.pageIndicator} */}
      <div className="font-bold text-sm absolute top-2.5 right-2.5 text-gray-800 bg-white/50 px-2.5 py-3">
        {activePageIndex + 1}
        {' '}
        /
        {pages.length}
      </div>
      <button
        disabled={activePageIndex === 0}
        onClick={() => prev()}
          // styles.prevButton
        className="absolute items-center justify-center hidden w-10 h-10 text-lg transition-opacity duration-100 ease-out rounded-full group-hover:enabled:flex left-5 top-1/2 bg-white/80 disabled:hidden"
      >
        <ChevronLeft size={30} className="text-gray-800" />
      </button>
      <button
        disabled={activePageIndex === pages.length - 1}
        onClick={() => next()}
          // styles.prevButton
        className="absolute items-center justify-center hidden w-10 h-10 text-lg transition-opacity duration-100 ease-out rounded-full group-hover:enabled:flex right-5 top-1/2 bg-white/80 disabled:hidden"
      >
        <ChevronRight size={30} className="text-gray-800" />
      </button>

      {/* className={styles.controls} */}

      {/* className={styles.pagination} */}
      {pagination && (
      <div className="flex items-center justify-center py-4 mx-4 text-gray-800">
        <ol className="flex flex-wrap">
          {pages.map((_, i) => (
            <li
              key={i}
              className="flex justify-center"
            >
              <button
                className={classNames(
                  'block w-3 h-3 m-2 overflow-hidden transition-opacity duration-100 ease-out bg-gray-800 rounded-full -indent-12',
                  { 'opacity-30': i === activePageIndex },
                )} // styles.paginationButton // styles.paginationItemActive
                onClick={() => goTo(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>
      )}
    </div>
  );
}

export interface SlideShowItemProps {
  readonly isSnapPoint: boolean;
  readonly isActive: boolean;
  readonly src: string;
  // readonly title: string;
  // readonly subtitle: string;
}

export function SlideShowItem({
  isSnapPoint,
  isActive,
  src,
  // title,
  // subtitle,
}: SlideShowItemProps) {
  return (
    <li
    // styles.item
      className={classNames('w-full aspect-square overflow-hidden shrink-0 relative', {
        'snap-start': isSnapPoint, // styles.snapPoint
        '': isActive, // styles.itemActive
      })}
    >
      {/* styles.itemText */}
      {/* <div className=""> */}
      {/* styles.itemTitle */}
      {/* <h2 className="">{title}</h2> */}
      {/* styles.itemSubtitle */}
      {/* <p className="">{subtitle}</p> */}
      {/* </div> */}
      {/* styles.itemImage */}
      <Image
        src={src}
        // className="absolute top-0 left-0 w-full h-full"
        alt=""
        // width={500}
        // height={600}
        fill
        style={{
          objectFit: 'cover',
        }}
        // width={500}
        // height={500}
        // alt="Picture of the author"
      />
    </li>
  );
}
