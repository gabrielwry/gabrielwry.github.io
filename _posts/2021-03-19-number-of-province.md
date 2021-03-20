---
layout: post
title:  "Algorithm - Number of Province"
date:   2021-03-19
desc: "Leetcode number of province solution"
keywords: "Leetcode, Algorithm, Interview"
categories: [Work]
tags: [Interview,BFS,Leetcode]
icon: icon-cloud
---


# Number of Provinces

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return *the total number of **provinces***.



## Solution

BFS approach:

Recursively traverse every node and add every neighbor that's `1` into the stack, mark traversed node visited; Keep a counter `i` for number of provinces;

After the stack is empty, increment `i` and find the next unvisited `1` in the matrix and repeat that traverse. 

Exit the loop and return `i` as the number of provinces



```python
class Solution:
    # helper method for adding every connected neightbor to the stack
    @staticmethod
    def bfs(m, visited, i):
        stack = [i]
        while(len(stack) != 0):
            n = stack.pop(0) # pop from the stack
            visited[n] = 1
            # visit every unvisited neighbor to check if it is connected
            # check if the nth column of every row is 1
            for i in range(len(m)):
                if not visited[i]:
                    if m[n][i]:
                        stack.append(i)
        
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        visited = [0] * len(isConnected)
        count = 0
        for i in range(len(isConnected)):
            if not visited[i]:
                count += 1
                self.bfs(isConnected, visited, i)
        return count
        
```



