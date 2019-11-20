import React from 'react';
import { Link } from 'gatsby';
import {
 createInstance,
 OptimizelyFeature,
 OptimizelyProvider,
} from '@optimizely/react-sdk'

export default ({ pageContext: { datafile } }) => {
  const optimizely = createInstance({
    datafile,
  });

  return (
    <OptimizelyProvider
      optimizely={ optimizely }
      user={ { id: 'bartSimpson' } }>
      <div style={{ width: 960, margin: '4rem auto' }}>
        <h1>My feature!</h1>
        <OptimizelyFeature feature="gatsby_react_feature">
          { (isEnabled, variables) => (
             <div>
              Enabled: { `${isEnabled}` }<br />
              Variables: { JSON.stringify(variables, null, 2) }<br />
              CTA IS: { isEnabled ? variables.cta : `Sorry we're closed!` }
             </div>
          ) }
        </OptimizelyFeature>
        <h2>Your datafile:</h2>
        <pre>{ JSON.stringify(datafile, null, 2) }</pre>
      </div>
    </OptimizelyProvider>
  );
};
