'use client';

import React from 'react';
import Button from '@/components/Button';
import { useCart } from '@/tools/store/useCart';

const AddToCartButton = (props: { disabled: boolean }) => {
  const { disabled: isOutOfStock } = props;
  const isAdding = useCart(state => state.isAdding);
  const isUpdating = useCart(state => state.isUpdating) || isOutOfStock;

  const getButtonText = () => {
    if (isOutOfStock) return 'Out of stock';
    if (isAdding) return 'Adding to cart...';
    return 'Purchase';
  };

  return (
    <Button type="submit" disabled={isUpdating} variant="square">
      {getButtonText()}
    </Button>
  );
};

export default AddToCartButton;
