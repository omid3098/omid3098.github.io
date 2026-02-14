---
title: Playing Steam Windows games on MacBook M2
date: 2023-12-11
tags: [guide, macbook, m2, gaming, steam, windows]
description: "How I got a Windows Steam game running on MacBook M2 — Parallels vs CrossOver."
image: "/assets/img/blog/steam-game-mac/Steam-windows-mac-min.png"
---
## We Just Bought a Game

My wife and I have purchased the game [My Time at Sandrock](https://store.steampowered.com/app/1084600/My_Time_at_Sandrock/) from Steam because it looks like a cool co-op game. 
She could easily play it on her Windows laptop, but I have a MacBook M2. So, I had to find a way to play it on my MacBook.

## Parallels Desktop
Using Parallels Desktop was my first option. The game ran pretty well, but there was no terrain! 

![No terrain](/assets/img/blog/steam-game-mac/my-time-at-sandrock-parallels.png)

Other people had the same issue with [other games using Parallels](https://forum.parallels.com/threads/applications-games-not-working-in-windows-on-arm.356614/). So, I had to find another way.

## VirtualBox
I found out that VirtualBox has experimental support for Silicon Macs.
There is a Developer preview for macOS M1/M2 [here](https://www.virtualbox.org/wiki/Download_Old_Builds_7_0). And I even couldn't install Windows 11 on it.

## UTM
UTM is a virtual machine for macOS, powered by QEMU, and I LOVE QEMU! It was the fastest way to run Linux on my old Windows laptop. So, I had to try it on my MacBook M2.
I could easily install Windows 11 on UTM, installed Steam, and the game. There was no terrain issue, but the game was running at 5-10 FPS! I tried many different settings to use more CPU/GPU power but couldn't get more than that.
UTM looks pretty stable, but it's not ready for gaming yet.

![UTM-Windows-11](/assets/img/blog/steam-game-mac/utm-windows-11.png)

## Wine
My old friend [Wine](https://www.winehq.org)! I have used Wine to play Heroes of the Storm on my old Linux laptop for many years. Using Lutris, PlayOnLinux, and even manually with raw WineHQ. Finding out that there is a Wine version for M1/M2 brought tears of joy to my eyes.
I used [WineskinServer](https://github.com/Gcenx/WineskinServer) and, using an [8-minute YouTube video](https://www.youtube.com/watch?v=nqoOxG3ZQEM) by [MitchIsTheKing](https://www.youtube.com/@mitchistheking08), I could install Steam and the game on my MacBook M2.
The game runs pretty well with extremely high graphics settings!

It is important to note that Wine is not an emulator; it's a compatibility layer. So, it's not using any CPU/GPU power to emulate Windows. It's just translating the Windows API calls to POSIX calls. So, it's the fastest way to run Windows applications or games on other platforms.

Here you can see the native steam client running on my MacBook and the Windows steam client running on Wine side by side.

![Steam-Wine](/assets/img/blog/steam-game-mac/Steam-windows-mac-min.png)