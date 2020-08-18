---
title: 使用 youtube-dl 下載影片
date: 2018-02-17 09:34:04
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
comments: true
tags: 
 - 計算機
keywords: youtube
description:
cover:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
## youtube-dl常用命令
得到視頻可下載格式列表：

```
youtube-dl -F [url]
```

下載相應的視頻、音頻並合併：

```
youtube-dl -f 299+140 xxxxxx
```

自動選擇碼率最高的視頻下載：

```
youtube-dl -f xxxxxx
```

下載播放隊列：
```
youtube-dl -f 299+140 -o "%(playlist_index)s-%(title)s.%(ext)s" --playlist-start 18 --playlist-end 27 PLVTne6k3-60uJC9V8o3CmGjBj8XreCcqR
```

## 安裝

```
pip install --upgrade youtube-dl
```

在[官方網站](https://link.jianshu.com/?t=https%3A%2F%2Fffmpeg.org%2Fdownload.html)下載 ffmpeg，解壓縮

環境變數`Path`中添加`ffmpeg\bin`

```
ffmpeg -version
```

---

## VPS端(Linux)配置

### 安裝 youtube-dl
```bash
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl
```
### 安裝 ffmpeg(稍稍稍稍複雜)
- 安裝 [yasm](http://yasm.tortall.net/Download.html)
```bash
$ tar -xvzf yasm-1.3.0.tar.gz
$ cd yasm-1.3.0/
$ ./configure
$ make
$ make install
```
- 下載[ffmpeg](http://ffmpeg.org/)源碼，並傳入VPS
```bash
$ tar -xjvf ffmpeg-3.3.1.tar.bz2
$ cd ffmpeg-3.3.1/
$ ./configure --enable-shared --prefix=/monchickey/ffmpeg
$ make
$ make install
```
- 配置一下
```bash
$ vi /etc/ld.so.conf.d/ffmpeg.conf
添加 /monchickey/ffmpeg/lib 保存退出
$ ldconfig
$ cd /monchickey/ffmpeg/bin
$ ./ffmpeg -version 可查看版本號
$ vi /etc/profile
末尾添加 export PATH="/monchickey/ffmpeg/bin:$PATH" 保存退出
$ source /etc/profile
```

## 本地下載VPS上的文件
- 在VPS上開啟臨時HTTP服務器
```bash
$ python -m SimpleHTTPServer
```
- 本地瀏覽器打開 ``IP:8000``
- OK了，用瀏覽器愉快的下載相應文件吧
- CTRL+C可關閉服務器
- 也可以``netstat -anp | grep 8000``查找相應進程如``3333/python``,然後通過``kill -9 3333``關閉進程
