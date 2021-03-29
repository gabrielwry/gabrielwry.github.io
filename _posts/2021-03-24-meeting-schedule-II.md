---
layout: post
title:  "Interview - Meeting Schedule II"
date:   2021-03-23
desc: "Solution on Leetcode - Meeting Schedule II"
keywords: "Algorithm, Interview, Leetcode"
categories: [Work]
tags: [Interview,Leetcode,Algorithm,Heap]
icon: icon-cloud
---

## Description

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return *the minimum number of conference rooms required*.



**Example 1:**

```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
```

**Example 2:**

```
Input: intervals = [[7,10],[2,4]]
Output: 1
```



## Solution

First we want to sort these intervals by their start time, this sorting implies that when we check a new interval, it is guranteed to have a staring position later than the previous interval, so as long as it is also larger than the previous ending, then this interval doesn't overlap.

Imagine unsorted, that

`[10, 15], [5, 9]` these actually doesn't overlap, but because we didn't check their starting, by simply checking the ending won't gurantee that. 



The reason we want to simply compare the start to the previous end is because we can use this as a key to manage a priorty queue. 



So that each element in this priority queue indicate an ending time, and we can simply compare the new meeting's starting time to the earliest ending time to know if we need a new room. Note we can not just track that earliest ending time because we would lost track of other room that can become available later.



So the code is

```python
class Solution:
        
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if len(intervals) == 0:
            return 0
        
        meetings = sorted(intervals, key=lambda x: x[0])
        import heapq
        rooms = 1
        schedules = [meetings[0][1]]
        
        for i in meetings[1:]:
            print(schedules)
            if  schedules[0] <= i[0]:
                heapq.heappop(schedules)
            else:
                rooms += 1
            heapq.heappush(schedules, i[1])
        return rooms
```

 We use `heapq` to add new ending time as a meeting starts, and remove a ending time as a meeting ends.