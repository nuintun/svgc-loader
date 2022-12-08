/**
 * @module template
 */

import { SvgoxTemplate, Target } from './interface';

export const commonSvgoxTemplate: SvgoxTemplate = ({
  jsx,
  sourceFile,
  targetFile,
  componentName
}) => `// Generated from ${sourceFile} to ${targetFile}

export const ${componentName} = props => {
  return (
    ${jsx}
  );
};
`;

export const reactNativeSvgoxTemplate: SvgoxTemplate = ({
  jsx,
  components,
  sourceFile,
  targetFile,
  componentName
}) => `// Generated from ${sourceFile} to ${targetFile}

import { ${components.join(', ')} } from 'react-native-svg';

export const ${componentName} = props => {
  return (
    ${jsx}
  );
};
`;

export function defaultTemplate(target: `${Target}` = 'react-dom'): SvgoxTemplate {
  if (target === Target.ReactNative) {
    return reactNativeSvgoxTemplate;
  } else {
    return commonSvgoxTemplate;
  }
}
