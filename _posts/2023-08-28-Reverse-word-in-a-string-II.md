
## Reverse word in a String II
Given a character array s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by a single space.

Your code must solve the problem in-place, i.e. without allocating extra space.



Example 1:

Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
Example 2:

Input: s = ["a"]
Output: ["a"]
## Intuition

We can reverse the whole string and then reverse each word in it. 

## Solution

```python
class  Solution:

	def  reverseWords(self, s: List[str]) -> None:

	"""

	Do not return anything, modify s in-place instead.

	"""

  

	left, right = 0, len(s) - 1

  

	for i in  range(len(s)//2):

		s[i], s[len(s) - (i + 1)] = s[len(s) - (i + 1)], s[i]

		print(s)

	left, right = 0, 0

  

	for idx in  range(len(s)):

		if s[idx] == ' '  or idx == len(s) - 1:

			right = idx

			while left <= right:

				if s[left] == ' ':

					left += 1

				elif s[right] == ' ':

					right -= 1

				else:

					s[left], s[right] = s[right], s[left]

					left += 1

					right -= 1

			left = idx + 1
```

