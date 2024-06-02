---
layout: layout.njk
title: InterestingBits[0]
tags: problems haskell ascii phonebook
date: 2024-02-08
---
# Interesting bits part 0

A series about some problems and writeups at the internet that I take time to solve, nothing superflous!

Today we gonna see a little exercise with ascii and a phonebook application in... HASKELL.

## Ascii uppercase prompt

This is simple, the program must output everything in uppercase and shows a generic message if no input is given.

First we assume that every ascii code in lowercase are the same integer value for the same letter in uppercase. So we can define the algorithm as:
```hs
sub32Ord :: Char -> Char
sub32Ord c
  | c >= 'a' && c <= 'z' = chr $ ord c - 32
  | otherwise            = c
```

Where to obtain an uppercase letter, we just subtract 5b of the current char.

After we apply some declarative programming magic!
```hs
processArg :: [String] -> String
processArg arg
  | null arg   = "IMAGINE ALL THE PEOPLE TYPING IN UPPERCASE..."
  | otherwise  = toUpper $ foldr (++) "" arg

toUpper :: String -> String
toUpper = map sub32Ord
```

This functions reduces with a concatenation starting with empty value as acumulator and the args list of strings, then we apply map on the final strings, using the former subtraction algorithm and it's done.

Check the code [here](hhttps://github.com/oransje/interesting-bits/blob/main/00/upper.hs)