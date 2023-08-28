
## Reverse word in a String
Given an input string  `s`, reverse the order of the  **words**.

A  **word**  is defined as a sequence of non-space characters. The  **words**  in  `s`  will be separated by at least one space.

Return  _a string of the words in reverse order concatenated by a single space._

**Note**  that  `s`  may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

**Example 1:**

**Input:** s = "the sky is blue"
**Output:** "blue is sky the"

**Example 2:**

**Input:** s = "  hello world  "
**Output:** "world hello"
**Explanation:** Your reversed string should not contain leading or trailing spaces.

**Example 3:**

**Input:** s = "a good   example"
**Output:** "example good a"
**Explanation:** You need to reduce multiple spaces between two words to a single space in the reversed string.


## Intuition

If we translate the sentence to a list of words (ignoring extra space), this problem will be reduced to reverse a simple list. 

## Solution

```python
class  Solution:

def  reverseWords(self, s: str) -> str:

	words = list(filter(lambda  w: w!= '', s.split(' ')))

	for i in  range(len(words) // 2):

		words[i], words[len(words) - (i + 1)] = words[len(words) - (i + 1)], words[i]

	return  ' '.join(words)
```

