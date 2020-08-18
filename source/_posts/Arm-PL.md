---
title: Arm PL 環境配置
author: 死体菌
avatar: https://gitee.com/IsumiAlice/IsumiPic/raw/master/2005/20200616222058.jpg
categories: 技術
date: 2020-04-19 21:51:50
comments: true
tags: 
 - 數學
 - 高效能運算
keywords: Hexo
description: Arm Performance Libraries 環境配置
photos:  https://gitee.com/IsumiAlice/IsumiPic/raw/master///20200515204625.jpg
---
Arm Performance Libraries 作為 Linux 的 Arm Compiler 的一部分安裝，並且需要 Arm Allinea Studio 許可證

## License

Arm Allinea Studio 工具套件為在 Arm 硬體上開發 HPC 應用程式提供了完整的解決方案。 它包括： 
- Arm C/C ++/Fortran 編譯器 
- ArmPL 
- Arm Forge（Arm DDT，Arm MAP和Arm Performance Reports） 

需要許可證來使用這些工具。 有兩種許可證， Named User 和 Floating

在獲得許可證後，按照以下說明將其新增到系統中： 

### Add a named user license 

1. 在 `/opt/arm/` 目錄中建立一個名為 licenses 的目錄 
2. 將許可證檔案複製到 `/opt/arm/licenses` 目錄；如果選擇將許可證檔案放在其他位置，則必須將 `ARM_LICENSE_DIR` 環境變數設定為指向它 `export ARM_LICENSE_DIR=/opt/arm/licenses`
3. Arm Forge 和 Arm Performance Reports 在其特定的安裝目錄中搜索許可證。如果使用的是 Arm Allinea Studio 許可證，並且沒有為這些工具使用單獨的許可證，請設定 `ALLINEA_LICENSE_DIR` 環境變數以將這些工具指向您的 Arm Allinea Studio 許可證 `export ALLINEA_LICENSE_DIR=/opt/arm/licenses >`

named user license，無需安裝Arm License Server

### Setting up a floating license 

必須下載並安裝 [Arm License Server](https://developer.arm.com/tools-and-software/server-and-hpc/downloads/arm-licence-server) 

浮動許可證由伺服器許可證檔案和客戶端許可證檔案組成，在[這裡](https://www.arm.com/products/development-tools/server-and-hpc/allinea-studio/get-software?_ga=2.43607085.960219704.1587365001-756695113.1577670013)申請 

檢查客戶端許可證是否包含執行Arm License Server的計算機的主機名或IP地址 

1. 將客戶端許可證新增到安裝 Arm Allinea Studio 的計算機上。在 `/opt/arm` 目錄中建立一個名為 `licenses` 的目錄 
2. 同 named 
3. 同 named 
4. 將伺服器許可證檔案新增到安裝 Arm License Server 的計算機上。在 `/opt/arm/licenceserver` 目錄中建立一個名為 `licenses` 的目錄，並將您的許可證檔案複製到該目錄中 
5. 重新啟動 Arm License Server 

## 下載 

[Arm Allinea Studio downloads page](https://developer.arm.com/products/software-development-tools/hpc/arm-allinea-studio/download) 

## 安裝 

需要 python >= 2.7

需要 C Libraries：SUSE and RHEL: `glibc-devel` Ubuntu: `libc6-dev` 

1. 解壓縮 ``` tar -xvf .tar.gz ``` 
2. ``` cd ``` 
3. 預設配置安裝 ``` sudo ./.sh ``` 
可以自定義 options
4. 安裝程式將顯示EULA並提示您同意條款 接下來主要介紹 ArmPL 的配置和使用 


## 配置 
1. 檢視可用的環境模組 ``` module avail ``` 可能需要配置MODULEPATH環境變數以包含安裝目錄 ``` export MODULEPATH=$MODULEPATH:/opt/arm/modulefiles/ ``` 
2. 為您使用的編譯器載入適當的模組，如果使用的是用於Linux的Arm Compiler，則建議僅載入編譯器模組，如果使用gcc，則必須載入所需的特定Arm Performance Libraries模組 
   ``` module load Generic-AArch64/RHEL/7/arm-linux-compiler/20.0 ``` 
   如果使用gcc編譯器，請確保載入正確的模組   
   ``` module load Generic-AArch64/RHEL/7/gcc-9.2.0/armpl/20.0.0 ```   
   Tips: 可以考慮將模組載入命令新增到您的.profile中，以在每次登入時自動執行它 
3. 根據使用的編譯器，使用以下命令檢查環境 
   | **Compiler** | **Command** |
   | ------------ | ---------------- |
   | armclang | `which armclang` |
   | gcc | `which gcc` |

## 舉個例子 

ArmPL 包含許多示例程式，如果是預設安裝的，位置在`/opt/arm//examples/` 

這裡以 `fftw_dft_r2c_1d_c_example.c` 為例，具體做什麼就不看了 

編譯和連結的選項： 
-armpl: 與arm編譯器進行編譯和連結時 
-mcpu = native: 允許編譯器從主機系統推斷要使用的庫 
-L\lib: 新增庫搜尋路徑 
-larmpl_lp64: 連結到Arm Performance Libraries 
-lgfortran: 連結到 gcc Fortran 執行庫 
-lm: 連結到標準數學庫 

1. 編譯原始碼，生成一個目標檔案 
   | **Compiler** | **Command** |
   | ------------ | ------------------------ |
   | armclang | `armclang -c -armpl -mcpu=native fftw_dft_r2c_1d_c_example.c -o fftw_dft_r2c_1d_c_example.o` |
   | gcc | `gcc -c -I/include fftw_dft_r2c_1d_c_example.c -o fftw_dft_r2c_1d_c_example.o` |
2. 將目的碼連結到可執行檔案中 
   | **Compiler** | **Command** |
   | ------------ | ------------------------- |
   | armclang | `armclang fftw_dft_r2c_1d_c_example.o -o fftw_dft_r2c_1d_c_example.exe -armpl -mcpu=native -lm` |
   | gcc | `gcc fftw_dft_r2c_1d_c_example.o -L/lib -o fftw_dft_r2c_1d_c_example.exe -larmpl_lp64 -lgfortran -lm` |
3. 在Arm系統上執行可執行檔案 ``` ./fftw_dft_r2c_1d_c_example.exe ``` 
   可以看到相應的輸出 

## Compile and test the examples examples 

目錄包含以下內容： 
- 一個GNUmakefile，用於生成和執行所有示例程式 
- C 原始碼 .c 
- Fortran原始碼 .f90 
- 每個示例的預期輸出 .expected 

Makefile編譯並執行每個示例，然後將生成的輸出與預期的輸出進行比較。任何差異都會標記為錯誤