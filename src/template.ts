/**
 * @module template
 */

import { SvgxTemplate, Target } from './interface';

export const commonSvgxTemplate: SvgxTemplate = ({
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

export const reactNativeSvgxTemplate: SvgxTemplate = ({
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

export function defaultTemplate(target: `${Target}` = 'react-dom'): SvgxTemplate {
  if (target === Target.ReactNative) {
    return reactNativeSvgxTemplate;
  } else {
    return commonSvgxTemplate;
  }
}
