---
title: 基於 Hexo 搭建個人靜態部落格
author: 死体菌
categories: 
 - 技術
date: 2018-01-29 11:00:18
tags: 
 - web
cover: https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---



## 安裝
安裝[Node.js](https://nodejs.org/en/)  
更換爲國內源，安裝 cnpm

```
$ npm config set registry https://registry.npm.taobao.org
$ npm config get registry

$ npm install -g cnpm
$ cmpm install hexo 
```
安裝[Git](https://git-scm.com/downloads)  
安裝[Hexo](https://hexo.io/zh-tw/)  
``` bash
$ npm install -g hexo-cli
```
## 建立
一旦 Hexo 完成後，請執行下列指令，Hexo 會在指定資料夾中建立所有您需要的檔案。
``` bash
$ hexo init blog
$ cd blog
$ npm install
```
### 建立一篇新的文章
``` bash
$ hexo new [layout] <title>
```
| 佈局  | 路徑           |
| ----- | -------------- |
| post  | source/_posts  |
| page  | source         |
| draft | source/_drafts |
### 產生靜態檔案
``` bash
$ hexo generate
```
| 選項         | 描述               |
| ------------ | ------------------ |
| -d, --deploy | 產生完成即部署網站 |
| -w, --watch  | 監看檔案變更       |

### 啟動伺服器
預設為 http://localhost:4000/
``` bash
$ hexo server
```
### 部署網站到Git
可以直接使用git命令部署，將 ``public`` 資料夾裏的文件複製到git目錄下，之後使用 ``git commit``
``` bash
$ hexo generate

$ git add .
$ git commit -m "update"
$ git push origin master
```
### Clean
``` bash
$ hexo clean
```
### 列出網站資料
``` bash
$ hexo list <type>
```
### 顯示版本咨詢
``` bash
$ hexo version
```
## 更換主題
在 ``themes`` 資料夾內，新增一個資料夾，並修改 ``_config.yml`` 內的 ``theme`` 設定，即可切換主題

## 渲染公式

更換 markdown 渲染引擎

```
npm uninstall hexo-renderer-marked --save
npm install hexo-renderer-kramed --save
```

修改 node_modules/kramed/lib/rules/inline.js

注意註釋部分

```
var inline = {
  // escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
  escape: /^\\([`*\[\]()#$+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  html: /^<!--[\s\S]*?-->|^<(\w+(?!:\/|[^\w\s@]*@)\b)*?(?:"[^"]*"|'[^']*'|[^'">])*?>([\s\S]*?)?<\/\1>|^<(\w+(?!:\/|[^\w\s@]*@)\b)(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  reffn: /^!?\[\^(inside)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  // em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`$]| {2,}\n|$)/,
  math: /^\$\$\s*([\s\S]*?[^\$])\s*\$\$(?!\$)/,
};
```

在主題中開啓 mathjax

在 themes/xxx/_config.yml

一般

```
math:
  enable: true
  per_page: true
  engine: mathjax
```

在需要渲染公式的文章的 Fornt-matter 中打開 mathjax

```
---
mathjax: true
--
```