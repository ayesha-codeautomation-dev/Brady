import { FiDatabase } from 'react-icons/fi';
import { TbPaint, TbDoor } from 'react-icons/tb';

const defaultSectionGroups = [
  {
    name: 'data',
    title: 'Data',
    default: true,
    icon: FiDatabase
  },
  {
    name: 'styles',
    title: 'Styles',
    icon: TbPaint
  },
  {
    name: 'internal',
    title: 'Internal',
    icon: TbDoor
  }
];

export default defaultSectionGroups;
