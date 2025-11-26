import * as React from 'react';
import { Stack } from '@sanity/ui';
import BuildStatus from '../BuildStatus';

import './styles.css';

const NavBar = props => (
  <div id="navbar">
    <Stack>
      <BuildStatus navbar />
      <>{props.renderDefault(props)}</>
    </Stack>
  </div>
);

export default NavBar;
