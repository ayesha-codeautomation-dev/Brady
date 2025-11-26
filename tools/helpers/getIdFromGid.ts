/**
 * Converts a Shopify GID to a numeric ID
 * @param gid Shopify Global ID (e.g., gid://shopify/Product/1234567890123)
 * @returns Numeric ID (e.g., 1234567890123) or the original ID if not a valid GID
 */
const getIdFromGid = (gid: string | number | undefined): string | number | undefined => {
  if (!gid) {
    return;
  }

  if (typeof gid !== 'string' || !gid.startsWith('gid://')) {
    return String(gid);
  }

  const matches = gid.match(/\/([^\/]+)$/);
  if (matches && matches[1]) {
    return matches[1];
  }

  return gid; // Return original if extraction fails
};

export default getIdFromGid;
