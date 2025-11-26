import * as React from 'react';

const ReadOnlyImageInput = props => {
  const { schemaType } = props;
  const { imageUrl } = schemaType || {};

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="Section Preview" style={{ width: '400px', height: 'auto' }} />
    </div>
  );
};

export default ReadOnlyImageInput;
