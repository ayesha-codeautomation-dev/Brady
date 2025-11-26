const sortReviewsByRelevant = (reviews, order, referenceId) => {
  return reviews?.sort((a, b) => {
    const aIsRelevant = a.productId === `shopify-${referenceId ?? ''}`;
    const bIsRelevant = b.productId === `shopify-${referenceId ?? ''}`;
    switch (order) {
      case 'ascending':
        return bIsRelevant - aIsRelevant;
      case 'descending':
      default:
        return aIsRelevant - bIsRelevant;
    }
  });
};

export default sortReviewsByRelevant;
