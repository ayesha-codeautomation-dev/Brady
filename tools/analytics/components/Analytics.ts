'use client';

import { useEffect } from 'react';
import useAnalytics from '../hooks/useAnalytics';

type AnalyticsProps = {
  trackViewItemList?: AnalyticsViewItemListParams;
  trackViewItem?: AnalyticsViewItemParams;
  trackSearch?: AnalyticsSearchParams;
  trackEvent?: AnalyticsTrackEvent;
  defaultBrand?: string;
};

/**
 * A component-based approach to firing analytics events in Next.js
 * Can be used in both Client Components and Server Components (through RSC boundaries)
 *
 * Example usage:
 * <Analytics trackViewItem={{ item: product }} />
 */
const Analytics = (props: AnalyticsProps) => {
  const {
    // Extract tracking props
    trackViewItemList,
    trackViewItem,
    trackSearch,
    trackEvent,

    // Config props
    defaultBrand
  } = props;

  // Initialize analytics with optional config
  const analytics = useAnalytics({
    defaultBrand
  });

  useEffect(() => {
    // Fire the appropriate tracking event based on which prop was provided

    if (trackViewItemList) {
      analytics.trackViewItemList(trackViewItemList);
    }

    if (trackViewItem) {
      analytics.trackViewItem(trackViewItem);
    }

    if (trackSearch) {
      analytics.trackSearch(trackSearch);
    }

    if (trackEvent) {
      analytics.trackEvent(trackEvent);
    }
  }, [analytics, trackViewItemList, trackViewItem, trackSearch, trackEvent]);

  // Component doesn't render anything
  return null;
};

export default Analytics;
