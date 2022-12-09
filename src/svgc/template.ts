/**
 * @module template
 */

import { Target } from './plugins/target';
import { SvgcTemplate } from './interface';

/**
 * @function preactTemplate
 * @description 公用模板
 * @param options 模板参数
 */
export const preactTemplate: SvgcTemplate = ({
  jsx,
  path,
  propsName,
  componentName
}) => `// Generated from ${path}

import { memo } from 'preact/compat';

const ${componentName} = memo(${propsName} => {
  return (
    ${jsx}
  );
});

export default ${componentName};
`;

/**
 * @function reactDOMTemplate
 * @description 公用模板
 * @param options 模板参数
 */
export const reactDOMTemplate: SvgcTemplate = ({
  jsx,
  path,
  propsName,
  componentName
}) => `// Generated from ${path}

import { memo } from 'react';

const ${componentName} = memo(${propsName} => (
  ${jsx}
));

export default ${componentName};
`;

/**
 * @function reactNativeTemplate
 * @description React-Native 模板
 * @param options 模板参数
 */
export const reactNativeTemplate: SvgcTemplate = ({
  jsx,
  path,
  propsName,
  components,
  componentName
}) => `// Generated from ${path}

import { memo } from 'react';
import { ${components.join(', ')} } from 'react-native-svg';

const ${componentName} = memo(${propsName} => (
  ${jsx}
));

export default ${componentName};
`;

/**
 * @function getTemplate
 * @description 根据编译目标获取对应模板
 * @param target 编译目标
 */
export function getTemplate(target: `${Target}`): SvgcTemplate | never {
  switch (target) {
    case Target.PReact:
      return preactTemplate;
    case Target.ReactDOM:
      return reactDOMTemplate;
    case Target.ReactNative:
      return reactNativeTemplate;
    default:
      throw new Error(`Unexpected target: ${target}`);
  }
}
