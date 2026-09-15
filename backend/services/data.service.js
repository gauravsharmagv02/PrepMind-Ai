// Seed & Data Service with mock data and in-memory store fallback

const MOCK_CODING_PROBLEMS = [
  {
    id: "prob_1",
    title: "Two Sum Target Pair",
    difficulty: "Easy",
    category: "Arrays & Hashes",
    functionName: "twoSum",
    statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterTemplates: {
      javascript: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
      python: `# Python execution coming soon\ndef two_sum(nums, target):\n    pass`,
      cpp: `// C++ execution coming soon\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};`,
      java: `// Java execution coming soon\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], inputDisplay: "nums = [2,7,11,15], target = 9", expectedDisplay: "[0,1]" },
      { input: [[3, 2, 4], 6], expected: [1, 2], inputDisplay: "nums = [3,2,4], target = 6", expectedDisplay: "[1,2]" },
      { input: [[3, 3], 6], expected: [0, 1], inputDisplay: "nums = [3,3], target = 6", expectedDisplay: "[0,1]" }
    ],
    hiddenTestCases: [
      { input: [[1, 5, 8, 3], 11], expected: [2, 3], inputDisplay: "nums = [1,5,8,3], target = 11", expectedDisplay: "[2,3]" },
      { input: [[0, 4, 3, 0], 0], expected: [0, 3], inputDisplay: "nums = [0,4,3,0], target = 0", expectedDisplay: "[0,3]" },
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], inputDisplay: "nums = [-1,-2,-3,-4,-5], target = -8", expectedDisplay: "[2,4]" }
    ]
  },
  {
    id: "prob_2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    functionName: "isValid",
    statement: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    starterTemplates: {
      javascript: `function isValid(s) {\n    // Write your solution here\n    \n}`,
      python: `# Python execution coming soon\ndef is_valid(s):\n    pass`,
      cpp: `// C++ execution coming soon\nclass Solution {\npublic:\n    bool isValid(string s) {\n        return false;\n    }\n};`,
      java: `// Java execution coming soon\nclass Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["()[]{}"], expected: true, inputDisplay: "s = \"()[]{}\"", expectedDisplay: "true" },
      { input: ["(]"], expected: false, inputDisplay: "s = \"(]\"", expectedDisplay: "false" },
      { input: ["{[]}"], expected: true, inputDisplay: "s = \"{[]}\"", expectedDisplay: "true" }
    ],
    hiddenTestCases: [
      { input: ["([)]"], expected: false, inputDisplay: "s = \"([)]\"", expectedDisplay: "false" },
      { input: ["]"], expected: false, inputDisplay: "s = \"]\"", expectedDisplay: "false" },
      { input: ["(("], expected: false, inputDisplay: "s = \"((\"", expectedDisplay: "false" }
    ]
  },
  {
    id: "prob_3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    functionName: "lengthOfLongestSubstring",
    statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "s = \"abcabcbb\"", output: "3 (abc)" },
      { input: "s = \"bbbbb\"", output: "1 (b)" }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    starterTemplates: {
      javascript: `function lengthOfLongestSubstring(s) {\n    // Write your solution here\n    \n}`,
      python: `# Python execution coming soon\ndef length_of_longest_substring(s):\n    pass`,
      cpp: `// C++ execution coming soon\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`,
      java: `// Java execution coming soon\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["abcabcbb"], expected: 3, inputDisplay: "s = \"abcabcbb\"", expectedDisplay: "3" },
      { input: ["bbbbb"], expected: 1, inputDisplay: "s = \"bbbbb\"", expectedDisplay: "1" },
      { input: ["pwwkew"], expected: 3, inputDisplay: "s = \"pwwkew\"", expectedDisplay: "3" }
    ],
    hiddenTestCases: [
      { input: [""], expected: 0, inputDisplay: "s = \"\"", expectedDisplay: "0" },
      { input: [" "], expected: 1, inputDisplay: "s = \" \"", expectedDisplay: "1" },
      { input: ["dvdf"], expected: 3, inputDisplay: "s = \"dvdf\"", expectedDisplay: "3" }
    ]
  },
  {
    id: "prob_4",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    functionName: "trap",
    statement: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    starterTemplates: {
      javascript: `function trap(height) {\n    // Write your solution here\n    \n}`,
      python: `# Python execution coming soon\ndef trap(height):\n    pass`,
      cpp: `// C++ execution coming soon\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        return 0;\n    }\n};`,
      java: `// Java execution coming soon\nclass Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6, inputDisplay: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expectedDisplay: "6" },
      { input: [[4,2,0,3,2,5]], expected: 9, inputDisplay: "height = [4,2,0,3,2,5]", expectedDisplay: "9" }
    ],
    hiddenTestCases: [
      { input: [[0]], expected: 0, inputDisplay: "height = [0]", expectedDisplay: "0" },
      { input: [[3,0,2,0,4]], expected: 7, inputDisplay: "height = [3,0,2,0,4]", expectedDisplay: "7" }
    ]
  },

  /* EASY CODING PROBLEMS (10 New: prob_5 to prob_14) */
  {
    id: "prob_5",
    title: "Find Second Largest Element",
    difficulty: "Easy",
    category: "Arrays & Sorting",
    functionName: "findSecondLargest",
    statement: "Given an array `nums` of positive integers, return the second largest distinct element in the array. If no second largest distinct element exists, return -1.",
    examples: [
      { input: "nums = [12, 35, 1, 10, 34, 1]", output: "34" },
      { input: "nums = [10, 10, 10]", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^9"
    ],
    starterTemplates: {
      javascript: `function findSecondLargest(nums) {\n    // Write your solution here\n    \n}`,
      python: `def find_second_largest(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int findSecondLargest(vector<int>& nums) {\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int findSecondLargest(int[] nums) {\n        return -1;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[12, 35, 1, 10, 34, 1]], expected: 34, inputDisplay: "nums = [12,35,1,10,34,1]", expectedDisplay: "34" },
      { input: [[10, 10, 10]], expected: -1, inputDisplay: "nums = [10,10,10]", expectedDisplay: "-1" },
      { input: [[5, 2, 8, 1, 9]], expected: 8, inputDisplay: "nums = [5,2,8,1,9]", expectedDisplay: "8" }
    ],
    hiddenTestCases: [
      { input: [[7]], expected: -1, inputDisplay: "nums = [7]", expectedDisplay: "-1" },
      { input: [[1, 2]], expected: 1, inputDisplay: "nums = [1,2]", expectedDisplay: "1" },
      { input: [[100, 50, 100, 20]], expected: 50, inputDisplay: "nums = [100,50,100,20]", expectedDisplay: "50" },
      { input: [[9, 8, 7, 6, 5]], expected: 8, inputDisplay: "nums = [9,8,7,6,5]", expectedDisplay: "8" },
      { input: [[4, 4, 4, 4, 5]], expected: 4, inputDisplay: "nums = [4,4,4,4,5]", expectedDisplay: "4" }
    ]
  },
  {
    id: "prob_6",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Two Pointers",
    functionName: "removeDuplicates",
    statement: "Given a sorted array `nums`, remove the duplicates in-place such that each unique element appears only once and return the count of unique elements.",
    examples: [
      { input: "nums = [1, 1, 2]", output: "2" },
      { input: "nums = [0,0,1,1,1,2,2,3,3,4]", output: "5" }
    ],
    constraints: [
      "0 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100"
    ],
    starterTemplates: {
      javascript: `function removeDuplicates(nums) {\n    // Write your solution here\n    \n}`,
      python: `def remove_duplicates(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 1, 2]], expected: 2, inputDisplay: "nums = [1,1,2]", expectedDisplay: "2" },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5, inputDisplay: "nums = [0,0,1,1,1,2,2,3,3,4]", expectedDisplay: "5" },
      { input: [[1, 2, 3]], expected: 3, inputDisplay: "nums = [1,2,3]", expectedDisplay: "3" }
    ],
    hiddenTestCases: [
      { input: [[]], expected: 0, inputDisplay: "nums = []", expectedDisplay: "0" },
      { input: [[1]], expected: 1, inputDisplay: "nums = [1]", expectedDisplay: "1" },
      { input: [[2, 2, 2, 2]], expected: 1, inputDisplay: "nums = [2,2,2,2]", expectedDisplay: "1" },
      { input: [[-3, -1, 0, 0, 4]], expected: 4, inputDisplay: "nums = [-3,-1,0,0,4]", expectedDisplay: "4" },
      { input: [[10, 20, 30, 40]], expected: 4, inputDisplay: "nums = [10,20,30,40]", expectedDisplay: "4" }
    ]
  },
  {
    id: "prob_7",
    title: "Reverse a String",
    difficulty: "Easy",
    category: "Strings",
    functionName: "reverseString",
    statement: "Given a string `s`, return the reversed string.",
    examples: [
      { input: "s = \"hello\"", output: "\"olleh\"" },
      { input: "s = \"PrepMind\"", output: "\"dniMperP\"" }
    ],
    constraints: [
      "0 <= s.length <= 10^5",
      "s consists of printable ASCII characters."
    ],
    starterTemplates: {
      javascript: `function reverseString(s) {\n    // Write your solution here\n    \n}`,
      python: `def reverse_string(s):\n    pass`,
      cpp: `class Solution {\npublic:\n    string reverseString(string s) {\n        return "";\n    }\n};`,
      java: `class Solution {\n    public String reverseString(String s) {\n        return "";\n    }\n}`
    },
    visibleTestCases: [
      { input: ["hello"], expected: "olleh", inputDisplay: "s = \"hello\"", expectedDisplay: "\"olleh\"" },
      { input: ["PrepMind"], expected: "dniMperP", inputDisplay: "s = \"PrepMind\"", expectedDisplay: "\"dniMperP\"" },
      { input: ["a"], expected: "a", inputDisplay: "s = \"a\"", expectedDisplay: "\"a\"" }
    ],
    hiddenTestCases: [
      { input: [""], expected: "", inputDisplay: "s = \"\"", expectedDisplay: "\"\"" },
      { input: ["racecar"], expected: "racecar", inputDisplay: "s = \"racecar\"", expectedDisplay: "\"racecar\"" },
      { input: ["12345"], expected: "54321", inputDisplay: "s = \"12345\"", expectedDisplay: "\"54321\"" },
      { input: ["Open AI"], expected: "IA nepO", inputDisplay: "s = \"Open AI\"", expectedDisplay: "\"IA nepO\"" },
      { input: ["JavaScript"], expected: "tpircSavaJ", inputDisplay: "s = \"JavaScript\"", expectedDisplay: "\"tpircSavaJ\"" }
    ]
  },
  {
    id: "prob_8",
    title: "Check Palindrome String",
    difficulty: "Easy",
    category: "Strings & Two Pointers",
    functionName: "isPalindrome",
    statement: "Given a string `s`, return `true` if it is a palindrome considering only alphanumeric characters and ignoring cases, otherwise return `false`.",
    examples: [
      { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" },
      { input: "s = \"race a car\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters."
    ],
    starterTemplates: {
      javascript: `function isPalindrome(s) {\n    // Write your solution here\n    \n}`,
      python: `def is_palindrome(s):\n    pass`,
      cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true, inputDisplay: "s = \"A man, a plan, a canal: Panama\"", expectedDisplay: "true" },
      { input: ["race a car"], expected: false, inputDisplay: "s = \"race a car\"", expectedDisplay: "false" },
      { input: [" "], expected: true, inputDisplay: "s = \" \"", expectedDisplay: "true" }
    ],
    hiddenTestCases: [
      { input: ["ab_a"], expected: true, inputDisplay: "s = \"ab_a\"", expectedDisplay: "true" },
      { input: ["0P"], expected: false, inputDisplay: "s = \"0P\"", expectedDisplay: "false" },
      { input: ["No 'x' in Nixon"], expected: true, inputDisplay: "s = \"No 'x' in Nixon\"", expectedDisplay: "true" },
      { input: ["12321"], expected: true, inputDisplay: "s = \"12321\"", expectedDisplay: "true" },
      { input: ["hello"], expected: false, inputDisplay: "s = \"hello\"", expectedDisplay: "false" }
    ]
  },
  {
    id: "prob_9",
    title: "Count Frequency of Elements",
    difficulty: "Easy",
    category: "HashMap",
    functionName: "countFrequencies",
    statement: "Given an array `nums`, return an object mapping each unique element to its frequency count.",
    examples: [
      { input: "nums = [1, 2, 2, 3, 1, 4]", output: "{\"1\":2,\"2\":2,\"3\":1,\"4\":1}" }
    ],
    constraints: [
      "0 <= nums.length <= 10^4"
    ],
    starterTemplates: {
      javascript: `function countFrequencies(nums) {\n    // Write your solution here\n    \n}`,
      python: `def count_frequencies(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    map<int, int> countFrequencies(vector<int>& nums) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public Map<Integer, Integer> countFrequencies(int[] nums) {\n        return new HashMap<>();\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2, 2, 3, 1, 4]], expected: {"1":2, "2":2, "3":1, "4":1}, inputDisplay: "nums = [1,2,2,3,1,4]", expectedDisplay: "{\"1\":2,\"2\":2,\"3\":1,\"4\":1}" },
      { input: [["a", "b", "a"]], expected: {"a":2, "b":1}, inputDisplay: "nums = [\"a\",\"b\",\"a\"]", expectedDisplay: "{\"a\":2,\"b\":1}" }
    ],
    hiddenTestCases: [
      { input: [[]], expected: {}, inputDisplay: "nums = []", expectedDisplay: "{}" },
      { input: [[5, 5, 5, 5]], expected: {"5":4}, inputDisplay: "nums = [5,5,5,5]", expectedDisplay: "{\"5\":4}" },
      { input: [[10]], expected: {"10":1}, inputDisplay: "nums = [10]", expectedDisplay: "{\"10\":1}" },
      { input: [[1, -1, 1, -1]], expected: {"1":2, "-1":2}, inputDisplay: "nums = [1,-1,1,-1]", expectedDisplay: "{\"1\":2,\"-1\":2}" },
      { input: [[0, 0, 0]], expected: {"0":3}, inputDisplay: "nums = [0,0,0]", expectedDisplay: "{\"0\":3}" }
    ]
  },
  {
    id: "prob_10",
    title: "Move Zeroes to End",
    difficulty: "Easy",
    category: "Two Pointers & Arrays",
    functionName: "moveZeroes",
    statement: "Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements. Return the modified array.",
    examples: [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "nums = [0]", output: "[0]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    starterTemplates: {
      javascript: `function moveZeroes(nums) {\n    // Write your solution here\n    \n}`,
      python: `def move_zeroes(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> moveZeroes(vector<int>& nums) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] moveZeroes(int[] nums) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0], inputDisplay: "nums = [0,1,0,3,12]", expectedDisplay: "[1,3,12,0,0]" },
      { input: [[0]], expected: [0], inputDisplay: "nums = [0]", expectedDisplay: "[0]" }
    ],
    hiddenTestCases: [
      { input: [[1, 2, 3]], expected: [1, 2, 3], inputDisplay: "nums = [1,2,3]", expectedDisplay: "[1,2,3]" },
      { input: [[0, 0, 0]], expected: [0, 0, 0], inputDisplay: "nums = [0,0,0]", expectedDisplay: "[0,0,0]" },
      { input: [[4, 0, 5, 0, 0, 6]], expected: [4, 5, 6, 0, 0, 0], inputDisplay: "nums = [4,0,5,0,0,6]", expectedDisplay: "[4,5,6,0,0,0]" },
      { input: [[-1, 0, -2, 0]], expected: [-1, -2, 0, 0], inputDisplay: "nums = [-1,0,-2,0]", expectedDisplay: "[-1,-2,0,0]" },
      { input: [[10, 0]], expected: [10, 0], inputDisplay: "nums = [10,0]", expectedDisplay: "[10,0]" }
    ]
  },
  {
    id: "prob_11",
    title: "Find Missing Number",
    difficulty: "Easy",
    category: "Arrays & Math",
    functionName: "findMissingNumber",
    statement: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the single number in the range that is missing from the array.",
    examples: [
      { input: "nums = [3, 0, 1]", output: "2" },
      { input: "nums = [0, 1]", output: "2" }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n"
    ],
    starterTemplates: {
      javascript: `function findMissingNumber(nums) {\n    // Write your solution here\n    \n}`,
      python: `def find_missing_number(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int findMissingNumber(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int findMissingNumber(int[] nums) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[3, 0, 1]], expected: 2, inputDisplay: "nums = [3,0,1]", expectedDisplay: "2" },
      { input: [[0, 1]], expected: 2, inputDisplay: "nums = [0,1]", expectedDisplay: "2" },
      { input: [[9,6,4,2,3,5,7,0,1]], expected: 8, inputDisplay: "nums = [9,6,4,2,3,5,7,0,1]", expectedDisplay: "8" }
    ],
    hiddenTestCases: [
      { input: [[0]], expected: 1, inputDisplay: "nums = [0]", expectedDisplay: "1" },
      { input: [[1]], expected: 0, inputDisplay: "nums = [1]", expectedDisplay: "0" },
      { input: [[1, 2]], expected: 0, inputDisplay: "nums = [1,2]", expectedDisplay: "0" },
      { input: [[0, 2, 3]], expected: 1, inputDisplay: "nums = [0,2,3]", expectedDisplay: "1" },
      { input: [[4, 3, 2, 1, 0]], expected: 5, inputDisplay: "nums = [4,3,2,1,0]", expectedDisplay: "5" }
    ]
  },
  {
    id: "prob_12",
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    category: "Two Pointers & Sorting",
    functionName: "mergeSortedArrays",
    statement: "Given two sorted integer arrays `arr1` and `arr2`, merge them into a single sorted array and return it.",
    examples: [
      { input: "arr1 = [1, 3, 5], arr2 = [2, 4, 6]", output: "[1, 2, 3, 4, 5, 6]" }
    ],
    constraints: [
      "0 <= arr1.length, arr2.length <= 10^4"
    ],
    starterTemplates: {
      javascript: `function mergeSortedArrays(arr1, arr2) {\n    // Write your solution here\n    \n}`,
      python: `def merge_sorted_arrays(arr1, arr2):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> mergeSortedArrays(vector<int>& arr1, vector<int>& arr2) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] mergeSortedArrays(int[] arr1, int[] arr2) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], inputDisplay: "arr1 = [1,3,5], arr2 = [2,4,6]", expectedDisplay: "[1,2,3,4,5,6]" },
      { input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4], inputDisplay: "arr1 = [1,2], arr2 = [3,4]", expectedDisplay: "[1,2,3,4]" }
    ],
    hiddenTestCases: [
      { input: [[], [1, 2]], expected: [1, 2], inputDisplay: "arr1 = [], arr2 = [1,2]", expectedDisplay: "[1,2]" },
      { input: [[5, 10], []], expected: [5, 10], inputDisplay: "arr1 = [5,10], arr2 = []", expectedDisplay: "[5,10]" },
      { input: [[1], [1]], expected: [1, 1], inputDisplay: "arr1 = [1], arr2 = [1]", expectedDisplay: "[1,1]" },
      { input: [[-5, -1], [-3, 0]], expected: [-5, -3, -1, 0], inputDisplay: "arr1 = [-5,-1], arr2 = [-3,0]", expectedDisplay: "[-5,-3,-1,0]" },
      { input: [[10, 20, 30], [5, 15, 25]], expected: [5, 10, 15, 20, 25, 30], inputDisplay: "arr1 = [10,20,30], arr2 = [5,15,25]", expectedDisplay: "[5,10,15,20,25,30]" }
    ]
  },
  {
    id: "prob_13",
    title: "Maximum Difference Between Two Elements",
    difficulty: "Easy",
    category: "Arrays",
    functionName: "maxDifference",
    statement: "Given an array `nums` of integers, find the maximum difference `nums[j] - nums[i]` such that `j > i` and `nums[j] > nums[i]`. Return -1 if no such pair exists.",
    examples: [
      { input: "nums = [7, 1, 5, 3, 6, 4]", output: "5" },
      { input: "nums = [9, 4, 3, 2]", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^9"
    ],
    starterTemplates: {
      javascript: `function maxDifference(nums) {\n    // Write your solution here\n    \n}`,
      python: `def max_difference(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int maxDifference(vector<int>& nums) {\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int maxDifference(int[] nums) {\n        return -1;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5, inputDisplay: "nums = [7,1,5,3,6,4]", expectedDisplay: "5" },
      { input: [[9, 4, 3, 2]], expected: -1, inputDisplay: "nums = [9,4,3,2]", expectedDisplay: "-1" }
    ],
    hiddenTestCases: [
      { input: [[1, 2, 4, 10]], expected: 9, inputDisplay: "nums = [1,2,4,10]", expectedDisplay: "9" },
      { input: [[10, 10, 10]], expected: -1, inputDisplay: "nums = [10,10,10]", expectedDisplay: "-1" },
      { input: [[2, 3, 10, 6, 4, 8, 1]], expected: 8, inputDisplay: "nums = [2,3,10,6,4,8,1]", expectedDisplay: "8" },
      { input: [[5, 4, 3, 2, 1]], expected: -1, inputDisplay: "nums = [5,4,3,2,1]", expectedDisplay: "-1" },
      { input: [[1, 100]], expected: 99, inputDisplay: "nums = [1,100]", expectedDisplay: "99" }
    ]
  },
  {
    id: "prob_14",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Strings & HashMap",
    functionName: "isAnagram",
    statement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
      { input: "s = \"rat\", t = \"car\"", output: "false" }
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    starterTemplates: {
      javascript: `function isAnagram(s, t) {\n    // Write your solution here\n    \n}`,
      python: `def is_anagram(s, t):\n    pass`,
      cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["anagram", "nagaram"], expected: true, inputDisplay: "s = \"anagram\", t = \"nagaram\"", expectedDisplay: "true" },
      { input: ["rat", "car"], expected: false, inputDisplay: "s = \"rat\", t = \"car\"", expectedDisplay: "false" }
    ],
    hiddenTestCases: [
      { input: ["listen", "silent"], expected: true, inputDisplay: "s = \"listen\", t = \"silent\"", expectedDisplay: "true" },
      { input: ["a", "a"], expected: true, inputDisplay: "s = \"a\", t = \"a\"", expectedDisplay: "true" },
      { input: ["a", "b"], expected: false, inputDisplay: "s = \"a\", t = \"b\"", expectedDisplay: "false" },
      { input: ["ab", "a"], expected: false, inputDisplay: "s = \"ab\", t = \"a\"", expectedDisplay: "false" },
      { input: ["prepmind", "mindprep"], expected: true, inputDisplay: "s = \"prepmind\", t = \"mindprep\"", expectedDisplay: "true" }
    ]
  },

  /* MEDIUM CODING PROBLEMS (12 New: prob_15 to prob_26) */
  {
    id: "prob_15",
    title: "Longest Subarray With Given Sum",
    difficulty: "Medium",
    category: "Sliding Window & HashMap",
    functionName: "longestSubarrayWithSum",
    statement: "Given an array `nums` of integers and a target sum `k`, return the length of the longest subarray that sums to `k`. Return 0 if no such subarray exists.",
    examples: [
      { input: "nums = [10, 5, 2, 7, 1, 9], k = 15", output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterTemplates: {
      javascript: `function longestSubarrayWithSum(nums, k) {\n    // Write your solution here\n    \n}`,
      python: `def longest_subarray_with_sum(nums, k):\n    pass`,
      cpp: `class Solution {\npublic:\n    int longestSubarrayWithSum(vector<int>& nums, int k) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int longestSubarrayWithSum(int[] nums, int k) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[10, 5, 2, 7, 1, 9], 15], expected: 4, inputDisplay: "nums = [10,5,2,7,1,9], k = 15", expectedDisplay: "4" },
      { input: [[-1, 2, 3], 6], expected: 0, inputDisplay: "nums = [-1,2,3], k = 6", expectedDisplay: "0" }
    ],
    hiddenTestCases: [
      { input: [[1, 2, 3, 4, 5], 9], expected: 2, inputDisplay: "nums = [1,2,3,4,5], k = 9", expectedDisplay: "2" },
      { input: [[1, 1, 1, 1, 1], 3], expected: 3, inputDisplay: "nums = [1,1,1,1,1], k = 3", expectedDisplay: "3" },
      { input: [[5], 5], expected: 1, inputDisplay: "nums = [5], k = 5", expectedDisplay: "1" },
      { input: [[1, 4, 4], 4], expected: 1, inputDisplay: "nums = [1,4,4], k = 4", expectedDisplay: "1" },
      { input: [[2, 3, 5, 1, 9], 10], expected: 3, inputDisplay: "nums = [2,3,5,1,9], k = 10", expectedDisplay: "3" }
    ]
  },
  {
    id: "prob_16",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Arrays",
    functionName: "productExceptSelf",
    statement: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Do not use division.",
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]" }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30"
    ],
    starterTemplates: {
      javascript: `function productExceptSelf(nums) {\n    // Write your solution here\n    \n}`,
      python: `def product_except_self(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6], inputDisplay: "nums = [1,2,3,4]", expectedDisplay: "[24,12,8,6]" },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0], inputDisplay: "nums = [-1,1,0,-3,3]", expectedDisplay: "[0,0,9,0,0]" }
    ],
    hiddenTestCases: [
      { input: [[2, 3]], expected: [3, 2], inputDisplay: "nums = [2,3]", expectedDisplay: "[3,2]" },
      { input: [[0, 0]], expected: [0, 0], inputDisplay: "nums = [0,0]", expectedDisplay: "[0,0]" },
      { input: [[5, 1, 2]], expected: [2, 10, 5], inputDisplay: "nums = [5,1,2]", expectedDisplay: "[2,10,5]" },
      { input: [[1, 1, 1, 1]], expected: [1, 1, 1, 1], inputDisplay: "nums = [1,1,1,1]", expectedDisplay: "[1,1,1,1]" },
      { input: [[2, 4, 6]], expected: [24, 12, 8], inputDisplay: "nums = [2,4,6]", expectedDisplay: "[24,12,8]" }
    ]
  },
  {
    id: "prob_17",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "HashMap & Strings",
    functionName: "groupAnagrams",
    statement: "Given an array of strings `strs`, group the anagrams together. Return the grouped anagrams array with elements in each group sorted alphabetically.",
    examples: [
      { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"ate\",\"eat\",\"tea\"],[\"bat\"],[\"nat\",\"tan\"]]" }
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100"
    ],
    starterTemplates: {
      javascript: `function groupAnagrams(strs) {\n    // Write your solution here\n    \n}`,
      python: `def group_anagrams(strs):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        return new ArrayList<>();\n    }\n}`
    },
    visibleTestCases: [
      { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["ate","eat","tea"],["bat"],["nat","tan"]], inputDisplay: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", expectedDisplay: "[[\"ate\",\"eat\",\"tea\"],[\"bat\"],[\"nat\",\"tan\"]]" },
      { input: [[""]], expected: [[""]], inputDisplay: "strs = [\"\"]", expectedDisplay: "[[\"\"]]" }
    ],
    hiddenTestCases: [
      { input: [["a"]], expected: [["a"]], inputDisplay: "strs = [\"a\"]", expectedDisplay: "[[\"a\"]]" },
      { input: [["ab", "ba", "abc", "cba"]], expected: [["ab","ba"],["abc","cba"]], inputDisplay: "strs = [\"ab\",\"ba\",\"abc\",\"cba\"]", expectedDisplay: "[[\"ab\",\"ba\"],[\"abc\",\"cba\"]]" },
      { input: [["cat", "dog", "tac", "god"]], expected: [["cat","tac"],["dog","god"]], inputDisplay: "strs = [\"cat\",\"dog\",\"tac\",\"god\"]", expectedDisplay: "[[\"cat\",\"tac\"],[\"dog\",\"god\"]]" },
      { input: [["listen", "silent", "enlist"]], expected: [["enlist","listen","silent"]], inputDisplay: "strs = [\"listen\",\"silent\",\"enlist\"]", expectedDisplay: "[[\"enlist\",\"listen\",\"silent\"]]" },
      { input: [["a", "b", "c"]], expected: [["a"],["b"],["c"]], inputDisplay: "strs = [\"a\",\"b\",\"c\"]", expectedDisplay: "[[\"a\"],[\"b\"],[\"c\"]]" }
    ]
  },
  {
    id: "prob_18",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "HashMap & Sorting",
    functionName: "topKFrequent",
    statement: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in descending order of frequency.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1, 2]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "k is in range [1, number of unique elements]"
    ],
    starterTemplates: {
      javascript: `function topKFrequent(nums, k) {\n    // Write your solution here\n    \n}`,
      python: `def top_k_frequent(nums, k):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2], inputDisplay: "nums = [1,1,1,2,2,3], k = 2", expectedDisplay: "[1,2]" },
      { input: [[1], 1], expected: [1], inputDisplay: "nums = [1], k = 1", expectedDisplay: "[1]" }
    ],
    hiddenTestCases: [
      { input: [[4, 4, 4, 6, 6, 7], 1], expected: [4], inputDisplay: "nums = [4,4,4,6,6,7], k = 1", expectedDisplay: "[4]" },
      { input: [[5, 5, 8, 8, 8, 9, 9, 9, 9], 2], expected: [9, 8], inputDisplay: "nums = [5,5,8,8,8,9,9,9,9], k = 2", expectedDisplay: "[9,8]" },
      { input: [[1, 2, 3, 4], 4], expected: [1, 2, 3, 4], inputDisplay: "nums = [1,2,3,4], k = 4", expectedDisplay: "[1,2,3,4]" },
      { input: [[-1, -1, -2], 1], expected: [-1], inputDisplay: "nums = [-1,-1,-2], k = 1", expectedDisplay: "[-1]" },
      { input: [[10, 20, 20, 30, 30, 30], 2], expected: [30, 20], inputDisplay: "nums = [10,20,20,30,30,30], k = 2", expectedDisplay: "[30,20]" }
    ]
  },
  {
    id: "prob_19",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    functionName: "searchRotated",
    statement: "Given a rotated sorted array `nums` of distinct integers and a `target` value, return the index of `target` if it is in `nums`, or `-1` if it is not.",
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i], target <= 10^4"
    ],
    starterTemplates: {
      javascript: `function searchRotated(nums, target) {\n    // Write your solution here\n    \n}`,
      python: `def search_rotated(nums, target):\n    pass`,
      cpp: `class Solution {\npublic:\n    int searchRotated(vector<int>& nums, int target) {\n        return -1;\n    }\n};`,
      java: `class Solution {\n    public int searchRotated(int[] nums, int target) {\n        return -1;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4, inputDisplay: "nums = [4,5,6,7,0,1,2], target = 0", expectedDisplay: "4" },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1, inputDisplay: "nums = [4,5,6,7,0,1,2], target = 3", expectedDisplay: "-1" }
    ],
    hiddenTestCases: [
      { input: [[1], 0], expected: -1, inputDisplay: "nums = [1], target = 0", expectedDisplay: "-1" },
      { input: [[1], 1], expected: 0, inputDisplay: "nums = [1], target = 1", expectedDisplay: "0" },
      { input: [[3, 1], 1], expected: 1, inputDisplay: "nums = [3,1], target = 1", expectedDisplay: "1" },
      { input: [[5, 1, 3], 5], expected: 0, inputDisplay: "nums = [5,1,3], target = 5", expectedDisplay: "0" },
      { input: [[6, 7, 1, 2, 3, 4, 5], 6], expected: 0, inputDisplay: "nums = [6,7,1,2,3,4,5], target = 6", expectedDisplay: "0" }
    ]
  },
  {
    id: "prob_20",
    title: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    category: "Sliding Window",
    functionName: "minSubArrayLen",
    statement: "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray whose sum is greater than or equal to `target`. Return 0 if no such subarray exists.",
    examples: [
      { input: "target = 7, nums = [2, 3, 1, 2, 4, 3]", output: "2" }
    ],
    constraints: [
      "1 <= target <= 10^9",
      "1 <= nums.length <= 10^5"
    ],
    starterTemplates: {
      javascript: `function minSubArrayLen(target, nums) {\n    // Write your solution here\n    \n}`,
      python: `def min_sub_array_len(target, nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [7, [2, 3, 1, 2, 4, 3]], expected: 2, inputDisplay: "target = 7, nums = [2,3,1,2,4,3]", expectedDisplay: "2" },
      { input: [4, [1, 4, 4]], expected: 1, inputDisplay: "target = 4, nums = [1,4,4]", expectedDisplay: "1" }
    ],
    hiddenTestCases: [
      { input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0, inputDisplay: "target = 11, nums = [1,1,1,1,1,1,1,1]", expectedDisplay: "0" },
      { input: [15, [1, 2, 3, 4, 5]], expected: 5, inputDisplay: "target = 15, nums = [1,2,3,4,5]", expectedDisplay: "5" },
      { input: [5, [2, 3, 1, 1, 11]], expected: 1, inputDisplay: "target = 5, nums = [2,3,1,1,11]", expectedDisplay: "1" },
      { input: [10, [5, 1, 3, 5, 10]], expected: 1, inputDisplay: "target = 10, nums = [5,1,3,5,10]", expectedDisplay: "1" },
      { input: [6, [10, 2, 3]], expected: 1, inputDisplay: "target = 6, nums = [10,2,3]", expectedDisplay: "1" }
    ]
  },
  {
    id: "prob_21",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    functionName: "dailyTemperatures",
    statement: "Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.",
    examples: [
      { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }
    ],
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    starterTemplates: {
      javascript: `function dailyTemperatures(temperatures) {\n    // Write your solution here\n    \n}`,
      python: `def daily_temperatures(temperatures):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0], inputDisplay: "temperatures = [73,74,75,71,69,72,76,73]", expectedDisplay: "[1,1,4,2,1,1,0,0]" },
      { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0], inputDisplay: "temperatures = [30,40,50,60]", expectedDisplay: "[1,1,1,0]" }
    ],
    hiddenTestCases: [
      { input: [[30, 60, 90]], expected: [1, 1, 0], inputDisplay: "temperatures = [30,60,90]", expectedDisplay: "[1,1,0]" },
      { input: [[80, 80, 80]], expected: [0, 0, 0], inputDisplay: "temperatures = [80,80,80]", expectedDisplay: "[0,0,0]" },
      { input: [[50]], expected: [0], inputDisplay: "temperatures = [50]", expectedDisplay: "[0]" },
      { input: [[70, 71, 70, 72]], expected: [1, 2, 1, 0], inputDisplay: "temperatures = [70,71,70,72]", expectedDisplay: "[1,2,1,0]" },
      { input: [[60, 50, 40, 30]], expected: [0, 0, 0, 0], inputDisplay: "temperatures = [60,50,40,30]", expectedDisplay: "[0,0,0,0]" }
    ]
  },
  {
    id: "prob_22",
    title: "Detect Cycle in Linked List Representation",
    difficulty: "Medium",
    category: "Linked List & Two Pointers",
    functionName: "hasCycle",
    statement: "Given an array `nodes` representing a linked list where `nodes[i]` stores the index of the next node (`-1` indicates end of list), return `true` if the list contains a cycle.",
    examples: [
      { input: "nodes = [1, 2, 3, 1]", output: "true" },
      { input: "nodes = [1, 2, -1]", output: "false" }
    ],
    constraints: [
      "1 <= nodes.length <= 10^4",
      "-1 <= nodes[i] < nodes.length"
    ],
    starterTemplates: {
      javascript: `function hasCycle(nodes) {\n    // Write your solution here\n    \n}`,
      python: `def has_cycle(nodes):\n    pass`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(vector<int>& nodes) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean hasCycle(int[] nodes) {\n        return false;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2, 3, 1]], expected: true, inputDisplay: "nodes = [1,2,3,1]", expectedDisplay: "true" },
      { input: [[1, 2, -1]], expected: false, inputDisplay: "nodes = [1,2,-1]", expectedDisplay: "false" }
    ],
    hiddenTestCases: [
      { input: [[0]], expected: true, inputDisplay: "nodes = [0]", expectedDisplay: "true" },
      { input: [[-1]], expected: false, inputDisplay: "nodes = [-1]", expectedDisplay: "false" },
      { input: [[1, 0]], expected: true, inputDisplay: "nodes = [1,0]", expectedDisplay: "true" },
      { input: [[1, 2, 3, 4, -1]], expected: false, inputDisplay: "nodes = [1,2,3,4,-1]", expectedDisplay: "false" },
      { input: [[1, 2, 3, 4, 2]], expected: true, inputDisplay: "nodes = [1,2,3,4,2]", expectedDisplay: "true" }
    ]
  },
  {
    id: "prob_23",
    title: "Implement Queue Using Stacks",
    difficulty: "Medium",
    category: "Queue & Stack",
    functionName: "evalQueueOperations",
    statement: "Simulate a FIFO Queue using stack behavior for commands: `push(x)`, `pop()`, `peek()`, `empty()`. Given an array of operation commands `ops`, return the results array.",
    examples: [
      { input: "ops = [[\"push\", 1], [\"push\", 2], [\"peek\"], [\"pop\"], [\"empty\"]]", output: "[null, null, 1, 1, false]" }
    ],
    constraints: [
      "1 <= ops.length <= 100"
    ],
    starterTemplates: {
      javascript: `function evalQueueOperations(ops) {\n    // Write your solution here\n    \n}`,
      python: `def eval_queue_operations(ops):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<string> evalQueueOperations(vector<vector<string>>& ops) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public Object[] evalQueueOperations(Object[][] ops) {\n        return new Object[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[["push", 1], ["push", 2], ["peek"], ["pop"], ["empty"]]], expected: [null, null, 1, 1, false], inputDisplay: "ops = [[\"push\",1],[\"push\",2],[\"peek\"],[\"pop\"],[\"empty\"]]", expectedDisplay: "[null,null,1,1,false]" },
      { input: [[["push", 5], ["pop"], ["empty"]]], expected: [null, 5, true], inputDisplay: "ops = [[\"push\",5],[\"pop\"],[\"empty\"]]", expectedDisplay: "[null,5,true]" }
    ],
    hiddenTestCases: [
      { input: [[["empty"]]], expected: [true], inputDisplay: "ops = [[\"empty\"]]", expectedDisplay: "[true]" },
      { input: [[["push", 10], ["peek"]]], expected: [null, 10], inputDisplay: "ops = [[\"push\",10],[\"peek\"]]", expectedDisplay: "[null,10]" },
      { input: [[["push", 1], ["push", 2], ["pop"], ["pop"], ["empty"]]], expected: [null, null, 1, 2, true], inputDisplay: "ops = [[\"push\",1],[\"push\",2],[\"pop\"],[\"pop\"],[\"empty\"]]", expectedDisplay: "[null,null,1,2,true]" },
      { input: [[["push", 100], ["empty"]]], expected: [null, false], inputDisplay: "ops = [[\"push\",100],[\"empty\"]]", expectedDisplay: "[null,false]" },
      { input: [[["push", 3], ["peek"], ["pop"]]], expected: [null, 3, 3], inputDisplay: "ops = [[\"push\",3],[\"peek\"],[\"pop\"]]", expectedDisplay: "[null,3,3]" }
    ]
  },
  {
    id: "prob_24",
    title: "Generate All Subsets",
    difficulty: "Medium",
    category: "Recursion & Backtracking",
    functionName: "subsets",
    statement: "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must be returned sorted.",
    examples: [
      { input: "nums = [1, 2]", output: "[[], [1], [1, 2], [2]]" }
    ],
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10"
    ],
    starterTemplates: {
      javascript: `function subsets(nums) {\n    // Write your solution here\n    \n}`,
      python: `def subsets(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        return new ArrayList<>();\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2]], expected: [[], [1], [1, 2], [2]], inputDisplay: "nums = [1,2]", expectedDisplay: "[[],[1],[1,2],[2]]" },
      { input: [[0]], expected: [[], [0]], inputDisplay: "nums = [0]", expectedDisplay: "[[],[0]]" }
    ],
    hiddenTestCases: [
      { input: [[]], expected: [[]], inputDisplay: "nums = []", expectedDisplay: "[[]]" },
      { input: [[3]], expected: [[], [3]], inputDisplay: "nums = [3]", expectedDisplay: "[[],[3]]" },
      { input: [[1, 2, 3]], expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]], inputDisplay: "nums = [1,2,3]", expectedDisplay: "[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]" },
      { input: [[-1, 1]], expected: [[], [-1], [-1, 1], [1]], inputDisplay: "nums = [-1,1]", expectedDisplay: "[[],[-1],[-1,1],[1]]" },
      { input: [[7, 8]], expected: [[], [7], [7, 8], [8]], inputDisplay: "nums = [7,8]", expectedDisplay: "[[],[7],[7,8],[8]]" }
    ]
  },
  {
    id: "prob_25",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    functionName: "maxArea",
    statement: "Given `n` non-negative integers `height` where each represents a point at coordinate `(i, height[i])`, find two lines that together with the x-axis form a container that contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    starterTemplates: {
      javascript: `function maxArea(height) {\n    // Write your solution here\n    \n}`,
      python: `def max_area(height):\n    pass`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, inputDisplay: "height = [1,8,6,2,5,4,8,3,7]", expectedDisplay: "49" },
      { input: [[1, 1]], expected: 1, inputDisplay: "height = [1,1]", expectedDisplay: "1" }
    ],
    hiddenTestCases: [
      { input: [[4, 3, 2, 1, 4]], expected: 16, inputDisplay: "height = [4,3,2,1,4]", expectedDisplay: "16" },
      { input: [[1, 2, 1]], expected: 2, inputDisplay: "height = [1,2,1]", expectedDisplay: "2" },
      { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17, inputDisplay: "height = [2,3,4,5,18,17,6]", expectedDisplay: "17" },
      { input: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]], expected: 25, inputDisplay: "height = [10,9,8,7,6,5,4,3,2,1]", expectedDisplay: "25" },
      { input: [[1, 100, 100, 1]], expected: 100, inputDisplay: "height = [1,100,100,1]", expectedDisplay: "100" }
    ]
  },
  {
    id: "prob_26",
    title: "Find Peak Element",
    difficulty: "Medium",
    category: "Binary Search",
    functionName: "findPeakElement",
    statement: "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element and return its index.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "2" },
      { input: "nums = [1,2,1,3,5,6,4]", output: "5" }
    ],
    constraints: [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    starterTemplates: {
      javascript: `function findPeakElement(nums) {\n    // Write your solution here\n    \n}`,
      python: `def find_peak_element(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int findPeakElement(int[] nums) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2, 3, 1]], expected: 2, inputDisplay: "nums = [1,2,3,1]", expectedDisplay: "2" },
      { input: [[1, 2, 1, 3, 5, 6, 4]], expected: 5, inputDisplay: "nums = [1,2,1,3,5,6,4]", expectedDisplay: "5" }
    ],
    hiddenTestCases: [
      { input: [[1]], expected: 0, inputDisplay: "nums = [1]", expectedDisplay: "0" },
      { input: [[2, 1]], expected: 0, inputDisplay: "nums = [2,1]", expectedDisplay: "0" },
      { input: [[1, 2]], expected: 1, inputDisplay: "nums = [1,2]", expectedDisplay: "1" },
      { input: [[1, 3, 2, 1]], expected: 1, inputDisplay: "nums = [1,3,2,1]", expectedDisplay: "1" },
      { input: [[10, 20, 15, 2, 23, 90, 67]], expected: 1, inputDisplay: "nums = [10,20,15,2,23,90,67]", expectedDisplay: "1" }
    ]
  },

  /* HARD CODING PROBLEMS (8 New: prob_27 to prob_34) */
  {
    id: "prob_27",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Sliding Window & Deque",
    functionName: "maxSlidingWindow",
    statement: "Given an array of integers `nums` and a sliding window of size `k` moving from left to right, return the max value in each window position.",
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= k <= nums.length"
    ],
    starterTemplates: {
      javascript: `function maxSlidingWindow(nums, k) {\n    // Write your solution here\n    \n}`,
      python: `def max_sliding_window(nums, k):\n    pass`,
      cpp: `class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        return {};\n    }\n};`,
      java: `class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        return new int[]{};\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], inputDisplay: "nums = [1,3,-1,-3,5,3,6,7], k = 3", expectedDisplay: "[3,3,5,5,6,7]" },
      { input: [[1], 1], expected: [1], inputDisplay: "nums = [1], k = 1", expectedDisplay: "[1]" }
    ],
    hiddenTestCases: [
      { input: [[1, -1], 1], expected: [1, -1], inputDisplay: "nums = [1,-1], k = 1", expectedDisplay: "[1,-1]" },
      { input: [[9, 11], 2], expected: [11], inputDisplay: "nums = [9,11], k = 2", expectedDisplay: "[11]" },
      { input: [[4, 2, 12, 11], 2], expected: [4, 12, 12], inputDisplay: "nums = [4,2,12,11], k = 2", expectedDisplay: "[4,12,12]" },
      { input: [[7, 2, 4], 2], expected: [7, 4], inputDisplay: "nums = [7,2,4], k = 2", expectedDisplay: "[7,4]" },
      { input: [[1, 3, 1, 2, 0, 5], 3], expected: [3, 3, 2, 5], inputDisplay: "nums = [1,3,1,2,0,5], k = 3", expectedDisplay: "[3,3,2,5]" }
    ]
  },
  {
    id: "prob_28",
    title: "Longest Increasing Subsequence",
    difficulty: "Hard",
    category: "Dynamic Programming",
    functionName: "lengthOfLIS",
    statement: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4" },
      { input: "nums = [0,1,0,3,2,3]", output: "4" }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    starterTemplates: {
      javascript: `function lengthOfLIS(nums) {\n    // Write your solution here\n    \n}`,
      python: `def length_of_lis(nums):\n    pass`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, inputDisplay: "nums = [10,9,2,5,3,7,101,18]", expectedDisplay: "4" },
      { input: [[0, 1, 0, 3, 2, 3]], expected: 4, inputDisplay: "nums = [0,1,0,3,2,3]", expectedDisplay: "4" }
    ],
    hiddenTestCases: [
      { input: [[7, 7, 7, 7, 7]], expected: 1, inputDisplay: "nums = [7,7,7,7,7]", expectedDisplay: "1" },
      { input: [[1]], expected: 1, inputDisplay: "nums = [1]", expectedDisplay: "1" },
      { input: [[4, 10, 4, 3, 8, 9]], expected: 3, inputDisplay: "nums = [4,10,4,3,8,9]", expectedDisplay: "3" },
      { input: [[1, 3, 6, 7, 9, 4, 10, 56]], expected: 6, inputDisplay: "nums = [1,3,6,7,9,4,10,56]", expectedDisplay: "6" },
      { input: [[3, 2, 1]], expected: 1, inputDisplay: "nums = [3,2,1]", expectedDisplay: "1" }
    ]
  },
  {
    id: "prob_29",
    title: "Word Break",
    difficulty: "Hard",
    category: "Dynamic Programming & Strings",
    functionName: "wordBreak",
    statement: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [
      { input: "s = \"leetcode\", wordDict = [\"leet\", \"code\"]", output: "true" }
    ],
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000"
    ],
    starterTemplates: {
      javascript: `function wordBreak(s, wordDict) {\n    // Write your solution here\n    \n}`,
      python: `def word_break(s, word_dict):\n    pass`,
      cpp: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        return false;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["leetcode", ["leet", "code"]], expected: true, inputDisplay: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", expectedDisplay: "true" },
      { input: ["applepenapple", ["apple", "pen"]], expected: true, inputDisplay: "s = \"applepenapple\", wordDict = [\"apple\",\"pen\"]", expectedDisplay: "true" }
    ],
    hiddenTestCases: [
      { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false, inputDisplay: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", expectedDisplay: "false" },
      { input: ["a", ["a"]], expected: true, inputDisplay: "s = \"a\", wordDict = [\"a\"]", expectedDisplay: "true" },
      { input: ["b", ["a"]], expected: false, inputDisplay: "s = \"b\", wordDict = [\"a\"]", expectedDisplay: "false" },
      { input: ["cars", ["car", "ca", "rs"]], expected: true, inputDisplay: "s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"]", expectedDisplay: "true" },
      { input: ["prepmind", ["prep", "mind"]], expected: true, inputDisplay: "s = \"prepmind\", wordDict = [\"prep\",\"mind\"]", expectedDisplay: "true" }
    ]
  },
  {
    id: "prob_30",
    title: "Number of Islands",
    difficulty: "Hard",
    category: "Graph & DFS/BFS",
    functionName: "numIslands",
    statement: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.",
    examples: [
      { input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300"
    ],
    starterTemplates: {
      javascript: `function numIslands(grid) {\n    // Write your solution here\n    \n}`,
      python: `def num_islands(grid):\n    pass`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]], expected: 1, inputDisplay: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", expectedDisplay: "1" },
      { input: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]], expected: 3, inputDisplay: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", expectedDisplay: "3" }
    ],
    hiddenTestCases: [
      { input: [[["0"]]], expected: 0, inputDisplay: "grid = [[\"0\"]]", expectedDisplay: "0" },
      { input: [[["1"]]], expected: 1, inputDisplay: "grid = [[\"1\"]]", expectedDisplay: "1" },
      { input: [[["1","0","1"],["0","1","0"],["1","0","1"]]], expected: 5, inputDisplay: "grid = [[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"0\",\"1\"]]", expectedDisplay: "5" },
      { input: [[["1","1"],["1","1"]]], expected: 1, inputDisplay: "grid = [[\"1\",\"1\"],[\"1\",\"1\"]]", expectedDisplay: "1" },
      { input: [[["0","0"],["0","0"]]], expected: 0, inputDisplay: "grid = [[\"0\",\"0\"],[\"0\",\"0\"]]", expectedDisplay: "0" }
    ]
  },
  {
    id: "prob_31",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "Trees & Recursion",
    functionName: "maxPathSum",
    statement: "A path in a binary tree is a sequence of nodes. Given a binary tree represented as a level-order array `treeArr` (where `null` indicates empty nodes), return the maximum path sum of any non-empty path.",
    examples: [
      { input: "treeArr = [1,2,3]", output: "6" },
      { input: "treeArr = [-10,9,20,null,null,15,7]", output: "42" }
    ],
    constraints: [
      "1 <= treeArr.length <= 3 * 10^4",
      "-1000 <= treeArr[i] <= 1000"
    ],
    starterTemplates: {
      javascript: `function maxPathSum(treeArr) {\n    // Write your solution here\n    \n}`,
      python: `def max_path_sum(tree_arr):\n    pass`,
      cpp: `class Solution {\npublic:\n    int maxPathSum(vector<int>& treeArr) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int maxPathSum(int[] treeArr) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 2, 3]], expected: 6, inputDisplay: "treeArr = [1,2,3]", expectedDisplay: "6" },
      { input: [[-10, 9, 20, null, null, 15, 7]], expected: 42, inputDisplay: "treeArr = [-10,9,20,null,null,15,7]", expectedDisplay: "42" }
    ],
    hiddenTestCases: [
      { input: [[-3]], expected: -3, inputDisplay: "treeArr = [-3]", expectedDisplay: "-3" },
      { input: [[2, -1]], expected: 2, inputDisplay: "treeArr = [2,-1]", expectedDisplay: "2" },
      { input: [[1, -2, 3]], expected: 4, inputDisplay: "treeArr = [1,-2,3]", expectedDisplay: "4" },
      { input: [[-2, 1, 3]], expected: 3, inputDisplay: "treeArr = [-2,1,3]", expectedDisplay: "3" },
      { input: [[10, 2, 10, 20, 1, null, -25, null, null, null, null, 3, 4]], expected: 42, inputDisplay: "treeArr = [10,2,10,20,1,null,-25,null,null,null,null,3,4]", expectedDisplay: "42" }
    ]
  },
  {
    id: "prob_32",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "Sliding Window & Strings",
    functionName: "minWindow",
    statement: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. Return `\"\"` if no such window exists.",
    examples: [
      { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" }
    ],
    constraints: [
      "m == s.length, n == t.length",
      "1 <= m, n <= 10^5"
    ],
    starterTemplates: {
      javascript: `function minWindow(s, t) {\n    // Write your solution here\n    \n}`,
      python: `def min_window(s, t):\n    pass`,
      cpp: `class Solution {\npublic:\n    string minWindow(string s, string t) {\n        return "";\n    }\n};`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}`
    },
    visibleTestCases: [
      { input: ["ADOBECODEBANC", "ABC"], expected: "BANC", inputDisplay: "s = \"ADOBECODEBANC\", t = \"ABC\"", expectedDisplay: "\"BANC\"" },
      { input: ["a", "a"], expected: "a", inputDisplay: "s = \"a\", t = \"a\"", expectedDisplay: "\"a\"" }
    ],
    hiddenTestCases: [
      { input: ["a", "aa"], expected: "", inputDisplay: "s = \"a\", t = \"aa\"", expectedDisplay: "\"\"" },
      { input: ["ab", "b"], expected: "b", inputDisplay: "s = \"ab\", t = \"b\"", expectedDisplay: "\"b\"" },
      { input: ["aa", "aa"], expected: "aa", inputDisplay: "s = \"aa\", t = \"aa\"", expectedDisplay: "\"aa\"" },
      { input: ["cabwefgewcwaefgcf", "cae"], expected: "cwaef", inputDisplay: "s = \"cabwefgewcwaefgcf\", t = \"cae\"", expectedDisplay: "\"cwaef\"" },
      { input: ["PREPMIND", "IND"], expected: "IND", inputDisplay: "s = \"PREPMIND\", t = \"IND\"", expectedDisplay: "\"IND\"" }
    ]
  },
  {
    id: "prob_33",
    title: "Edit Distance",
    difficulty: "Hard",
    category: "Dynamic Programming",
    functionName: "minDistance",
    statement: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (insert, delete, or replace character).",
    examples: [
      { input: "word1 = \"horse\", word2 = \"ros\"", output: "3" },
      { input: "word1 = \"intention\", word2 = \"execution\"", output: "5" }
    ],
    constraints: [
      "0 <= word1.length, word2.length <= 500"
    ],
    starterTemplates: {
      javascript: `function minDistance(word1, word2) {\n    // Write your solution here\n    \n}`,
      python: `def min_distance(word1, word2):\n    pass`,
      cpp: `class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int minDistance(String word1, String word2) {\n        return 0;\n    }\n}`
    },
    visibleTestCases: [
      { input: ["horse", "ros"], expected: 3, inputDisplay: "word1 = \"horse\", word2 = \"ros\"", expectedDisplay: "3" },
      { input: ["intention", "execution"], expected: 5, inputDisplay: "word1 = \"intention\", word2 = \"execution\"", expectedDisplay: "5" }
    ],
    hiddenTestCases: [
      { input: ["", ""], expected: 0, inputDisplay: "word1 = \"\", word2 = \"\"", expectedDisplay: "0" },
      { input: ["a", "b"], expected: 1, inputDisplay: "word1 = \"a\", word2 = \"b\"", expectedDisplay: "1" },
      { input: ["abc", ""], expected: 3, inputDisplay: "word1 = \"abc\", word2 = \"\"", expectedDisplay: "3" },
      { input: ["dinitrophenylhydrazine", "benzoldiphenylhydrazine"], expected: 7, inputDisplay: "word1 = \"dinitrophenylhydrazine\", word2 = \"benzoldiphenylhydrazine\"", expectedDisplay: "7" },
      { input: ["prep", "prep"], expected: 0, inputDisplay: "word1 = \"prep\", word2 = \"prep\"", expectedDisplay: "0" }
    ]
  },
  {
    id: "prob_34",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search & Advanced Arrays",
    functionName: "findMedianSortedArrays",
    statement: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.",
    examples: [
      { input: "nums1 = [1, 3], nums2 = [2]", output: "2.00000" },
      { input: "nums1 = [1, 2], nums2 = [3, 4]", output: "2.50000" }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000"
    ],
    starterTemplates: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n    // Write your solution here\n    \n}`,
      python: `def find_median_sorted_arrays(nums1, nums2):\n    pass`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        return 0.0;\n    }\n};`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}`
    },
    visibleTestCases: [
      { input: [[1, 3], [2]], expected: 2, inputDisplay: "nums1 = [1,3], nums2 = [2]", expectedDisplay: "2" },
      { input: [[1, 2], [3, 4]], expected: 2.5, inputDisplay: "nums1 = [1,2], nums2 = [3,4]", expectedDisplay: "2.5" }
    ],
    hiddenTestCases: [
      { input: [[0, 0], [0, 0]], expected: 0, inputDisplay: "nums1 = [0,0], nums2 = [0,0]", expectedDisplay: "0" },
      { input: [[], [1]], expected: 1, inputDisplay: "nums1 = [], nums2 = [1]", expectedDisplay: "1" },
      { input: [[2], []], expected: 2, inputDisplay: "nums1 = [2], nums2 = []", expectedDisplay: "2" },
      { input: [[1, 3, 5], [2, 4, 6]], expected: 3.5, inputDisplay: "nums1 = [1,3,5], nums2 = [2,4,6]", expectedDisplay: "3.5" },
      { input: [[10], [20, 30]], expected: 20, inputDisplay: "nums1 = [10], nums2 = [20,30]", expectedDisplay: "20" }
    ]
  }
];

const MOCK_APTITUDE_TESTS = [
  {
    id: "quant_1",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "Easy",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "150 metres", "180 metres", "324 metres"],
    answerIndex: 1,
    correctAnswer: "150 metres",
    explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length = Speed * Time = (50/3) * 9 = 150 metres."
  },
  {
    id: "quant_2",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Percentage",
    difficulty: "Easy",
    question: "If 20% of a number is 120, then what is 120% of that number?",
    options: ["600", "720", "480", "360"],
    answerIndex: 1,
    correctAnswer: "720",
    explanation: "Number = 120 / 0.20 = 600. 120% of 600 = 600 * 1.2 = 720."
  },
  {
    id: "logical_1",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Number Series",
    difficulty: "Easy",
    question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
    options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
    answerIndex: 1,
    correctAnswer: "(1/8)",
    explanation: "This is a simple division series. Each number is half of the previous number: (1/4) / 2 = 1/8."
  },
  {
    id: "logical_2",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Alphabet Series",
    difficulty: "Easy",
    question: "SCD, TEF, UGH, ____, WKL. Which pattern fills the blank?",
    options: ["CMN", "UJI", "VIJ", "IJT"],
    answerIndex: 2,
    correctAnswer: "VIJ",
    explanation: "First letters: S, T, U, V, W. Second letters: C, E, G, I, K. Third letters: D, F, H, J, L. Result: VIJ."
  },
  {
    id: "verbal_1",
    section: "Verbal Ability",
    category: "Verbal Ability",
    topic: "Antonyms",
    difficulty: "Easy",
    question: "Select the antonym for the word 'METICULOUS':",
    options: ["Careful", "Careless", "Thorough", "Detailed"],
    answerIndex: 1,
    correctAnswer: "Careless",
    explanation: "Meticulous means taking or showing extreme care about minute details; Careless is the exact opposite."
  },
  {
    id: "verbal_2",
    section: "Verbal Ability",
    category: "Verbal Ability",
    topic: "Grammar",
    difficulty: "Easy",
    question: "Identify the correct sentence structure:",
    options: [
      "Neither the manager nor the employees was present.",
      "Neither the manager nor the employees were present.",
      "Neither the manager or the employees was present.",
      "Neither manager nor employees is present."
    ],
    answerIndex: 1,
    correctAnswer: "Neither the manager nor the employees were present.",
    explanation: "When using 'neither... nor', the verb agrees with the subject closest to it ('employees' is plural -> 'were')."
  },

  /* 30 NEW APTITUDE QUESTIONS (aptitude_001 to aptitude_030) */

  /* Quantitative Aptitude (18 Questions) */
  {
    id: "aptitude_001",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Percentage",
    difficulty: "Easy",
    question: "If the price of sugar increases by 25%, by what percentage must a household reduce its consumption so that the total expenditure remains unchanged?",
    options: ["15%", "20%", "25%", "30%"],
    answerIndex: 1,
    correctAnswer: "20%",
    explanation: "Let original price = 100 and consumption = 100. Expenditure = 10,000. New price = 125. New consumption required = 10,000 / 125 = 80. Reduction = 100 - 80 = 20%. Formula: (r / (100 + r)) * 100 = (25 / 125) * 100 = 20%."
  },
  {
    id: "aptitude_002",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Percentage",
    difficulty: "Medium",
    question: "In a diagnostic test, 35% of candidates failed in Mathematics and 25% failed in English. If 10% failed in both subjects, what percentage passed in both subjects?",
    options: ["45%", "50%", "55%", "60%"],
    answerIndex: 1,
    correctAnswer: "50%",
    explanation: "Percentage of candidates who failed in at least one subject = % Failed Math + % Failed English - % Failed Both = 35% + 25% - 10% = 50%. Therefore, percentage who passed both = 100% - 50% = 50%."
  },
  {
    id: "aptitude_003",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Percentage",
    difficulty: "Hard",
    question: "The population of a city increases by 10% in the first year and decreases by 10% in the second year. If the population at the end of 2 years is 9,900, what was the initial population?",
    options: ["9,800", "10,000", "10,200", "10,500"],
    answerIndex: 1,
    correctAnswer: "10,000",
    explanation: "Let initial population = P. After Year 1: 1.10 * P. After Year 2: 1.10 * 0.90 * P = 0.99 * P. Given 0.99 * P = 9,900 => P = 9,900 / 0.99 = 10,000."
  },
  {
    id: "aptitude_004",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Profit & Loss",
    difficulty: "Easy",
    question: "A merchant sells a laptop bag for Rs. 480 making a loss of 20%. At what price should he sell it to earn a profit of 20%?",
    options: ["Rs. 600", "Rs. 720", "Rs. 680", "Rs. 750"],
    answerIndex: 1,
    correctAnswer: "Rs. 720",
    explanation: "Selling Price at 20% loss = 80% of Cost Price (CP) = 480 => CP = 480 / 0.8 = Rs. 600. To earn 20% profit, Selling Price = 120% of 600 = 1.2 * 600 = Rs. 720."
  },
  {
    id: "aptitude_005",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Profit & Loss",
    difficulty: "Medium",
    question: "The cost price of 16 articles is equal to the selling price of 12 articles. What is the profit percentage?",
    options: ["25%", "33.33%", "40%", "50%"],
    answerIndex: 1,
    correctAnswer: "33.33%",
    explanation: "Let CP of 1 article = Re 1. CP of 16 articles = Rs 16. SP of 12 articles = Rs 16 => SP of 1 article = 16/12 = 4/3. Profit per article = 4/3 - 1 = 1/3. Profit % = ((1/3) / 1) * 100 = 33.33%."
  },
  {
    id: "aptitude_006",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Ratio & Proportion",
    difficulty: "Easy",
    question: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each number, their ratio becomes 12 : 23. What is the smaller number?",
    options: ["27", "33", "36", "45"],
    answerIndex: 1,
    correctAnswer: "33",
    explanation: "Let the numbers be 3x and 5x. Given (3x - 9) / (5x - 9) = 12 / 23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33."
  },
  {
    id: "aptitude_007",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Ratio & Proportion",
    difficulty: "Medium",
    question: "A sum of Rs. 1,300 is divided among A, B, C, and D such that A's share / B's share = B's share / C's share = C's share / D's share = 2/3. What is A's share?",
    options: ["Rs. 160", "Rs. 240", "Rs. 360", "Rs. 540"],
    answerIndex: 0,
    correctAnswer: "Rs. 160",
    explanation: "Ratios: A:B = 2:3, B:C = 2:3, C:D = 2:3. Combining gives A:B:C:D = 8 : 12 : 18 : 27. Total parts = 8 + 12 + 18 + 27 = 65. A's share = (8 / 65) * 1300 = Rs. 160."
  },
  {
    id: "aptitude_008",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Average",
    difficulty: "Easy",
    question: "The average weight of a class of 24 students is 35 kg. If the weight of the class teacher is included, the average increases by 0.4 kg (400 grams). What is the weight of the teacher?",
    options: ["43 kg", "45 kg", "47 kg", "50 kg"],
    answerIndex: 1,
    correctAnswer: "45 kg",
    explanation: "Total weight of 24 students = 24 * 35 = 840 kg. New average for 25 people = 35 + 0.4 = 35.4 kg. Total weight of 25 people = 25 * 35.4 = 885 kg. Teacher's weight = 885 - 840 = 45 kg."
  },
  {
    id: "aptitude_009",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Average",
    difficulty: "Medium",
    question: "The average of 5 consecutive odd numbers A, B, C, D, and E is 37. What is the product of A and E?",
    options: ["1295", "1333", "1365", "1425"],
    answerIndex: 1,
    correctAnswer: "1333",
    explanation: "For 5 consecutive odd numbers, the average is the middle number C = 37. The numbers are 33, 35, 37, 39, 41. Thus A = 33 and E = 41. Product A * E = 33 * 41 = 1333."
  },
  {
    id: "aptitude_010",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Time & Work",
    difficulty: "Easy",
    question: "A can complete a task in 12 days and B can complete the same task in 24 days. Working together, in how many days will they finish the task?",
    options: ["6 days", "8 days", "9 days", "10 days"],
    answerIndex: 1,
    correctAnswer: "8 days",
    explanation: "A's 1-day work = 1/12. B's 1-day work = 1/24. Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8. Total time = 8 days."
  },
  {
    id: "aptitude_011",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Time & Work",
    difficulty: "Medium",
    question: "A and B can complete a work in 10 days and 15 days respectively. They work together for 4 days and then A leaves. How many days will B take to complete the remaining work alone?",
    options: ["4 days", "5 days", "6 days", "7 days"],
    answerIndex: 1,
    correctAnswer: "5 days",
    explanation: "Combined 1-day work = 1/10 + 1/15 = 5/30 = 1/6. In 4 days, work completed = 4 * (1/6) = 2/3. Remaining work = 1 - 2/3 = 1/3. B's rate = 1/15 per day. Time B takes = (1/3) / (1/15) = 5 days."
  },
  {
    id: "aptitude_012",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "Easy",
    question: "A car covers a distance of 300 km in 5 hours. If its speed is increased by 20 km/hr, how much time will it take to cover the same distance?",
    options: ["3.25 hours", "3.75 hours", "4 hours", "4.5 hours"],
    answerIndex: 1,
    correctAnswer: "3.75 hours",
    explanation: "Original speed = 300 / 5 = 60 km/hr. Increased speed = 60 + 20 = 80 km/hr. New time = 300 / 80 = 3.75 hours (3 hours 45 mins)."
  },
  {
    id: "aptitude_013",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Time, Speed & Distance",
    difficulty: "Medium",
    question: "Two trains of length 140 m and 160 m move towards each other on parallel tracks at speeds of 60 km/hr and 48 km/hr. In how many seconds will they completely cross each other?",
    options: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"],
    answerIndex: 1,
    correctAnswer: "10 seconds",
    explanation: "Total distance = 140 + 160 = 300 m. Relative speed in opposite direction = 60 + 48 = 108 km/hr = 108 * (5/18) = 30 m/s. Time = 300 / 30 = 10 seconds."
  },
  {
    id: "aptitude_014",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Simple Interest",
    difficulty: "Easy",
    question: "What principal sum of money will amount to Rs. 5,200 in 3 years at 10% per annum simple interest?",
    options: ["Rs. 3,800", "Rs. 4,000", "Rs. 4,200", "Rs. 4,400"],
    answerIndex: 1,
    correctAnswer: "Rs. 4,000",
    explanation: "Amount A = P(1 + RT/100) => 5200 = P(1 + (10 * 3)/100) => 5200 = 1.3P => P = 5200 / 1.3 = Rs. 4,000."
  },
  {
    id: "aptitude_015",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Compound Interest",
    difficulty: "Medium",
    question: "What is the compound interest earned on Rs. 10,000 for 2 years at 10% per annum compounded annually?",
    options: ["Rs. 2,000", "Rs. 2,100", "Rs. 2,200", "Rs. 2,500"],
    answerIndex: 1,
    correctAnswer: "Rs. 2,100",
    explanation: "Amount = P(1 + R/100)^2 = 10000 * (1.1)^2 = 10000 * 1.21 = Rs. 12,100. Compound Interest = 12,100 - 10,000 = Rs. 2,100."
  },
  {
    id: "aptitude_016",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Number System",
    difficulty: "Easy",
    question: "Which of the following numbers is completely divisible by 11?",
    options: ["154382", "4832718", "9724", "89352"],
    answerIndex: 2,
    correctAnswer: "9724",
    explanation: "Divisibility rule of 11: Difference between sum of odd-place digits and even-place digits must be 0 or divisible by 11. For 9724: (9 + 2) - (7 + 4) = 11 - 11 = 0."
  },
  {
    id: "aptitude_017",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Number System",
    difficulty: "Medium",
    question: "Find the unit digit of (7^95 - 3^58).",
    options: ["0", "4", "6", "7"],
    answerIndex: 1,
    correctAnswer: "4",
    explanation: "Cyclicity of 7 is 4: 95 mod 4 = 3 => 7^3 ends in 3. Cyclicity of 3 is 4: 58 mod 4 = 2 => 3^2 ends in 9. Unit digit = 13 - 9 = 4."
  },
  {
    id: "aptitude_018",
    section: "Quantitative",
    category: "Quantitative Aptitude",
    topic: "Probability",
    difficulty: "Medium",
    question: "Two fair dice are thrown simultaneously. What is the probability that the sum of numbers obtained is 8?",
    options: ["5/36", "1/6", "7/36", "1/9"],
    answerIndex: 0,
    correctAnswer: "5/36",
    explanation: "Total possible outcomes = 6 * 6 = 36. Favorable outcomes summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) = 5 outcomes. Probability = 5/36."
  },

  /* Logical Reasoning (12 Questions) */
  {
    id: "aptitude_019",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Number Series",
    difficulty: "Easy",
    question: "Find the missing number in the series: 7, 10, 16, 25, 37, __",
    options: ["48", "50", "52", "55"],
    answerIndex: 2,
    correctAnswer: "52",
    explanation: "Consecutive differences: 10-7=3, 16-10=6, 25-16=9, 37-25=12. The differences increase by 3 each step. Next difference = 15. Next term = 37 + 15 = 52."
  },
  {
    id: "aptitude_020",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Number Series",
    difficulty: "Medium",
    question: "Identify the missing term in the sequence: 4, 9, 25, 49, 121, __, 289",
    options: ["144", "169", "196", "225"],
    answerIndex: 1,
    correctAnswer: "169",
    explanation: "Terms are squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. Next prime is 13, so 13^2 = 169."
  },
  {
    id: "aptitude_021",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Alphabet Series",
    difficulty: "Easy",
    question: "Complete the letter series: BZA, DYC, FXE, __, JVI",
    options: ["HWG", "HVF", "HWF", "GWH"],
    answerIndex: 0,
    correctAnswer: "HWG",
    explanation: "First letters: B (+2) -> D (+2) -> F (+2) -> H (+2) -> J. Second letters: Z (-1) -> Y (-1) -> X (-1) -> W (-1) -> V. Third letters: A (+2) -> C (+2) -> E (+2) -> G (+2) -> I. Result = HWG."
  },
  {
    id: "aptitude_022",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Coding-Decoding",
    difficulty: "Easy",
    question: "In a certain code language, 'SYSTEM' is coded as 'SYSMET' and 'NEARER' as 'AENRER'. How is 'FRACTION' coded?",
    options: ["CARFNOIT", "NOITCARF", "ARFCNOIT", "FRACNOIT"],
    answerIndex: 0,
    correctAnswer: "CARFNOIT",
    explanation: "The 8-letter word is split into two halves of 4 letters: 'FRAC' and 'TION'. Each half is reversed individually: 'FRAC' -> 'CARF', 'TION' -> 'NOIT'. Combined = CARFNOIT."
  },
  {
    id: "aptitude_023",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Coding-Decoding",
    difficulty: "Medium",
    question: "If 'MONKEY' is coded as 'XDJMNL', how is 'TIGER' coded in that language?",
    options: ["QDFHS", "SDFHS", "SHFDQ", "QDFHT"],
    answerIndex: 0,
    correctAnswer: "QDFHS",
    explanation: "Each letter is shifted one position backward (-1) and then reversed. T->S, I->H, G->F, E->D, R->Q => 'SHFDQ' reversed is 'QDFHS'."
  },
  {
    id: "aptitude_024",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Blood Relations",
    difficulty: "Medium",
    question: "Pointing to a photograph, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose photograph was it?",
    options: ["His father's", "His son's", "His own", "His nephew's"],
    answerIndex: 1,
    correctAnswer: "His son's",
    explanation: "Since the speaker has no siblings, 'my father's son' is the speaker himself. Thus 'that man's father is myself', meaning the photograph is of his son."
  },
  {
    id: "aptitude_025",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Direction Sense",
    difficulty: "Medium",
    question: "A person walks 10 km North, turns right and walks 6 km, then turns right again and walks 18 km. How far and in which direction is he from the starting point?",
    options: ["10 km South-East", "10 km North-East", "12 km South-East", "8 km South"],
    answerIndex: 0,
    correctAnswer: "10 km South-East",
    explanation: "Net displacement: East = 6 km, South = (18 - 10) = 8 km. Distance = sqrt(6^2 + 8^2) = sqrt(100) = 10 km. Direction from start = South-East."
  },
  {
    id: "aptitude_026",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Syllogism",
    difficulty: "Easy",
    question: "Statements: All cats are dogs. All dogs are birds. Conclusions: I. All cats are birds. II. All birds are cats.",
    options: ["Only Conclusion I follows", "Only Conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
    answerIndex: 0,
    correctAnswer: "Only Conclusion I follows",
    explanation: "Cats subset Dogs subset Birds implies All cats are birds (Conclusion I is valid). However, not all birds are necessarily cats (Conclusion II does not follow)."
  },
  {
    id: "aptitude_027",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Syllogism",
    difficulty: "Medium",
    question: "Statements: Some books are pens. All pens are pencils. Conclusions: I. Some books are pencils. II. No pencil is a book.",
    options: ["Only Conclusion I follows", "Only Conclusion II follows", "Either I or II follows", "Neither I nor II follows"],
    answerIndex: 0,
    correctAnswer: "Only Conclusion I follows",
    explanation: "Books overlap with Pens, and all Pens lie inside Pencils. Therefore, the portion of Books that are Pens are also Pencils. Thus Conclusion I is definitely true."
  },
  {
    id: "aptitude_028",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Analogy",
    difficulty: "Easy",
    question: "Ocean : Water :: Glacier : ?",
    options: ["Mountain", "Ice", "River", "Cave"],
    answerIndex: 1,
    correctAnswer: "Ice",
    explanation: "An ocean is a large body of water; a glacier is a large body of ice."
  },
  {
    id: "aptitude_029",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Odd One Out",
    difficulty: "Easy",
    question: "Choose the word which is odd one out among the following geometric figures:",
    options: ["Square", "Triangle", "Cube", "Rectangle"],
    answerIndex: 2,
    correctAnswer: "Cube",
    explanation: "Square, Triangle, and Rectangle are 2-dimensional plane figures, whereas Cube is a 3-dimensional solid figure."
  },
  {
    id: "aptitude_030",
    section: "Logical Reasoning",
    category: "Logical Reasoning",
    topic: "Seating Arrangement",
    difficulty: "Medium",
    question: "Five friends A, B, C, D, E are sitting in a row facing North. A is to the immediate left of B and immediate right of C. E is at the extreme right end and D is next to E. Who is sitting in the middle?",
    options: ["A", "B", "C", "D"],
    answerIndex: 1,
    correctAnswer: "B",
    explanation: "E is at pos 5 (right end), D is at pos 4. C-A-B occupies positions 1, 2, 3. The full order from left to right is C, A, B, D, E. B is sitting at position 3 (the middle)."
  }
];

const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: "int_hr_1",
    type: "HR",
    role: "General Software Engineer",
    question: "Tell me about a time when you faced a difficult technical challenge on a project and how you resolved it.",
    rubric: "Look for STAR method (Situation, Task, Action, Result), problem solving methodology, ownership, and clear communication."
  },
  {
    id: "int_tech_1",
    type: "Technical",
    role: "Frontend Engineer",
    question: "Explain how the Event Loop works in JavaScript, including microtasks vs macrotasks.",
    rubric: "Needs to explain single-threaded call stack, Web APIs, Task Queue (setTimeout), Microtask Queue (Promises), and how tick process works."
  },
  {
    id: "int_tech_2",
    type: "Technical",
    role: "Backend Engineer",
    question: "How do you handle database concurrency and prevent race conditions in a high-traffic REST service?",
    rubric: "Key concepts: Transactions, Optimistic/Pessimistic locking, Redis distributed locks, rate limiting, and idempotent APIs."
  },
  {
    id: "int_sys_1",
    type: "System Design",
    role: "Full Stack Engineer",
    question: "How would you design a real-time collaborative document editing system like Google Docs?",
    rubric: "Architecture components: WebSockets, Operational Transformation (OT) or CRDTs, Redis Pub/Sub, DB storage layer, snapshotting."
  }
];

const MOCK_CAREER_ROLES = [
  {
    title: "Full Stack Developer",
    matchScore: 92,
    avgSalary: "$95,000 - $135,000 / year",
    demandedSkills: ["React.js", "Node.js", "MongoDB / PostgreSQL", "REST APIs", "System Design"],
    missingSkills: ["Docker & CI/CD", "Redis Caching"],
    recommendedCourses: [
      "Advanced MERN Stack Architecture",
      "System Design & Scalability Principles"
    ],
    topCompanies: ["Google", "Amazon", "Uber", "Stripe", "Postman"]
  },
  {
    title: "Frontend Specialist",
    matchScore: 88,
    avgSalary: "$85,000 - $120,000 / year",
    demandedSkills: ["JavaScript ES6+", "React", "CSS3 / Design Systems", "Web Performance", "State Management"],
    missingSkills: ["WebSockets / Realtime UI", "TypeScript Deep Dive"],
    recommendedCourses: [
      "Modern Web Architecture & Performance Optimization",
      "TypeScript Mastery for Enterprise React"
    ],
    topCompanies: ["Vercel", "Meta", "Airbnb", "Shopify", "Figma"]
  },
  {
    title: "Backend & Cloud Engineer",
    matchScore: 81,
    avgSalary: "$100,000 - $145,000 / year",
    demandedSkills: ["Node.js / Express", "Distributed Systems", "SQL & NoSQL DBs", "API Security", "Microservices"],
    missingSkills: ["Kubernetes", "gRPC Protocol"],
    recommendedCourses: [
      "Node.js High Performance Backend Architecture",
      "AWS Cloud Practitioner & Docker Fundamentals"
    ],
    topCompanies: ["Microsoft", "Datadog", "Cloudflare", "Atlassian", "MongoDB"]
  },
  {
    title: "Data Analyst / BI Engineer",
    matchScore: 74,
    avgSalary: "$75,000 - $110,000 / year",
    demandedSkills: ["Python", "Advanced SQL", "Data Visualization", "Statistics", "PowerBI / Tableau"],
    missingSkills: ["Pandas / NumPy Data Cleaning", "A/B Testing Frameworks"],
    recommendedCourses: [
      "Data Analytics & Machine Learning Basics with Python",
      "Mastering SQL Queries & Data Pipelines"
    ],
    topCompanies: ["Deloitte", "McKinsey", "Netflix", "Snowflake", "Palantir"]
  }
];

const memUsers = [];

module.exports = {
  MOCK_CODING_PROBLEMS,
  MOCK_APTITUDE_TESTS,
  MOCK_INTERVIEW_QUESTIONS,
  MOCK_CAREER_ROLES,
  memUsers
};
