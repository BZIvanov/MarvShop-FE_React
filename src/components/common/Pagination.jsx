import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationComponent = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
}) => {
  const totalPages = Math.ceil(totalItem / perPage);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {pageNumber > 1 && (
            <PaginationPrevious
              onClick={() => handlePageChange(pageNumber - 1)}
              className='cursor-pointer'
            />
          )}
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => handlePageChange(page)}
                className='cursor-pointer'
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          {pageNumber < totalPages && (
            <PaginationNext
              onClick={() => handlePageChange(pageNumber + 1)}
              className='cursor-pointer'
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  totalItem: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default PaginationComponent;
