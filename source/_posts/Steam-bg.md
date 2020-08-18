---
title: Steam 藝術作品展示欄設定
date: 2020-01-27 11:06:55
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
comments: true
tags: 
 - 遊戲
keywords: Steam
description: Steam 藝術作品展示欄設定
cover:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
## 分割個人資料背景

https://steam.design/

## 瀏覽器中上傳藝術作品

選擇圖片 - F12 - Console

```
var num= document.getElementsByName("image_width")[0].value;
document.getElementsByName("image_height")[0].value = num-(num-1);
document.getElementsByName("image_width")[0].value= num*100;
```

然後上傳圖片

## 上傳到熒幕截圖展櫃

```
document.getElementsByName("file_type")[0].value= 5;
var num= document.getElementsByName("image_width")[0].value;
document.getElementsByName("image_height")[0].value = num-(num-1);
document.getElementsByName("image_width")[0].value= num*100;
```