---
layout: layout.njk
title: Dynamic class in ruby trick
tags: metaprogramming class ruby oop oriented object programming
date: 2024-10-16
---

# Dynamic class in ruby trick

Today I will share an interesting way to create classes with ruby and its metaprogramming features. I will introduce what my problem was and how I developed my approach.
Hope you enjoy!

## The problem

I was solving an exercise of the Piscine Ruby Day 03 of 42school(I am not afiliated nor student there, just solving by self interests) in ruby. The involved building an Html generator inheriting tags from the Elem class, defined as:

```ruby
class Text
  def initialize(param)
    @content = param
  end

  def to_s
    @content
  end
end

class Elem
  attr_accessor :content, :opt, :tag, :tag_type

  def initialize(tag, content = [], tag_type = "double", opt = {})
    @tag = tag
    @content = content.is_a?(Array) || content.is_a?(Text) ? content : [content]
    @opt = opt
    @tag_type = tag_type
  end

  def add_content(*args)
    args.each { |el| @content << el}
  end

  def to_s
    attributes = @opt.map { |key, value| " #{key}='#{value}'" }.join("")
    check_for_content_tags = %w[Html Head Body].include?(@tag) ?  "<#{@tag}#{attributes}>\n" : "<#{@tag}#{attributes}>"
    open_tag = @tag_type == "simple" ? "<#{@tag}#{attributes} />" : check_for_content_tags

    inner_content = @content.is_a?(Text) ? content.to_s : @content.map { |el| 
                                                                      if el.is_a? String
                                                                        el
                                                                      else
                                                                        el.to_s
                                                                      end
                                                                    }.join("")

    close_tag = @tag_type == "double" ? "</#{@tag}>\n" : "\n"
    
    "#{open_tag}#{inner_content}#{close_tag}"
  end
end
```

The obvious approach was to inherit all the elements required by the exercise as a new classes, calling the super and so on. However, as the exercise mentioned in a disclaimer this approach is tedious, and there is another way to do it.

```ruby

class Html < Elem
  def initialize(content = [], opt = {})
    super('Html', content, 'double', opt)
  end
end

class Head < Elem
  def initialize(content = [], opt = {})
    super('Head', content, 'double', opt)
  end
end

```

Imagine doing this to all the class(Html, Head, Body, Title, Meta, Img, Table, Th, Tr, Td, Ul, Ol, Lo, H1, H2, P, Div, Span, Hr, Br) required by the exercise-a pure exercise of patience and not programming. I thought about solving it with metaprogramming, but I was not very familiar with it on ruby, so I decided to research.

## The solution

While searching the web, I found [this](https://stackoverflow.com/questions/4113479/dynamic-class-definition-with-a-class-name) answer by the user "sepp2k", an interesting way to create classes. You use the "Object.const_set", where the first argument is the class name, and the Class.name can be used to define the new methods inside a block using define_method and can also be used to inherit from a class and use its modules.

```ruby
dynamic_name = "TestEval2"

Object.const_set(dynamic_name, Class.new) # If inheriting, use Class.new( superclass )
dummy2 = eval("#{dynamic_name}")
puts "dummy2: #{dummy2}"
```

You can learn more from the [Module#const_set](https://ruby-doc.org/3.3.5/Module.html#method-i-const_set) documentation.

So, the solution was easy to implement: Iterate over an array of future class names, create a new classes for them with the Object.const_set method, define a block that will inherits from the previously defined Elem class, create a logic to differentiate between "simple" and "double" tag type for some classes et voi là.

```ruby
ags = %w[Html Head Body Title Meta Img Table Th Tr Td Ul Ol Lo H1 H2 P Div Span Hr Br]

tags.each { |tag|
  Object.const_set(tag, Class.new(Elem) { 
    define_method(:initialize) { |content = [], opt = {}|
      tag_type = %w[Br Img Meta Hr].include?(tag) ? "simple" : "double"
      super(tag, content, tag_type, opt)
    }
  })
}
```

Works completly flawless and can be easily tested with the one liner provided by the 42 school:
```ruby
puts Html.new([Head.new([Title.new("Hello ground!")]), 
Body.new([H1.new("Oh no, not again!"),  Img.new([], 
{'src':'http://i.imgur.com/pfp3T.jpg'}) ]) ]).to_s
```

## Conclusion

I hope you find this useful on your journey. It is visible meta-programming can be used instead of relying on classic inheritance approach commonly used on object oriented programming(I think it is a misconception of OOP, but that is another story), resembling something like the factory design pattern.

Hope this technical blog post helps you on your journey. Special thanks to the anonymous on Stack Overflow, to the ruby documentation and to the 42schools for creating this problem. 