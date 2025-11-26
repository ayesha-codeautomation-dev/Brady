const sortReviewsByHelpful = (reviews, order) => {
  return reviews.sort((a, b) => {
    switch (order) {
      case 'ascending':
        return b.helpfulCount - b.unhelpfulCount - (a.helpfulCount - a.unhelpfulCount);
      case 'descending':
      default:
        return a.helpfulCount - a.unhelpfulCount - (b.helpfulCount - b.unhelpfulCount);
    }
  });
};

export default sortReviewsByHelpful;
