import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Slash } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const Breadcrumbs = ({ links, label }) => {
  return (
    <Breadcrumb className='flex items-center h-14 justify-center bg-gray-100'>
      <BreadcrumbList>
        {links.map((breadcrumbLink) => {
          return (
            <Fragment key={breadcrumbLink.linkTo}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild={true}>
                  <Link
                    to={breadcrumbLink.linkTo}
                    className='text-gray-400 hover:underline'
                  >
                    {breadcrumbLink.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-gray-500'>
                <Slash />
              </BreadcrumbSeparator>
            </Fragment>
          );
        })}

        <BreadcrumbItem>
          <BreadcrumbPage className='text-gray-700'>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.array,
  label: PropTypes.string,
};

export default Breadcrumbs;
