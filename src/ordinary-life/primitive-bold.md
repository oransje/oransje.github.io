---
layout: layout.njk
title: Primitive bold
tags: javascript graphics
date: 2024-10-07
---

# Primitive Bold

As I am working on the project for asteroids clone I wanted to do something like a bold text without using any font type, like the mayans and aztecs of programming. 

I will share an interesting trick I thought while dealing with this limitation of my project.

## The trick

You just draw the text abd interpolates the same text with the offset, this will make the text redrawings on the offset of the original position giving a bold illusion.

As for example, with a design tool we can first illustrate the original text:

![TEXT written on a image without any trick applied](/img/text-original.png)

And then redraw to the right with one pixel offset:

![TEXT redrawn on right position](/img/text-right.png)

Redrawing on thedown with one pixel offset:

![TEXT redrawn on up position](/img/text-up.png)

Redrawing on the up with one pixel offset:

![TEXT redrawn on down position](/img/text-up.png)

And so on, we obtain a bold from any font stroke, as my graphics engine only has one font type to render, I could easily break this limitation with this nice trick.

## Talk is cheap, show me the code!

First I will share the original code using gloss library. 
```hs
gameTitle
    = pictures 
        [ Translate (-350 + x) (50 +y) 
        $ Scale 0.3 0.3 
        $ Color cyan 
        $ Text "A S T E R O I D I N H O S" | (x, y) <- interpolations
        ]
    where
        interpolations = [(0, 0), (1, 0), (0, 1), (1, 1)]
```

The pictures instruction just groups an array of pictures to the same picture, which is the shape to be drawn on the gloss library.

Here we have a construtor of Translate, that repositions the cursor and then following constructors are just the text drawing picture itself. The array is built of four texts interpolated, resulting in a bold text effect. 

The result is a very nice raw game title with some weight on text effect:
![Asteroidinhos game title](/img/asteroids-game-title.png)

If you do not understand haskell gloss, no worries! I made the exactly same coding on js(I bet everyone on the web understands js):

```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const interpolations = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 }
];

ctx.font = '60px Arial';
ctx.fillStyle = 'violet';

interpolations.forEach(({ x, y }) => {
  ctx.save();
  ctx.translate(10 + x, 50 + y);
  ctx.scale(0.3, 0.3);
  ctx.fillText('PRIMITIVE BOLD', 0, 0);
  ctx.restore();
});
```

And the result:

![Primitive bold technique done in js with green border, red background and violet text](/img/primitive-bold-js.png)

You can check the full code on this [codepen](https://codepen.io/AmdChaos/pen/zYgKYeQ) I prepared specially for this article.

## The end

I hope that you had fun knowin this trick when dealing with small fonttypes sets and the need of a bold stroke. Special thanks to mdn and codepen that helped me on doing the js version to share the concept with you. Special thanks also to the canvas tool that make possible a non-designer explains the ideia without much work!