import { TbEye } from 'react-icons/tb';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
const presentationPath = `/studio/visual-editor?preview=`;

type Props = {
  published?: any;
  draft?: any;
};

const PreviewAction = ({ published, draft, ...rest }: Props) => {
  const doc = draft || published;
  const currentPathname = doc?.pathname;

  if (!doc || !currentPathname) return null;

  return {
    icon: TbEye,
    label: 'Open Preview',
    onHandle: () => {
      window.open(siteUrl + presentationPath + currentPathname, `_blank`);
    }
  };
};

export default PreviewAction;
