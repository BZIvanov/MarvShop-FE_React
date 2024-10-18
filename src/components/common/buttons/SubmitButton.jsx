import { ReloadIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SubmitButton = ({ isLoading = false, size, className, children }) => {
  return (
    <Button
      type='submit'
      disabled={isLoading}
      size={size || 'lg'}
      className={cn('flex items-center', className)}
    >
      {isLoading ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Loading
        </>
      ) : (
        children
      )}
    </Button>
  );
};

SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SubmitButton;
