'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import classNames from '@/helpers/classNames';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Link from '@/components/Link';
import Icon from '@/components/Icon';
import LayoutOptions from '../LayoutOptions';
import type { LayoutOption } from '../LayoutOptions';
import SortByDropdown from '../SortByDropdown';
import {
  GetCollectionFiltersByHandleResponse,
  GetCollectionSubCollectionFiltersByIdResponse
} from '@/tools/apis/shopify';
import { setCollectionFiltersChangedProperty } from '../../helpers';
import styles from './styles.module.scss';

const Filters = ({
  filters,
  subCollectionFilters,
  layout,
  setLayout
}: {
  filters: GetCollectionFiltersByHandleResponse;
  subCollectionFilters: GetCollectionSubCollectionFiltersByIdResponse;
  layout: LayoutOption;
  setLayout: React.Dispatch<React.SetStateAction<LayoutOption>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [filtersHidden, setFiltersHidden] = useState(true);

  return (
    <div className={styles.filters}>
      <Container>
        <div className={styles.filtersContainer}>
          <Button
            className={classNames(styles.mobileFiltersToggle, { [styles.active]: !filtersHidden })}
            variant="normal-sm"
            onClick={() => setFiltersHidden(!filtersHidden)}
          >
            Filter <Icon title="chevronDown" className={styles.mobileFiltersToggleIcon} />
          </Button>
          <div className={classNames(styles.filterOptions, { [styles.hidden]: filtersHidden })}>
            {subCollectionFilters && subCollectionFilters.length > 0 && (
              <div className={styles.subCollectionFilter}>
                <Text size="b2" className={styles.filterGroupLabel} text="Filter by" />
                <div className={classNames(styles.filtersList)}>
                  {subCollectionFilters.map(({ handle, title, isSelected }) => (
                    <Link
                      href={`/${handle}/`}
                      key={handle}
                      className={classNames(styles.filterButton, { [styles.active]: isSelected })}
                      variant="normal-sm"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {filters && filters.length > 0 && (
              <div className={styles.otherFilters}>
                {filters.map(filter => (
                  <div key={filter.id} className={styles.filterGroup}>
                    <Text size="b2" className={styles.filterGroupLabel}>
                      {filter.label}
                    </Text>
                    <div className={styles.filtersList}>
                      {filter.values.map(value => (
                        <FilterButton
                          label={value.label}
                          filterValueId={value.id}
                          key={value.id}
                          customOnClick={() => {
                            setCollectionFiltersChangedProperty(true);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <Button
                variant="normal-sm"
                className={styles.clearFilters}
                onClick={() => {
                  setCollectionFiltersChangedProperty(true);
                  const params = new URLSearchParams();
                  router.push(`${pathname}?${params.toString()}`, { scroll: false });
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <div className={styles.sorting}>
            <div className={styles.sortFilter}>
              <SortByDropdown />
            </div>
            <div className={classNames(styles.layoutFilters, { [styles.hidden]: !filtersHidden })}>
              <LayoutOptions layout={layout} setLayout={setLayout} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const FilterButton = ({
  label,
  filterValueId,
  customOnClick
}: {
  label: string;
  filterValueId: string;
  customOnClick?: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);

  const idSplit = filterValueId.split('.');
  const filterValue = idSplit.slice(-1)[0];
  const filterKey = idSplit.slice(0, -1).join('.');

  const isActive = hydrated ? searchParams.getAll(filterKey).includes(filterValue) : false;

  useEffect(() => {
    setHydrated(true);
  }, []);

  // When a filter is clicked, update the URL
  const onClick = () => {
    if (customOnClick) {
      customOnClick();
    }

    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when filters change
    params.set('page', '1');

    const existingFilterParam = params.getAll(filterKey);

    // If the filter is already selected, remove it
    // Otherwise, add it
    if (existingFilterParam && existingFilterParam.includes(filterValue)) {
      params.delete(filterKey, filterValue);
    } else {
      params.append(filterKey, filterValue);
    }

    const query = params.toString();

    router.push(`${pathname}?${query}`, { scroll: false });
  };

  return (
    <Button
      variant="normal-sm"
      className={classNames(styles.filterButton, {
        [styles.active]: isActive
      })}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default Filters;
