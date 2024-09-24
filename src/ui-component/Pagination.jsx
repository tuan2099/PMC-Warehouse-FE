// import { textColor } from '@/utils/constants'
import { Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const TablePagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');

  const handlePageChange = (_, newPage) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      page: newPage.toString()
    });
  };

  return (
    <Stack>
      <Pagination count={count} onChange={handlePageChange} page={page ? +page : 1} />
    </Stack>
  );
};

export default TablePagination;
