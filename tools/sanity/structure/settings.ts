import { StructureBuilder } from 'sanity/structure';
import { TbSettings } from 'react-icons/tb';

const SettingsMenuItem = (S: StructureBuilder) =>
  S.listItem().title('Settings').child(S.document().schemaType('settings').documentId('settings')).icon(TbSettings);

export default SettingsMenuItem;
