---
title: Open Flowmap
date: 2023-09-01
tags:
  [
    tool,
    unity3d,
    project,
    programming,
    technical-artist,
    github,
    shader,
    procedural,
    texture,
    bake,
    baking,
    openflowmap,
  ]
description: "Saw a beautiful water shader on Twitter. Wanted to reverse-engineer the feeling, not just the technique."
order: 7
meta: "118 ★ · 2023"
image: "/assets/img/blog/open-flowmap/open-flowmap.gif"
---

## Idea:

![Open Flowmap](/assets/img/blog/open-flowmap/open-flowmap.gif)

I was hanging around in Twitter (X) that I saw [this beautiful water](https://twitter.com/nodesandnoodles/status/1686484366103343104) shader in Blender by [@OfNodesAndNoodles](https://twitter.com/nodesandnoodles)
I instantly wanted to make it in Unity.

## Challenge 1:

I've tried many different approaches to make the shader, watched many different tutorials and read many different articles. But they were simply good waters but not the one I wanted.

## Breaking down the problem:

So I've tried to watch more water refences to map the visuals with the shader knowledge I already had, and noticed I need to use a flowmap to direct the flow of the water then add the current water effect I have and move it along the flowmap direction.

## What is a flowmap?

<img src="/assets/img/blog/open-flowmap/uv-directions.png" alt="uv-direction" width="200"/>

A flowmap is a texture that stores direction only in 2 channels, red and green. almost like the way normal map stores the normal direction of the surface.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*qI7LNChbwG3X7ftosidvPA.png)
_Image source on [Medium](https://louisgamedev.medium.com/shader-tutorial-flow-map-4410af832a8d)_

<!-- lets add image creadits from https://louisgamedev.medium.com/shader-tutorial-flow-map-4410af832a8d -->

Exactely like UV coordinate colors, each color represents a direction.

You can learn more about the flowmap from these sources: [source 1](https://louisgamedev.medium.com/shader-tutorial-flow-map-4410af832a8d), [source 2](https://blender.stackexchange.com/questions/273421/how-to-use-flowmap-texture-for-rotation-instances), [source 3](https://vfxdoc.readthedocs.io/en/latest/articles/flowmaps)

## I need a flowmap:

Now how can I create a flowmap in Unity from my current scene? There are some good assets in Asset store like [FluXY](https://assetstore.unity.com/packages/tools/physics/fluxy-2-5d-fluid-simulator-203795) by [Virtual Method](https://twitter.com/virtual_method) which provides a really good flow simulation or [FlowmapGenerator](https://assetstore.unity.com/packages/tools/flowmap-generator-10509) by [Simon Barsky](http://www.superpositiongames.com/). but I wanted to know the logic behind it. So I've tried to make my own flowmap generator.

## Open Flowmap

![Open Flowmap](/assets/img/blog/open-flowmap/open-flowmap2.gif)

After reading many article about the topic, and checking many source codes I have implemented a CPU version of the Navier-Stokes equation in Unity. It will create a 2d simulation of the fluid and will generate a flowmap texture for you.
You can define the size of the simulation, the number of iterations and the speed of the simulation.

## How to use it?

Check the repository for more information:
[Open Flowmap](https://github.com/omid3098/OpenFlowMap)
