'use client';

import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import css from './Pagination.module.css';

type ModuleWithDefault<T> = {
  default?: T;
};

const moduleWithDefault = ReactPaginateModule as unknown as ModuleWithDefault<
  ComponentType<ReactPaginateProps>
>;

const ReactPaginate =
  moduleWithDefault.default ??
  (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
