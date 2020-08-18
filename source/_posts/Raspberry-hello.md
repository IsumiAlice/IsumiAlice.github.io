---
title: Raspberry 基礎配置
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
date: 2020-02-29 22:26:47
comments: true
tags: 
 - 樹莓派
 - 計算機
keywords: Raspberry
description: Raspberry 基礎配置
cover:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---



# 寫入系統到存儲卡中

在通電前, 要先把系統搞定

官方下載站: http://www.raspberrypi.org/downloads

格式化工具: SDFormatter

寫入工具: Win32DiskImager

注意寫入過程中不要點格式化

默認登入名為 pi, pw: raspberry

root pw: raspberry

# 硬體裝配

把主板從盒子取出來

插入裝有系統的存儲卡

連接電源, HDMI, 網綫, 鍵鼠

插入電源後即直接進入系統

# 系統配備

以下配備均是在官方系統下操作的
## root

由pi用戶登録後

```
sudo passwd root

sudo passwd --unlock root
```

## 更換為國內 source
```
sudo nano /etc/apt/sources.list 
添加
deb http://mirrors.aliyun.com/raspbian/raspbian/ buster main contrib non-free rpi
deb-src http://mirrors.aliyun.com/raspbian/raspbian/ buster main contrib non-free rpi
更新
sudo apt-get update
```
## 配置中文

安裝中文字庫

```
sudo apt-get install ttf-wqy-zenhei
```

輸入法
```
sudo apt-get install fcitx fcitx-googlepinyin fcitx-module-cloudpinyin fcitx-sunpinyin
```

配置中文

``sudo raspi-config`` - ``4 Localisation`` - ``I1 Change Locale``

選擇 zh_CN GB2312, zh_CN.GB18030 GB18030, zh_CN.GBK GBK, zh_CN.UTF-8  UTF-8, zh_CN.UTF-8

``Enter`` - ``sudo reboot``

重啓後打開設置, Localisation - SetLocal - CharacterSet - GB18030 - OK

之後會提示重啓 - Yes

配置中文輸入法

Fcitx配置 - 左下角加好 - 選擇需要的

## 固定 IP
```
sudo nano /etc/dhcpcd.conf
```
然後自己看着辦
## 開啓 SSH

``sudo raspi-config`` - ``Interfacing Options`` - ``SSH``

## 系統備份, 還原

在 Windows 下可以創建一個空的``.img``資料, 然後插入存儲卡, 使用 ``Win32 Disk Imager`` 的 ``Read`` 功能. 會將整張卡進行備份.

## 配置代理服務

### 安裝 SS

```
sudo apt-get install shadowsocks
or
sudo pip install shadowsocks
```

配置 SS 參數

```
sudo vi /etc/shadowsocks/config.json
{
    "server": ,
    "server_port": ,
    "local_address": "127.0.0.1",
    "local_port": "1080",
    "password": ,
    "timeout": 300,
    "method": "aes-256-cfb",
    "fast_open": false,
    "workers": 1
}
```

啓動

```
apt-get
sudo /usr/bin/sslocal -c /etc/shadowsocks/config.json -d start

pip
sudo /usr/local/bin/sslocal -c /etc/shadowsocks/config.json -d start
```

開機啓動

```
su
vim /etc/rc.local
最後的 exit 0 的上一行添加
sudo /usr/bin/sslocal -c /etc/shadowsocks/config.json -d start
```

不同方式安裝的 sslocal 位置可能不同, ``which sslocal``

### 配置瀏覽器代理

下載 SwitchyOmega https://github.com/FelisCatus/SwitchyOmega/releases 

打開瀏覽器拓展頁面 chrome://extensions 并拖入

若出現錯誤, 打開瀏覽器頁面右上角開發者模式, 然後解壓縮 release 的包, 瀏覽器中選擇加載已解壓的拓展

**配置 SwitchyOmega 的方法**

左側 proxy, 修改為 SOCKS5, 127.0.0.1, 1080

auto switch, 添加規則  https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt 

![](http://www.phpvar.com/phpvar.com/wp-content/uploads/auto-switch-768x387.png)

### 配置終端代理

使用 proxychains 執行相應命令

```
sudo apt install proxychains4
sudo vi /etc/proxychains.conf
最後一行添加
socks5 127.0.0.1 1080
并刪除多餘內容
proxychains curl www.google.com
```



# 一些基本操作

##  Neofetch 顯示系統信息

```
sudo apt-get install neofetch
neofetch
```

可以修改  `~/.config/neofetch/config.conf` 自定義輸出信息

## 獲取溫度

```
cd /sys/class/thermal/thermal_zone0
cat temp
```
返回值除以 1000 即為當前 CPU 溫度

## 設置時區

``date`` 查詢系統時間

```
sudo dpkg-reconfigure tzdata

Asia
```

樹莓派由於沒有電池, 斷電後無法保存時間, 默認通過 NTP 服務獲取時間, 如果時間不準確, 可以 ``sudo ntpd -s –d`` 來校準

也可以 ``sudo date  --s="2018-10-19 14:54:00"`` 來設置時間