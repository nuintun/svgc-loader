/**
 * @module template
 */

import { SvgcTemplate, Target } from './interface';

export const commonTemplate: SvgcTemplate = ({
  jsx,
  path,
  propsName,
  componentName
}) => `// Generated from ${path}

export const ${componentName} = ${propsName} => {
  return (
    ${jsx}
  );
};
`;

export const reactNativeTemplate: SvgcTemplate = ({
  jsx,
  path,
  propsName,
  components,
  componentName
}) => `// Generated from ${path}

import { ${components.join(', ')} } from 'react-native-svg';

export const ${componentName} = ${propsName} => {
  return (
    ${jsx}
  );
};
`;

export function defaultTemplate(target: `${Target}` = Target.ReactDOM): SvgcTemplate {
  if (target === Target.ReactNative) {
    return reactNativeTemplate;
  } else {
    return commonTemplate;
  }
}
