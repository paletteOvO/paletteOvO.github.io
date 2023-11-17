---
title: "WSL2/Hyper-V 端口佔用的 Workaround"
pub_date: 2021-10-16
tags: [WSL, WSL2]
categories: Programming
---
由於WSL2啟動後會佔用一大片 port 導致雖然完全沒有在用但就是 bind 不了，而且每次重開機都不一樣, 這裡記錄一個 workaround。

```powershell
# 以管理員模式運行

# 53682 是需要開放的 port
net stop winnat
netsh int ipv4 add excludedportrange protocol=tcp startport=53682 numberofports=1
net start winnat
```
