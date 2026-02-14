---
title: Glass Shaders - Simple and Complex
date: 2023-05-07
tags: [shader, unity3d, project, technical-artist, github, shadergraph, glass, glass-shader, glass-shaders]
description: "Unity's default glass materials looked terrible. I made two versions — a lightweight one for mobile and a complex one with refraction."
order: 6
meta: "270 ★ · 2022"
image: "/assets/img/blog/glass-shaders/glass-shaders-banner.png"
---

![Glass Shaders](/assets/img/blog/glass-shaders/glass-shaders-banner.png)

## Why?
Because Unity is not so good with default glass materials and shaders. I have made two glass-shaders. one is a simple glass shader without refraction, suitable for mobile games or simple games. The other one is a more complex shader with refraction, suitable for more complex scenarios.

## How?
Using ShaderGraph, I have created two shaders.

### Simple Glass Shader
![Simple glass shader2](https://user-images.githubusercontent.com/6388730/201767206-c4a494f6-bb73-4b17-a951-5f7e8b013a12.png)
<!-- Video -->
<video width="100%" height="100%" controls>
  <source src="https://user-images.githubusercontent.com/6388730/164812584-ad6ec20a-e746-4cfd-903b-482c7897dbc3.mp4" type="video/mp4">
</video>

#### Features:
- Distortion (tiled)
- Tint color
- Diffuse texture
- Metalic and smoothness
- Normal strength
- Reflection (baked cubemap)
- Distort strength


#### Download from GitHub:
[![Github](https://img.shields.io/badge/Github-Unity--URP--GlassShader-blue?logo=github&style=for-the-badge)](https://github.com/omid3098/Unity-URP-GlassShader)


### Complex Glass Shader
![Crystal](https://user-images.githubusercontent.com/6388730/236700236-714a0b3a-d7dc-4fa0-9370-7aa073edbd14.png)
<!-- video -->
<video width="100%" height="100%" controls>
  <source src="https://user-images.githubusercontent.com/6388730/172062749-937321dc-e1e0-414b-8aac-a71313aa0e0d.mp4" type="video/mp4">
</video>

#### Features:
- IOR
- Chromatic aberrated refraction
- Color tint
- Emission

#### Download from GitHub:
[![Github](https://img.shields.io/badge/Github-Unity--URP--ScreenSpaceRefraction-blue?logo=github&style=for-the-badge)](https://github.com/omid3098/Unity-URP-ScreenSpaceRefraction)
