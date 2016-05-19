import React from 'react';

import {AppHeader} from '/lib/app/components/base/AppHeader.jsx';

export const MainLayout = ({content}) => (
  <div>
    <AppHeader />
    {content}
  </div>
);
