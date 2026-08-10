// Seed & Data Service with mock data and in-memory store fallback

const MOCK_CODING_PROBLEMS = [
  {
    id: "prob_1",
    title: "Two Sum Target Pair",
    difficulty: "Easy",
    category: "Arrays & Hashes",
    statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};`,
      java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}`
    },
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3,2,4], target = 6", expected: "[1, 2]" },
      { input: "nums = [3,3], target = 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "prob_2",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    statement: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      { input: "s = \"()[]{}\"", output: "true" },
      { input: "s = \"(]\"", output: "false" }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    // Write your solution here\n    \n}`,
      python: `def is_valid(s: str) -> bool:\n    # Write your solution here\n    pass`,
      cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return false;\n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}`
    },
    testCases: [
      { input: "s = \"()[]{}\"", expected: "true" },
      { input: "s = \"([)]\"", expected: "false" },
      { input: "s = \"{[]}\"", expected: "true" }
    ]
  },
  {
    id: "prob_3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: "s = \"abcabcbb\"", output: "3 (abc)" },
      { input: "s = \"bbbbb\"", output: "1 (b)" }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    // Write your solution here\n    \n}`,
      python: `def length_of_longest_substring(s: str) -> int:\n    # Write your solution here\n    pass`,
      cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}`
    },
    testCases: [
      { input: "s = \"abcabcbb\"", expected: "3" },
      { input: "s = \"bbbbb\"", expected: "1" },
      { input: "s = \"pwwkew\"", expected: "3" }
    ]
  },
  {
    id: "prob_4",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Two Pointers",
    statement: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
    ],
    starterTemplates: {
      javascript: `/**\n * @param {number[]} height\n * @return {number}\n */\nfunction trap(height) {\n    // Write your solution here\n    \n}`,
      python: `def trap(height: list[int]) -> int:\n    # Write your solution here\n    pass`,
      cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};`,
      java: `class Solution {\n    public int trap(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}`
    },
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "height = [4,2,0,3,2,5]", expected: "9" }
    ]
  }
];

const MOCK_APTITUDE_TESTS = [
  {
    id: "quant_1",
    section: "Quantitative",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    options: ["120 metres", "150 metres", "180 metres", "324 metres"],
    answerIndex: 1,
    explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Length = Speed * Time = (50/3) * 9 = 150 metres."
  },
  {
    id: "quant_2",
    section: "Quantitative",
    question: "If 20% of a number is 120, then what is 120% of that number?",
    options: ["600", "720", "480", "360"],
    answerIndex: 1,
    explanation: "Number = 120 / 0.20 = 600. 120% of 600 = 600 * 1.2 = 720."
  },
  {
    id: "logical_1",
    section: "Logical Reasoning",
    question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
    options: ["(1/3)", "(1/8)", "(2/8)", "(1/16)"],
    answerIndex: 1,
    explanation: "This is a simple division series. Each number is half of the previous number: (1/4) / 2 = 1/8."
  },
  {
    id: "logical_2",
    section: "Logical Reasoning",
    question: "SCD, TEF, UGH, ____, WKL. Which pattern fills the blank?",
    options: ["CMN", "UJI", "VIJ", "IJT"],
    answerIndex: 2,
    explanation: "First letters: S, T, U, V, W. Second letters: C, E, G, I, K. Third letters: D, F, H, J, L. Result: VIJ."
  },
  {
    id: "verbal_1",
    section: "Verbal Ability",
    question: "Select the antonym for the word 'METICULOUS':",
    options: ["Careful", "Careless", "Thorough", "Detailed"],
    answerIndex: 1,
    explanation: "Meticulous means taking or showing extreme care about minute details; Careless is the exact opposite."
  },
  {
    id: "verbal_2",
    section: "Verbal Ability",
    question: "Identify the correct sentence structure:",
    options: [
      "Neither the manager nor the employees was present.",
      "Neither the manager nor the employees were present.",
      "Neither the manager or the employees was present.",
      "Neither manager nor employees is present."
    ],
    answerIndex: 1,
    explanation: "When using 'neither... nor', the verb agrees with the subject closest to it ('employees' is plural -> 'were')."
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
