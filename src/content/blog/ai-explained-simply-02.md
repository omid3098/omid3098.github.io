---
title: AI Explained Simply - 02
date: 2026-06-02
tags: [ai, blog]
description: "A simple explanation of why AI chatbots forget, how chat history works, and what context length means."
image: "/assets/img/blog/AI/ai-explained-simply-02/robot.jpg"
---

Have you ever told ChatGPT or Gemini something important, continued the conversation, and later it acted like you never said it?

It feels strange, because the chat is still on the screen. You can scroll up and see your own message. So why does the AI forget something that is clearly there?

In this session, I want to explain how simple AI chats handle memory, why they sometimes forget, and what people mean when they talk about **context length**.

## The Frozen Person
![Robot](/assets/img/blog/AI/ai-explained-simply-02/robot.jpg) 
Photo by <a href="https://unsplash.com/@fl__q?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Taiki Ishikawa</a> on <a href="https://unsplash.com/photos/a-robot-that-is-standing-in-the-air-PecQftb1ubg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Imagine a very smart person in freeze mode and the last thing they remember is from 2025 (knowledge cut off). You wake them up and give them a paper that says:

> My name is Omid. Explain AI to me simply.

They read the paper, answer the question, forgets everything and then go back into freeze mode.

Later, you wake them up again and ask:

> Can you explain the second part?

But this time you do not give them the first paper. You only give them the new question.

They might ask:

> Second part of what?

That does not mean they are stupid. It means they were not given the earlier information this time.

An LLM works in a similar way. If you want it to know what happened before, you need to give it that information again.

## How Chat Apps Create Memory

A normal chat app solves this problem by saving the conversation history outside the model.

When you send a new message, the app does not send only your latest message. It usually sends the model a package that looks something like this:

```text
System instruction:
You are a helpful assistant.

User:
My name is Omid. Explain AI to me simply.

Assistant:
AI is a computer program that learned patterns from examples.

User:
Can you explain the second part?

Assistant:
```

Now the model can answer the new question because it can see the earlier messages again and will predict the next possible words that should come after the last one.

This is why a chatbot feels like it remembers. The memory is not only inside the model. The chat app is keeping the conversation and passing it back to the model.

## Context Is What The Model Can See

The information sent to the model is called **context** and it can include everything you want the LLM to know when you wake it up.

The model answers based on the context it receives. If something is inside the context, the model can use it. If something is not inside the context, the model cannot use it.

This is the most important idea:

> A simple chatbot does not remember because the model has human-like memory. It remembers because the app sends the previous conversation to the model everytime you say something.

## Context Feels Like Memory

This kind of memory is useful, but it is not the same as human memory. its like a piece of paper you give to that frozen person everytime you wake them up and ask them to read it first.

A person might remember that you like a certain kind of music, that you are working on a project, or that you asked a question yesterday. A simple LLM does not automatically keep those memories in its own mind. simply because there is no mind.

Instead, it reads the current context and responds to it.

It is a bit like joining a meeting after reading the meeting notes. If the notes are clear, you can understand what happened before. If the notes are missing something important, you may misunderstand the conversation.

So when a chatbot remembers your earlier message, it is often because that earlier message is still included in the context.

## Then we should be good to go, right? wrong.

There is one big limitation: the context cannot be infinite. you can not give me 18 pages (front and back) of our recent conversations and expect me to remember every word in those pages. As context grows, attention reduces and some models does not allow contexts more than a specific amount of tokens. (wait, what is token again? think of it like a word for LLMs. 1 word is not equal to 1 token but its enough for know)

When the conversation becomes too long, we to make decisions:

- remove older messages
- summarize earlier parts of the chat
- keep some important details and drop others

This is one reason a chatbot may forget something you clearly said earlier. The message may still be visible on your screen, but it may no longer be included in the context sent to the model. So the model can feel like it remembers, but the real mechanism is context. And because context has a maximum length, a chatbot can forget, lose details, or misunderstand old parts of a long conversation.

## What Comes Next

Once we understand context, we can understand why people build more systems around LLMs.

In future sessions, we can talk about how apps give an LLM better memory using summaries, files, databases, search, and tools. These systems can help the model remember more useful information, but they are still systems built around the model.

The LLM is the engine. The memory system is part of the vehicle around it.
