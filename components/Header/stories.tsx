import type { Meta, StoryObj } from '@storybook/react';
import dummyImage from '@/assets/images/dummyImage.jpg';
import Component from './';

const meta: Meta<typeof Component> = {
  title: 'Elements/Header',
  component: Component,
  args: {
    menu: [
      {
        title: 'Home',
        href: '/'
      },
      {
        title: 'Articles',
        href: '/articles',
        submenu: [
          {
            title: 'Article 1',
            href: '/articles/article-1'
          },
          {
            title: 'Article 2',
            href: '/articles/article-2'
          }
        ]
      },
      {
        title: 'Pages',
        href: '/pages',
        submenu: [
          {
            title: 'Article 1',
            href: '/articles/article-1'
          },
          {
            title: 'Article 2',
            href: '/articles/article-2'
          }
        ]
      },
      {
        title: 'Contact',
        href: '/contact'
      }
    ],
    links: [
      {
        title: 'Login',
        href: '/login'
      },
      {
        title: 'Register',
        href: '/register'
      }
    ],
    showBanner: true,

    banner: {
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      link: {
        title: 'Read more',
        href: '/articles/article-1'
      }
    }
  }
} satisfies Meta<typeof Component>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
