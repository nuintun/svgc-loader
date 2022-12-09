/**
 * @module template
 */

import { SvgcTemplate, Target } from './interface';

/**
 * @function commonTemplate
 * @description 公用模板
 * @param options 模板参数
 */
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

import { ${components.join(', ')} } from 'react-native-svg';

export const ${componentName} = ${propsName} => {
  return (
    ${jsx}
  );
};
`;

/**
 * @function getTemplate
 * @description 根据编译目标获取对应模板
 * @param target 编译目标
 */
export function getTemplate(target: `${Target}` = Target.ReactDOM): SvgcTemplate {
  if (target === Target.ReactNative) {
    return reactNativeTemplate;
  } else {
    return commonTemplate;
  }
}
