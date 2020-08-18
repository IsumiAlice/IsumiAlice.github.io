---
title: Raspberry 配置 ASF
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
date: 2020-03-04 20:10:48
comments: true
tags: 
 - 樹莓派
keywords: Raspberry
description: Raspberry 配置 ASF
photos:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
首先在國內網路下要保證配置好了代理服務 (參見之前的 Raspberry Hello)

ASF Git 頁面: https://github.com/JustArchiNET/ArchiSteamFarm

Setting up 頁面: https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Setting-up-zh-CN

在 release 頁面下載相應壓縮檔, 一般來說選 linux-arm

# 安裝相關依賴

套件名稱取決於您正在使用的 Linux 發行版，我們已經列出了最常見的套件。 您可以使用本地套件管理系統，為您的作業系統取得全部套件（例如 Debian 的 `apt` 或 CentOS 的 `yum`）。

- `libcurl`（`libcurl4`、`libcurl3`）
- `libicu`（您的 Linux 發行版的最新版本，例如 `libicu60`）
- `libkrb5-3`（`krb5-libs`）
- `liblttng-ust0`（`lttng-ust`）
- `libssl`（`libssl1.1`、`openssl-libs`、您的 Linux 發行版最新的 1.1.X 版本）
- `zlib1g`（`zlib`）

其中至少應該有幾個套件已經可用於您的系統本地了（例如現今幾乎每一個 Linux 發行版都需要 `zlib1g`）。

# 配置

在 **[網頁設定檔產生器](https://justarchinet.github.io/ASF-WebConfigGenerator)** 頁面配置一個 ASF 和一個 Bot

然後放入 config 資料夾中

修改權限 `` chmod +x ArchiSteamFarm ``

然後 ``./ArchiSteamFarm `` 執行

若需要代理則在前面添加 ``proxychains``

