---
title: Dio File Manager
date: 2026-11-16
tags: [tool, project, windows, c, github, file manager, gnome, cui]
description: "GNOME Files, the Linux file manager, made again for Windows in C. One file of under 800 KB."
meta: "Open source · 2026"
image: "/assets/img/blog/dio-file-manager/grid-dark.png"
hero:
  tagline: "GNOME Files for Windows, <em>in one file under 800 KB</em>."
  icon: "/assets/img/blog/dio-file-manager/icon.svg"
  clip: "/assets/img/blog/dio-file-manager/zoom.webp"
  clipAlt: "Dragging the zoom slider from large icons to the list and back"
  command: "git clone https://github.com/omid3098/dio-file-manager"
  links:
    - label: "View on GitHub"
      href: "https://github.com/omid3098/dio-file-manager"
      primary: true
    - label: "Build it"
      href: "https://github.com/omid3098/dio-file-manager#install-and-start"
---

## Idea:

GNOME Files (or Nautilus) is the file manager of the GNOME desktop on Linux.
I asked my coding agents to build an exact copy of it for Windows, with [CUI](https://github.com/yappologistic/CUI), a C library for native app windows.
It is written in C, open source under the MIT licence.

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

<div class="gallery">
  <img src="/assets/img/blog/dio-file-manager/grid-light.png" alt="Grid view in the light theme" />
  <img src="/assets/img/blog/dio-file-manager/list-sizes-light.png" alt="List view with folder sizes in the light theme" />
  <img src="/assets/img/blog/dio-file-manager/photos-light.png" alt="Picture thumbnails in the light theme" />
</div>

It follows the Windows setting.

## Instead of Explorer:

There is a switch to make it the program Windows opens folders with, Win+E too. Turning it off gives everything back to Explorer.

## Try it:

There is no download yet; you build it from source. The steps are in the [README](https://github.com/omid3098/dio-file-manager#install-and-start).
