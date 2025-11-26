const sortReviewsByTime = (reviews, order) => {
  return reviews.sort((a, b) => {
    const date1 = new Date(a?.dateCreated).getTime();
    const date2 = new Date(b?.dateCreated).getTime();
    switch (order) {
      case 'ascending':
        return date2 - date1;
      case 'descending':
      default:
        return date1 - date2;
    }
  });
};

export default sortReviewsByTime;
