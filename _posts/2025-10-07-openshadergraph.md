---
layout: post
title: OpenShaderGraph
date: 2025-10-07 11:46 +0300
categories: [blog]
tags:
  [
    OpenShaderGraph,
    Shaders,
    technical-artist,
    github,
    node-based,
    shader,
    shadergraph,
  ]
mermaid: true
---

# The Problem

Some artists or tech artists prefer to use node-based solutions to create shaders. Each engine or software provides their own editors to create shaders only for their own use cases. As a result:

- The same problem has been solved repeatedly in different companies or teams individually.
- Users need to learn how to use each editor separately.
- Users cannot share their shaders with other users without converting them to the target engine's format.
- Educational resources and community examples are fragmented by engine.
- Some engines are not even supported by any node-based editor.

# The Solution

Lets see what we have in current node-based editors:

- Usual math formulas like dot, add, lerp, step, etc.
- Primitive data types like float, vectors(floatx), textures, etc.
- Built-in functions like time, camera position, screen position, etc.
- Some other reusable functions like noise, gradient, etc.

Basically all shaders in all engines share the same principles and data types with some differences in syntax or coordinate system.

So in theory, if we can create a middleware that can handle all these data types and functions, we can use it in any engine or software that supports shaders. (Almost the same thing is happening in programming languages like Python or C++ but that would be another project!)
If we can provide primitives and functions in a common format and use templates for each target engine, we can create a shader in one place and export it to any engine using ONE single source file and ONE single compiler.

This is the main idea of OpenShaderGraph.

_**I may be wrong and it may not solve all the problems, but it's a good start.**_

<div style="display: flex; justify-content: center;">
  <img src="https://raw.githubusercontent.com/omid3098/openshadergraph/refs/heads/dev/src/assets/icon.png" alt="Open Shader Graph Logo" style="max-height: 200px;"/>
</div>

## How does it solve each challenge in the main problem?

- If we can create a common format for the primitives and functions, game engines can use it to create shaders for their own use cases without reinventing the wheel.
- Users can learn once and use it in any engine. (potentially)
- Users can share their shaders with other users without converting them to the target engine's format.
- Educational resources and community examples are now in one place. (I have started to port [Ben Cloward's tutorials](https://youtube.com/playlist?list=PL78XDi0TS4lEBWa2Hpzg2SRC5njCcKydl&si=XMhNrD55fPKmBcGx) for Unreal and Unity to OpenShaderGraph)
- Engines with no node-based editor can use OpenShaderGraph to create shaders if there is a way to compile the shader to the target engine's format like GLSL, HLSL, etc.

# Getting Started

Navigate to [OpenShaderGraph](https://openshadergraph.com) website.
You will see a very basic shader graph.

<div style="display: flex; justify-content: center;">
  <img src="/assets/img/blog/openshadergraph/OSG_01.png" alt="Open Shader Graph Website" style="max-height: 600px;"/>
</div>

From top right corner, click on the documentation button and start learning and experimenting with the shader graph.

Don't forget to check example graphs from Examples menu!
