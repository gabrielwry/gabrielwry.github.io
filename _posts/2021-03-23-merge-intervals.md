---
layout: post
title:  "Interview - Merge Intervals"
date:   2021-03-23
desc: "Solution on Leetcode - Merge Intervals"
keywords: "Algorithm, Interview, Leetcode"
categories: [Work]
tags: [Interview,Leetcode,Algorithm,Array]
icon: icon-cloud
---

## Description

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.

 

**Example 1:**

```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```

**Example 2:**

```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

 

**Constraints:**

- `1 <= intervals.length <= 104`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 104`



## Solution

The first question we should ask is:

Can we sort? If we can, the problem reduce to a much simpler one, where you can just scan through the list once and keep merging your list, this can even be done in O(1) if you choose recursion and modify the list in place. Here is a solution

```python3
class Solution:
    def helper(self, intervals, i):
        if i == len(intervals):
            return intervals
        prev_interval = intervals[i-1]
        cur_interval = intervals[i]
        if prev_interval[1] >= cur_interval[0]:
            # merge situation
            return self.helper(intervals[:i-1] + [[min(prev_interval[0], cur_interval[0]),
                                                   max(cur_interval[1], prev_interval[1])]] + intervals[min(i+1, len(intervals)):], i)
        else:
            return self.helper(intervals, i+1)
    
    
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) == 1:
            return intervals
        return self.helper(sorted(intervals, key=lambda x: x[0]), 1)
```



But if sorting are not available, for example, this is a stream of intervals (so you wouldn't have the knowledg of the largest and smallet start, end). This becomes a little bit trickier.

We need a brute force to traverse every merged interval, to see if it fits in any of them. 