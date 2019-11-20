import React from 'react';
import { Link } from 'gatsby';
import {
 createInstance,
 OptimizelyFeature,
 OptimizelyProvider,
} from '@optimizely/react-sdk'

export default ({ pageContext: { datafile } }) => {
  // Instantiate an Optimizely client
  const optimizely = createInstance({
    datafile,
  });

  console.log(optimizely);

  return (
    <OptimizelyProvider
      optimizely={ optimizely }
      user={ { id: 'bartSimpson' } }>
      <div style={{ width: 960, margin: '4rem auto' }}>
        <h1>Hello world!</h1>
        <OptimizelyFeature feature="gatsby_react_feature">
          { (isEnabled, variables) => {
             console.log('isEnabled', isEnabled);
             console.log('variables', variables);
             return (
               <div>
                Enabled: { `${isEnabled}` }<br />
                Variables: { JSON.stringify(variables, null, 2) }<br />
                 { isEnabled
                  ? `CTA IS ${variables.cta}`
                  : `Sorry we're closed!`
                 }
               </div>
            );
          } }
        </OptimizelyFeature>
        <h2>Your datafile:</h2>
        <pre>{ JSON.stringify(datafile, null, 2) }</pre>
      </div>
    </OptimizelyProvider>
  );
};
