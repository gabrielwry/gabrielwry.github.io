---
layout: post
title:  "Algorithm - Longest String Chain"
date:   2021-03-19
desc: "Leetcode longest string chain solution"
keywords: "Leetcode, Algorithm, Interview"
categories: [Work]
tags: [Interview,DP,Leetcode]
icon: icon-cloud
---

Given a list of words, each word consists of English lowercase letters.

Let's say `word1` is a predecessor of `word2` if and only if we can add exactly one letter anywhere in `word1` to make it equal to `word2`. For example, `"abc"` is a predecessor of `"abac"`.

A *word chain* is a sequence of words `[word_1, word_2, ..., word_k]` with `k >= 1`, where `word_1` is a predecessor of `word_2`, `word_2` is a predecessor of `word_3`, and so on.

Return the longest possible length of a word chain with words chosen from the given list of `words`.



## Solution

Dynamic programming approach:
Keep a record of the max length all possible predecessors

```python
class Solution:     
    def longestStrChain(self, words: List[str]) -> int:
        # sort the list first by length to make sure we visited 
        #  all possible predecessor of a word before we check this word
        dp = {}
        for w in sorted(words, key=len):
            max_prev = 0
            for i in range(len(w)):
                # the word with just one missing letter
                max_prev = max(dp.get(w[:i] + w[i+1 :], 0)+1, max_prev)
            dp[w] = max_prev
        return max(dp.values())
```

