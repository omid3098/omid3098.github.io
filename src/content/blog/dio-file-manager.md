---
title: Dio File Manager
date: 2026-11-16
tags: [tool, project, windows, c, github, file manager, gnome, cui]
description: "GNOME Files, the Linux file manager, made again for Windows in C. One file of under 800 KB."
meta: "Open source · 2026"
image: "/assets/img/blog/dio-file-manager/grid-dark.png"
---

## Idea:

![The file manager in the dark theme, in grid view](/assets/img/blog/dio-file-manager/grid-dark.png)

GNOME Files (or Nautilus) is the file manager of the GNOME desktop on Linux.
I asked my coding agents to build an exact copy of it for Windows, with [CUI](https://github.com/yappologistic/CUI), a C library for native app windows.

The result is one `.exe` of under 800 KB.

## Zoom:

![Dragging the zoom slider from large icons to the list and back](/assets/img/blog/dio-file-manager/zoom.webp)

One slider goes from large icons to the list view and back, in one drag.

## Resize:

![Making the window narrower: the grid reflows and the sidebar slides away](/assets/img/blog/dio-file-manager/resize.webp)

The grid reflows while you drag the window. When there is no room, the sidebar slides away.

## Everyday work:

![Box select, cut, paste into a folder, go back](/assets/img/blog/dio-file-manager/everyday.webp)

Select with a box, cut, paste into another folder, go back.

## Search:

![Searching for "report" and opening a shortcut's file location](/assets/img/blog/dio-file-manager/search.webp)

Search looks in the folder and everything below it.

## Folder sizes:

![The list view with the size of every folder](/assets/img/blog/dio-file-manager/list-sizes-dark.png)

The list view shows the real size of every folder. It measures them in the background, so the window does not wait.

## Light or dark:

![The same window in the light theme](/assets/img/blog/dio-file-manager/grid-light.png)

It follows the Windows setting.

## Instead of Explorer:

There is a switch to make it the program Windows opens folders with, Win+E too. Turning it off gives everything back to Explorer.

## Try it:

There is no download yet; you build it from source. The code is on GitHub under the MIT licence: [omid3098/dio-file-manager](https://github.com/omid3098/dio-file-manager)
