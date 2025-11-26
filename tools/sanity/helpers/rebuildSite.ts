const rebuildSite = async (cleanCache, previewEnv, previewBranch) => {
  const buildHook = process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK;
  try {
    if (!buildHook) {
      throw new Error('Please set SANITY_STUDIO_NETLIFY_BUILD_HOOK');
    }
    const options = {
      method: 'POST',
      redirect: 'follow'
    };
    const paramsObj = {
      trigger_title: 'Manual deploy triggered by hook: Sanity'
    };
    if (previewEnv) {
      paramsObj.trigger_branch = previewBranch || 'preview';
    }
    if (cleanCache) {
      paramsObj.clear_cache = true;
    }
    const params = new URLSearchParams(paramsObj);
    const paramStringified = params?.toString();
    const response = await fetch(`${buildHook}${paramStringified ? `?${paramStringified}` : ''}`, options);
    const result = await response.text();
    console.log('Build triggered successfully', result);
  } catch (error) {
    console.error('Error triggering build', error);
  }
};

export default rebuildSite;
