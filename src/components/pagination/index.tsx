import React, { useCallback, memo } from 'react';
import { TablePagination } from '@mui/material';
import { useRoute } from 'react-router5';
import { INIT_PAGE_LIMIT, ROWS_PER_PAGE } from 'constants/ui';

type Props = {
  count: number;
};

export const Pagination = memo(({ count }: Props) => {
  const { route, router } = useRoute();
  const rowsPerPage: number = Number(route.params.limit) || INIT_PAGE_LIMIT;
  const page: number = Number(route.params.page) || 0;

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      router.navigate(route.name, {
        ...route.params,
        page: newPage,
      });
    },
    [route.name, route.params, router],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newRowPerPage = event.target.value;
      router.navigate(route.name, {
        ...route.params,
        limit: newRowPerPage,
      });
    },
    [route.name, route.params, router],
  );

  return (
    <TablePagination
      component="div"
      count={count}
      labelRowsPerPage="Строк на странице"
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={Math.floor(count / rowsPerPage) >= page ? page : Math.floor(count / rowsPerPage)}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={ROWS_PER_PAGE}
    />
  );
});
