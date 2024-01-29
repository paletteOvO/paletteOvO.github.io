---
title: "WebM的超高CPU佔用問題 (Firefox/Chrome/WallpaperEngine)"
pub_date: 2021-11-05
tags: []
categories: Programming
---

## TL;DR

如果你只是來找解決方案的話：

1. 請確定你更新到了最新的 Windows Update
2. 請確定你的顯卡驅動已經是最新的了
3. 請確定你的顯卡支持 WebM(VP9) 硬解
4. 根據此教程安裝 LAV (右上角可選擇語言) [Using LAV and DirectShow | Wallpaper Engine - Troubleshooting & FAQ](https://help.wallpaperengine.io/en/videos/lav.html#_1-install-lav)
5. 安裝微軟的 VP9 解碼擴展 [Get VP9 Video Extensions - Microsoft Store](https://www.microsoft.com/en-us/p/vp9-video-extensions/9n4d0msmp0pt?activetab=pivot:overviewtab)
6. 摸摸你家可愛的小貓
7. 現在你應該可以看到你的 GPU 終於不是 0% 佔用了
   ![Before](webm-hardware-acceleration/Snipaste_2021-11-04_03-24-01.png)
   ![After](webm-hardware-acceleration/Snipaste_2021-11-04-03-25-42.png)
   如果你不成功，可以留言和我說說，我可能也可能不會看。

## 0x0 前言

整件事基本上是從 Wallpaper Engine 引起的，前兩天試圖補了幀然後給桌面換一個高幀的視頻桌布，而且還想加特效，於是就選了一個好看的改了起來。

## 0x1 Wallpaper Engine 的 Web 不支持 MP4

不過這也不是甚麼大問題，換個格式就好了~，雖然折騰 ffmpeg 的無損轉換也花了好久~。 

```
ffmpeg -i input.mp4 -c:v libvpx-vp9 -threads 8 -lossless 1 -filter:v fps=60 output.webm
```

## 0x2 超高的 CPU 佔用

非常高，基本上把 CPU 給佔滿了，這種情況顯然是不可能正常用電腦的，但視頻一般都是 GPU 解碼，不應該是 CPU，所以很明顯視頻硬件加速出了問題。但是 VLC 是可以正常播放的。

但是，我翻遍了谷歌，翻遍了 steam 論壇，都沒找到任何線索，不得不說這是有點離譜的，我估計是因為根本沒人用 webm，大多數純視頻壁紙都是 mp4。而且 Wallpaper Engine 並不直接支持 WebM 的視頻壁紙，所以只有少數支持了自定義視頻的網頁背景會遇到這個問題。

於是，我去翻了翻 Wallpaper Engine 的 F&Q，找到了(Using LAV and DirectShow | Wallpaper Engine - Troubleshooting & FAQ)[https://help.wallpaperengine.io/en/videos/lav.html#_1-install-lav]，成功解決了直接播放 WebM 的加速問題。

雖然但是，為了加上 kirakira 的特效，我要在 Web 裡播放，但在Ｗ eb 裡播放時的佔用還是很高啊。於是考慮到他是 Web 播放，我先後用 Firefox 和 Edge 試着播放，發現他們的佔用也很高，所以基本上可以確定是瀏覽器和硬解的問題。

然而在 edge://gpu 裡可以明顯看到， vp9 硬件加速是打開了的，所以是甚麼原因呢？

於是在一輪輪的搜索下(花了好幾個小時查資料試錯，這裡就不累贅了，雖然一堆人吐槽 WebM 慢，但沒人給出解決方法)，我從一個 reddit 的評論裡找到了這個[Get VP9 Video Extensions - Microsoft Store](https://www.microsoft.com/en-us/p/vp9-video-extensions/9n4d0msmp0pt) (抱歉我已經找不回那個帖子了，畢竟我是過了好一會才想起來寫一篇文章說說這個)

裝上後可以很明顯看到 GPU 的佔用終於上升了，但我認為可能並不是真的解決了，按照 VP9 Video Extensions 的描述是給沒有硬體加速的人用的，所以看似解決了，但其實並不是直接交給 GPU 解碼 VP9，不過至少他終於不把 CPU 給佔滿了。

## 0x3 後記

待我有空的時候可能會再研究研究為甚麼不能加速，3060 總不至於連 VP9 編碼都不支持吧，話說我也沒找到支持列表，這裡還是建議 NVIDIA 爬一爬，我甚至覺得可能是 Win11 的問題，但我暫時也沒時間去重裝甚至降級，所以就只能先放着了。
