import { definePlugin, DocumentActionComponent, DocumentActionsResolver, NewDocumentOptionsResolver } from 'sanity';
import shopifyDelete from './shopifyDelete';
import shopifyLink from './shopifyLink';

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = [
  'settings',
  'media.tag',
  'route',
  'socialMediaDocument',
  'headerDocument',
  'footerDocument',
  'blogLandingPage',
  'sizeGuideDocument'
];

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the Sanity Connect Shopify app - and can be linked to on Shopify
export const SHOPIFY_DOCUMENT_TYPES = ['product', 'productVariant', 'collection'];

export const resolveDocumentActions: DocumentActionsResolver = (prev, { schemaType }) => {
  if (LOCKED_DOCUMENT_TYPES.includes(schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === 'publish' || previousAction.action === 'discardChanges'
    );
  }

  if (SHOPIFY_DOCUMENT_TYPES.includes(schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === 'publish' ||
        previousAction.action === 'unpublish' ||
        previousAction.action === 'discardChanges'
    );

    return [...prev, shopifyDelete as DocumentActionComponent, shopifyLink as DocumentActionComponent];
  }

  return prev;
};

export const resolveNewDocumentOptions: NewDocumentOptionsResolver = prev => {
  const options = prev.filter(previousOption => {
    return (
      !LOCKED_DOCUMENT_TYPES.includes(previousOption.templateId) &&
      !SHOPIFY_DOCUMENT_TYPES.includes(previousOption.templateId)
    );
  });

  return options;
};

export const customDocumentActions = definePlugin({
  name: 'custom-document-actions',
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: resolveNewDocumentOptions
  }
});
