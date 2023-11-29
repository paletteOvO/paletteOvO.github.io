---
title: "Intel/NVIDIA 同時使用集顯+獨顯及超頻"
pub_date: 2022-03-19
tags: []
categories: Programming
---

## 0x0 前言

最近用上了 Manjaro Linux，在翻看顯卡驅動相關的時後發現可以優先集顯然後獨顯不輸出，就可以讓獨顯全力挖礦煉丹了。於是就動手弄了起來。個人使用的是閉源驅動，本文開源驅動相關的配置只是一個方向，我也不確定能不能用。

## 0x1 啟用集顯

在我電腦上如果插上了顯卡的話集顯是默認關閉的，需要在BIOS裡啟用然後指定是集顯輸出，當然線也要插到主板的插口上。這邊就自己找找吧，不附圖了，基本上是寫着IGFX，集成顯卡，之類的，一個個翻翻看。

## 0x2 安裝/啟用驅動

```bash
$ sudo pacman -S xf86-video-intel mesa nvidia # if proprietary driver
$ sudo pacman -S xf86-video-intel xf86-video-nouveau mesa nouveau # if open-source driver

$ sudo vim /etc/mkinitcpio.conf

# 修改MODULES這行加上這些module, 自行編譯內核用dkms的可以不加 nvidia*
MODULES=(i915 nvidia nvidia_modeset nvidia_uvm nvidia_drm)

:wq

$ sudo mkinitcpio -P
```

## 0x3 xorg設定集顯和獨顯

記下pci bus id

```bash
$ lspci
...
00:02.0 VGA compatible controller: Intel Corporation HD Graphics 630 (rev 04)
...
01:00.0 VGA compatible controller: NVIDIA Corporation GA106 [GeForce RTX 3060 Lite Hash Rate] (rev a1)
...
```

偽裝出一個顯示屏

```bash
$ pacman -S read-edid
$ sudo get-edid -m 0 > /usr/share/X11/xorg.conf.d/edid.bin
```

```bash
$ sudo vim /etc/X11/xorg.conf

# 加入
Section "ServerLayout"
    Identifier     "layout"
    Screen      0  "intel" 0 0
    Screen      1  "nvidia" 0 0
    InputDevice    "Keyboard0" "CoreKeyboard"
    InputDevice    "Mouse0" "CorePointer"
EndSection

Section "Device"
    Identifier     "intel"
    Driver         "intel"
    BusID          "PCI:0:2:0"
    Option         "AccelMethod" "SNA"
    Option         "TearFree" "on"
EndSection

Section "Device"
    Identifier     "nvidia"
    Driver          "nvidia"
    BusID          "PCI:1:0:0"
EndSection

Section "Screen"
    Identifier     "intel"
    Device         "intel"
    DefaultDepth    24
    SubSection     "Display"
        Depth       24
    EndSubSection
EndSection

Section "Screen"
    Identifier     "nvidia"
    Device         "nvidia"
    Option         "AllowEmptyInitialConfiguration" "on"
    Option         "UseDisplayDevice" "none"
    Option         "Coolbits" "28"
    Option         "ConnectedMonitor" "DFP-0"
    Option         "CustomEDID" "DFP-0:/usr/share/X11/xorg.conf.d/edid.bin"
EndSection
```


## 0x4 超頻
```bash
$ sudo pacman -S nvidia-utils
$ sudo nvidia-smi -i 0 -pl 120 # powerlimit, 限制功耗
$ sudo nvidia-smi -i 0 -lmc 8000 # lock memory clock 鎖定內存頻率
$ sudo nvidia-smi -i 0 -lgc 1500 # lock gpu clock 鎖定GPU頻率
```

## 0x5 用獨顯跑程序

```bash
$ sudo pacman -S nvidia-prime
$ prime-run glxinfo | grep "OpenGL renderer"
OpenGL renderer string: NVIDIA GeForce RTX 3060/PCIe/SSE2
```

## 參考資料

https://kodi.wiki/view/Archive:Creating_and_using_edid.bin_via_xorg.conf
https://wiki.archlinux.org/title/intel_graphics
https://wiki.archlinux.org/title/PRIME
