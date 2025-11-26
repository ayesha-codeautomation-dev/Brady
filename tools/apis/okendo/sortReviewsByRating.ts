const sortReviewsByRating = (reviews, order) => {
  return reviews.sort((a, b) => {
    switch (order) {
      case 'ascending':
        return b.rating - a.rating;
      case 'descending':
      default:
        return a.rating - b.rating;
    }
  });
};

export default sortReviewsByRating;
