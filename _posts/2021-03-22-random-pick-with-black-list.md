---
layout: post
title:  "Interview - Random Pick with Blacklist"
date:   2021-03-21
desc: "Solution on Leetcode - Random Pick with Blacklist"
keywords: "Algorithm, Interview, Leetcode"
categories: [Work]
tags: [Interview,Leetcode,Algorithm,Random]
icon: icon-cloud
---

## Description

Given a blacklist `B` containing unique integers from `[0, N)`, write a function to return a uniform random integer from `[0, N)` which is **NOT** in `B`.

Optimize it such that it minimizes the call to system’s `Math.random()`.



## Intuition

The official solution from Leetcode is bullshit.

Imagine the list 

`[o, x, o, o, o, x, o, o]`

where `o` is whitelist number and `x` is blacklist number;

the trick here is how to map every blacklist to a whitelist without looping through the WHOLE whitelist.

What we need is a whitelist that has at least the same length of the blacklist; by iterating through the list to find first `N` whitelist number won't work, because you are still iterating through the WHOLE list essentially.



The solution is not intuitive, but once you see it, you get it.



We split the list to two part

`[o, x |, o, o, x, o, o]`

where the first part `X` contains `Len(blacklist)` number of element, the second part `Y` contains remaining;

let's do some simple math here:

`X` by definition, has `len(blacklist)` number of element

because all blacklist number exist in the list, so we can say that if there are `a` black list number in `X` and `b` blacklist numbert in `Y` then:

`a + b = len(blacklist)`

so `X` will have `len(blacklist) - a = b` number of whitelist number;

meaning that, if we iterate through the `b` blacklist number in `Y` and all the `b`  whitelist number in `X` simultaneously, we can easily map every blacklist number in `Y` to a guaranteed whitelist number.



Then the random pick would become, picking one and return the mapped value if it is a black list

```python
class Solution:

    def __init__(self, N: int, blacklist: List[int]):
        self.n = range(len(blacklist), N)
        whitelist = [
            i for i in range(len(blacklist)) if i not in blacklist
        ]
        self.m = {}
        c = 0
        for j in blacklist:
            if j < len(blacklist) :
                continue
            self.m[j] = whitelist[c]
            c += 1
        print(self.m)
                
            
        
    def pick(self) -> int:
        r = random.choice(self.n)
        return self.m.get(r, r)
```

