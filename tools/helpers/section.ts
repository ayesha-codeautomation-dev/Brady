export const getSectionSpacingProps = (props: any): any => {
  if (!props || !props.sectionFields || !props.sectionFields.spacingOptions) return {};
  const spacingOptions = props.sectionFields.spacingOptions;
  const { removeTopSpacing, removeBottomSpacing } = spacingOptions || {
    removeTopSpacing: false,
    removeBottomSpacing: false
  };
  return {
    spacing: 'lg',
    removeBottomSpacing,
    removeTopSpacing
  };
};
