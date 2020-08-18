---
title: 使用 Windows 時經常遇到的問題
date: 2020-03-10 22:50:37
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
comments: true
tags: 
 - 計算機
keywords: Windows
description: 使用 Windows 時經常遇到的問題
photos:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
## 更換主機板

如果拆不下散熱器和主機板的螺絲，就用力一點！！！  
主機板的電源綫要插牢固

## OneDrive 右鍵釋放空間

簡單的方法可以把使用者賬戶控制設為預設值
![](https://raw.githubusercontent.com/IsumiAlice/IsumiPic/master/20200422002908.jpg)

如果上面的方法失敗：
1. win+r -> gpedit.msc 打開本機群組原則編輯器
2. ![](https://raw.githubusercontent.com/IsumiAlice/IsumiPic/master/20200422002548.jpg)
3. 重啓

## 更換主硬盤遷移系統

PartAssist.exe，很好用

## 睡眠問題

睡眠後螢幕關閉，但滑鼠亮著，機箱風扇也在工作

解決方法：把登録編輯程式的 AwayModeEnable 設定為 0

位置在：電腦\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Power

## 如果Windows無法安裝到指定磁盤

1. shift+F10
2. diskpart
3. list disk
4. select disk 
5. Clean
6. 若需要 convert mbr

## 卓越性能模式
管理員運行 Windows Powershell  
```bash
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```

## 應用程式自啓動

 windows - 執行(run) - shell:startup - 確定 - 將要開機啓動的程式捷徑放入即可 

## 禁用筆電自帶的鍵盤

1. 設備管理器
2. 鍵盤-PS/2
3. 右鍵-更新驅動
4. 瀏覽計算機查找驅動
5. 從計算機的驅動列表選擇
6. 取消選擇-顯示兼容硬體
7. 隨便選一個其他品牌驅動
8. 是-重啓