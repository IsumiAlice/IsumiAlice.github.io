---
title: 一道情人節的密碼題
date: 2018-08-17 19:18:12
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
comments: true
tags: 
keywords: 密碼
description: 今天是七夕呢，寫這個的起因是一個同學的女朋友發了個密碼解密給他。
photos:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
## 七夕快樂哦
今天是七夕呢，寫這個的起因是一個同學的女朋友發了個密碼解密給他。
![](https://raw.githubusercontent.com/IsumiAlice/IsumiPic/master/20200410231059.jpg)
這就是今天要解決的問題嘍，當然，先把兩種密碼的相關知識貼上。


## 凱撒密碼
在[密碼學](https://zh.wikipedia.org/wiki/%E5%AF%86%E7%A0%81%E5%AD%A6 "密碼學")中，**愷撒密碼**（英語：Caesar cipher），或稱**愷撒加密**、**愷撒變換**、**變換加密**，是一種最簡單且最廣為人知的加密技術。它是一種[替換加密](https://zh.wikipedia.org/wiki/%E6%9B%BF%E6%8D%A2%E5%BC%8F%E5%AF%86%E7%A0%81 "替換式密碼")的技術，[明文](https://zh.wikipedia.org/wiki/%E6%98%8E%E6%96%87 "明文")中的所有字母都在[字母表](https://zh.wikipedia.org/wiki/%E5%AD%97%E6%AF%8D%E8%A1%A8 "字母表")上向後（或向前）按照一個固定數目進行偏移後被替換成[密文](https://zh.wikipedia.org/wiki/%E5%AF%86%E6%96%87 "密文")。例如，當偏移量是3的時候，所有的字母A將被替換成D，B變成E，以此類推。這個加密方法是以[羅馬共和](https://zh.wikipedia.org/wiki/%E7%BE%85%E9%A6%AC%E5%85%B1%E5%92%8C "羅馬共和")時期[愷撒](https://zh.wikipedia.org/wiki/%E6%81%BA%E6%92%92 "愷撒")的名字命名的，當年愷撒曾用此方法與其將軍們進行聯繫。

愷撒密碼通常被作為其他更複雜的加密方法中的一個步驟，例如[維吉尼亞密碼](https://zh.wikipedia.org/wiki/%E7%BB%B4%E5%90%89%E5%B0%BC%E4%BA%9A%E5%AF%86%E7%A0%81 "維吉尼亞密碼")。愷撒密碼還在現代的[ROT13](https://zh.wikipedia.org/wiki/ROT13 "ROT13")系統中被應用。但是和所有的利用字母表進行替換的加密技術一樣，愷撒密碼非常容易被破解，而且在實際應用中也無法保證通信安全。

## 柵欄密碼
所謂柵欄[密碼](https://www.itsfun.com.tw/%E5%AF%86%E7%A2%BC/wiki-8783265-8437835)，就是把要加密的明文分成N個一組，然後把每組的第i個字連起來，形成一段無規律的話。

一般比較常見的是2欄的棚欄密碼。
比如明文：THERE IS A CIPHER
去掉空格後變為：THEREISACIPHER
兩個一組，得到：TH ER EI SA CI PH ER
先取出第一個字母：TEESCPE
再取出第二個字母：HRIAIHR
連在一起就是：TEESCPEHRIAIHR
這樣就得到我們需要的密碼了！

而解密的時候，我們先吧[密文](https://www.itsfun.com.tw/%E5%AF%86%E6%96%87/wiki-4343875-4728655)從中間分開，變為兩行：
T E E S C P E
H R I A I H R
再按上下上下的順序組合起來：
THEREISACIPHER
分出[空格](https://www.itsfun.com.tw/%E7%A9%BA%E6%A0%BC/wiki-1130465-5262045)，就可以得到原文了：
THERE IS A CIPHER

## Python 簡單實現
十幾行代碼，非常簡單。
後面的 for 循環部分應該還能再簡化一點。
```python
import math
inp = 'cvpgygppjvtgpgfgjgtq'
num = -2
step1 = [chr(97 + (ord(x)-97+num)%26) for x in inp]
print (step1)

num2 = 3
num3 = math.ceil(len(step1)/num2)
s2 = [step1[i*num3: (num3*(i+1)) if (num3*(i+1))<len(step1) else len(step1)] for i in range(num2)]
print(s2)
s3 = []
for j in range(num3):
    for i in range(num2):
        try:
            s3.append(s2[i][j])
        except:
            pass
print (s3)
'''
and then there were none
'''
```