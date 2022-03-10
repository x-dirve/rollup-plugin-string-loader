# Rollup 文本文件加载插件

有时需要将 html 或其他文本文件加载到 js 中处理（如做为模板），可以通过配置指定处理类型，并可支持简单的压缩及内容替换

## 使用
```ts
import { stringLoader } from "@x-drive/rollup-plugin-string-loader";

export default {
    // ...其他配置
    "plugins": [
        stringLoader({
			// 模块配置
		})
    ]
}

```

## 参数
- `include` 包含的文件类型，默认为所有 .html 文件
- `exclude` 要排除的文件类型，默认不排除
- `minify` 是否压缩，默认不压缩
- `replacements` 内容替换设置
    - `reg` 内容替换正则
    - `val` 要替换的内容，默认为空字符串