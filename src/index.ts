import { isObject, isRegexp, isUndefined } from "@x-drive/utils";
import { createFilter } from "rollup-pluginutils";
import type { Plugin } from "rollup";

type Filter = Array<string | RegExp> | string | RegExp | null;

/**模块参数 */
interface StringLoaderOptions {
    /**包含的文件类型，默认为所有 .html 文件 */
    include?: Filter;

    /**要排除的文件类 */
    exclude?: Filter;

    /**是否压缩 */
    minify?: boolean;

    /**内容替换设置*/
    replacements?: {
        /**内容替换正则 */
        reg: RegExp;

        /**要替换的内容，默认为空字符串 */
        val?: string;
    };
}

/**Rollup 文本文件加载插件 */
function stringLoader(opts: StringLoaderOptions): Plugin {
    if (isUndefined(opts.include)) {
        opts.include = "**/*.html";
    }
    const filter = createFilter(opts.include, opts.exclude);

    return {
        "name": "string"
        , transform(sources, id) {
            if (filter(id)) {
                var code = sources;
                if (isObject(opts.replacements) && isRegexp(opts.replacements.reg)) {
                    if (isUndefined(opts.replacements.val)) {
                        opts.replacements.val = "";
                    }
                    code = code.replace(opts.replacements.reg, opts.replacements.val);
                }
                if (opts.minify) {
                    code = code.replace(/\n[\s]+/g, "");
                }
                return {
                    "code": `export default ${JSON.stringify(code)};`
                    , "map": {
                        "mappings": ""
                    }
                };
            }
        }
    };
}

export { stringLoader };
