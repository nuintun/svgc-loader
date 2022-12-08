/**
 * @package svgox-loader
 * @license MIT
 * @version 0.0.0
 * @author nuintun <nuintun@qq.com>
 * @description SVGO jsx loader.
 * @see https://github.com/nuintun/svgox-loader#readme
 */

'use strict';

/**
 * @module template
 */
const commonSvgxTemplate = ({ jsx, sourceFile, targetFile, componentName }) => `// Generated from ${sourceFile} to ${targetFile}

export const ${componentName} = props => {
  return (
    ${jsx}
  );
};
`;
const reactNativeSvgxTemplate = ({
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
function defaultTemplate(target = 'react-dom') {
  if (target === 'react-native' /* Target.ReactNative */) {
    return reactNativeSvgxTemplate;
  } else {
    return commonSvgxTemplate;
  }
}

exports.commonSvgxTemplate = commonSvgxTemplate;
exports.defaultTemplate = defaultTemplate;
exports.reactNativeSvgxTemplate = reactNativeSvgxTemplate;
