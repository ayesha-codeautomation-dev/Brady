import { revalidatePath, revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Payload = {
  slug: {
    current: string;
  };
  store: {
    slug: {
      current: string;
    };
  };
  _type: string;
};

export const POST = async (req: NextRequest) => {
  try {
    console.log('🔄 Revalidate webhook received');
    const data: Payload = await req.json();
    console.log('📦 Webhook payload:', JSON.stringify(data, null, 2));

    const type = data?._type;
    const slug = data?.slug?.current || data?.store?.slug?.current;

    console.log(`🏷️ Document type: ${type}`);
    console.log(`🔗 Document slug: ${slug || 'NO_SLUG'}`);

    const revalidatedPaths: string[] = [];
    const revalidatedTags: string[] = [];

    switch (type) {
      case 'page':
        console.log(`➡️ Revalidating page: ${slug}`);
        revalidatePath(slug);
        revalidatedPaths.push(slug);
        break;
      case 'article':
        console.log(`➡️ Revalidating article: ${slug}`);
        revalidatePath(slug);
        revalidatePath(`/articles`);
        revalidatedPaths.push(slug, '/articles');
        break;
      case 'artwork':
        console.log(`➡️ Revalidating artwork: ${slug}`);
        revalidatePath(slug);
        revalidatePath(`/gallery/`);
        revalidatePath(`/gallery/archive/`);
        revalidatedPaths.push(slug, '/gallery/', '/gallery/archive/');
        break;
      case 'product':
        console.log(`➡️ Revalidating product: ${slug}`);
        if (slug) {
          revalidatePath(`/${slug}/`);
          revalidatedPaths.push(slug);
        }
        revalidateTag('headerProductSlugs');
        revalidatedTags.push('headerProductSlugs');
        break;
      case 'collection':
        console.log(`➡️ Revalidating collection: ${slug}`);
        if (slug) {
          revalidatePath(`/${slug}/`);
          revalidatedPaths.push(slug);
        }
        revalidateTag('headerCollectionSlugs');
        revalidatedTags.push('headerCollectionSlugs');
        break;
      case 'footerDocument':
        console.log(`➡️ Revalidating footer document`);
        revalidateTag('footerDocument');
        revalidatePath('/', 'layout');
        revalidatedTags.push('footerDocument');
        revalidatedPaths.push('/ (layout)');
        break;
      case 'headerDocument':
        console.log(`➡️ Revalidating header document`);
        revalidateTag('headerDocument');
        revalidatePath('/', 'layout');
        revalidatedTags.push('headerDocument');
        revalidatedPaths.push('/ (layout)');
        break;
      case 'socialMediaDocument':
        console.log(`➡️ Revalidating social media document`);
        revalidateTag('socialMediaDocument');
        revalidatePath('/', 'layout');
        revalidatedTags.push('socialMediaDocument');
        revalidatedPaths.push('/ (layout)');
        break;
      case 'sizeGuideDocument':
        console.log(`➡️ Revalidating size guide document`);
        revalidateTag('sizeGuideDocument');
        revalidatePath('/', 'layout');
        revalidatedTags.push('sizeGuideDocument');
        revalidatedPaths.push('/ (layout)');
        break;
      default:
        console.log(`⚠️ Unknown document type "${type}" - revalidating all`);
        revalidatePath('/', 'layout');
        revalidatedPaths.push('/ (layout - fallback)');
        break;
    }

    console.log('✅ Revalidation complete!');
    console.log('📋 Summary:', {
      type,
      slug: slug || 'NO_SLUG',
      revalidatedPaths,
      revalidatedTags,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      revalidated: true,
      details: {
        type,
        slug,
        revalidatedPaths,
        revalidatedTags,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ ERROR: Revalidation failed!');
    console.error('🔍 Error details:', error);
    console.error('📊 Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');

    return NextResponse.json({
      revalidated: false,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    });
  }
};
