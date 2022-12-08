/**
 * @module template
 */

import { SvgrTemplate, Target } from './interface';

export const commonSvgxTemplate: SvgrTemplate = ({
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

export const reactNativeSvgxTemplate: SvgrTemplate = ({
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

export function defaultTemplate(target: `${Target}` = 'react-dom'): SvgrTemplate {
  if (target === Target.ReactNative) {
    return reactNativeSvgxTemplate;
  } else {
    return commonSvgxTemplate;
  }
}
