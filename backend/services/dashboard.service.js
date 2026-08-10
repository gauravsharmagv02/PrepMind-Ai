const mongoose = require('mongoose');
const Performance = require('../models/Performance');

// Helper to calculate weighted placement readiness score
function calculateReadiness(perf) {
  if (!perf || !perf.overall || !perf.overall.hasActivity) {
    return null; // Return null for brand new users with 0 activity
  }

  const codingScore = perf.coding?.score || 0;
  const aptitudeScore = perf.aptitude?.score || 0;
  const interviewScore = perf.interview?.score || 0;
  const resumeScore = perf.resume?.atsScore || 0;

  const weighted =
    codingScore * 0.35 +
    aptitudeScore * 0.25 +
    interviewScore * 0.25 +
    resumeScore * 0.15;

  return Math.round(weighted);
}

// Helper to dynamically calculate key strengths & focus areas
function evaluateDiagnosis(perf) {
  const strengths = [];
  const weaknesses = [];

  if (!perf || !perf.overall || !perf.overall.hasActivity) {
    return {
      strengths: ['Diagnostic Assessment Pending'],
      weaknesses: ['Complete your first practice module to identify weak areas']
    };
  }

  // Coding evaluation
  if ((perf.coding?.score || 0) >= 75 || (perf.coding?.accuracy || 0) >= 75) {
    strengths.push('Coding Fundamentals');
    strengths.push('Data Structures & Algorithms');
  } else if ((perf.coding?.attempted || 0) > 0) {
    weaknesses.push('Algorithm Problem Solving');
  } else {
    weaknesses.push('Coding Practice');
  }

  // Aptitude evaluation
  if ((perf.aptitude?.score || 0) >= 75) {
    strengths.push('Logical & Quantitative Reasoning');
  } else if ((perf.aptitude?.testsAttempted || 0) > 0) {
    weaknesses.push('Quantitative Speed Shortcuts');
  } else {
    weaknesses.push('Aptitude Diagnostics');
  }

  // Interview evaluation
  if ((perf.interview?.score || 0) >= 75) {
    strengths.push('Technical Communication & STAR Method');
  } else if ((perf.interview?.completed || 0) > 0) {
    weaknesses.push('Interview Articulation & Edge Cases');
  } else {
    weaknesses.push('AI Mock Interview');
  }

  // Resume evaluation
  if ((perf.resume?.atsScore || 0) >= 80) {
    strengths.push('ATS Resume Keyword Optimization');
  } else if (perf.resume?.uploaded) {
    weaknesses.push('Resume Action Verbs & Metrics');
  } else {
    weaknesses.push('ATS Resume Upload');
  }

  if (strengths.length === 0) strengths.push('Problem Solving Basics');
  if (weaknesses.length === 0) weaknesses.push('Advanced System Design');

  return { strengths, weaknesses };
}

// Helper to generate personalized 7-Day AI Study Plan tailored to weak areas
function generatePersonalizedStudyPlan(userGoal, perf) {
  const plan = [];
  let dayCounter = 1;

  const codingScore = perf?.coding?.score || 0;
  const aptitudeScore = perf?.aptitude?.score || 0;
  const interviewScore = perf?.interview?.score || 0;
  const resumeScore = perf?.resume?.atsScore || 0;

  // Day 1: Aptitude or Coding depending on lowest
  if (aptitudeScore < 70) {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Quantitative Speed & Time Diagnostics',
      category: 'Aptitude',
      duration: '30 mins',
      status: 'pending'
    });
  } else {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Solve 2 Arrays & Two Pointers Challenges',
      category: 'Coding',
      duration: '45 mins',
      status: 'pending'
    });
  }

  // Day 2: Coding focus
  if (codingScore < 70) {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Practice Stack & String Problem Solving',
      category: 'Coding',
      duration: '45 mins',
      status: 'pending'
    });
  } else {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Medium Difficulty Sliding Window Patterns',
      category: 'Coding',
      duration: '50 mins',
      status: 'pending'
    });
  }

  // Day 3: Resume
  if (!perf?.resume?.uploaded || resumeScore < 80) {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Upload & Parse Resume for ATS Compatibility',
      category: 'Resume',
      duration: '20 mins',
      status: 'pending'
    });
  } else {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Optimize Resume Bullet Points with Quantifiable Metrics',
      category: 'Resume',
      duration: '20 mins',
      status: 'pending'
    });
  }

  // Day 4: Interview
  if (interviewScore < 75) {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Complete HR Behavioral STAR Method Interview',
      category: 'Interview',
      duration: '25 mins',
      status: 'pending'
    });
  } else {
    plan.push({
      id: `task_${dayCounter}`,
      day: dayCounter++,
      title: 'Practice Technical System Architecture Interview',
      category: 'Interview',
      duration: '35 mins',
      status: 'pending'
    });
  }

  // Day 5: Logical Reasoning
  plan.push({
    id: `task_${dayCounter}`,
    day: dayCounter++,
    title: 'Logical Series & Verbal Ability Assessment',
    category: 'Aptitude',
    duration: '30 mins',
    status: 'pending'
  });

  // Day 6: Advanced Coding
  plan.push({
    id: `task_${dayCounter}`,
    day: dayCounter++,
    title: 'Dynamic Programming & Graph Fundamentals',
    category: 'Coding',
    duration: '50 mins',
    status: 'pending'
  });

  // Day 7: Full Mock Review
  plan.push({
    id: `task_${dayCounter}`,
    day: dayCounter++,
    title: 'Full Technical Mock Interview & AI Review',
    category: 'Interview',
    duration: '40 mins',
    status: 'pending'
  });

  return plan;
}

// Log recent activity entry
function appendRecentActivity(perfDoc, type, title, resultText) {
  if (!perfDoc.recentActivity) perfDoc.recentActivity = [];
  
  perfDoc.recentActivity.unshift({
    id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    type,
    title,
    resultText,
    timestamp: new Date()
  });

  // Keep latest 15 activities
  if (perfDoc.recentActivity.length > 15) {
    perfDoc.recentActivity = perfDoc.recentActivity.slice(0, 15);
  }
}

// Retrieve or create user performance document
async function getUserPerformanceDoc(userId) {
  let perf = await Performance.findOne({ userId });
  if (!perf) {
    perf = new Performance({
      userId,
      coding: { attempted: 0, solved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0, score: 0, accuracy: 0, streak: 0 },
      aptitude: { testsAttempted: 0, questionsAttempted: 0, questionsCorrect: 0, score: 0, accuracy: 0 },
      interview: { completed: 0, score: 0, technicalScore: 0, communicationScore: 0, confidenceScore: 0 },
      resume: { uploaded: false, atsScore: 0, formattingScore: 0 },
      overall: { placementReadiness: null, hasActivity: false, streak: 0 },
      strengths: [],
      weaknesses: [],
      studyPlan: [],
      recentActivity: []
    });
    perf.studyPlan = generatePersonalizedStudyPlan('Software Engineer', perf);
    const diagnosis = evaluateDiagnosis(perf);
    perf.strengths = diagnosis.strengths;
    perf.weaknesses = diagnosis.weaknesses;
    await perf.save();
  } else if (!perf.studyPlan || perf.studyPlan.length === 0) {
    perf.studyPlan = generatePersonalizedStudyPlan('Software Engineer', perf);
    await perf.save();
  }
  return perf;
}

// Service: Get formatted dashboard payload for authenticated user
async function getUserDashboardData(user) {
  const userId = user._id ? user._id.toString() : user.id;
  const perf = await getUserPerformanceDoc(userId);

  // Recalculate readiness
  const readiness = calculateReadiness(perf);
  perf.overall.placementReadiness = readiness;
  
  const diagnosis = evaluateDiagnosis(perf);
  perf.strengths = diagnosis.strengths;
  perf.weaknesses = diagnosis.weaknesses;

  await perf.save();

  return {
    success: true,
    user: {
      id: userId,
      name: user.name,
      email: user.email,
      targetRole: user.targetRole || user.goal || 'Software Engineer',
      goal: user.goal || 'Software Engineer'
    },
    scores: {
      placementReadiness: readiness, // null if brand new user
      coding: perf.coding.score || (perf.coding.solved > 0 ? perf.coding.score : 0),
      aptitude: perf.aptitude.score || 0,
      interview: perf.interview.score || 0,
      resume: perf.resume.atsScore || 0
    },
    coding: {
      solved: perf.coding.solved || 0,
      attempted: perf.coding.attempted || 0,
      easySolved: perf.coding.easySolved || 0,
      mediumSolved: perf.coding.mediumSolved || 0,
      hardSolved: perf.coding.hardSolved || 0,
      score: perf.coding.score || 0,
      accuracy: perf.coding.accuracy || 0,
      streak: perf.coding.streak || 0
    },
    aptitude: {
      testsAttempted: perf.aptitude.testsAttempted || 0,
      questionsAttempted: perf.aptitude.questionsAttempted || 0,
      questionsCorrect: perf.aptitude.questionsCorrect || 0,
      score: perf.aptitude.score || 0,
      accuracy: perf.aptitude.accuracy || 0
    },
    interview: {
      completed: perf.interview.completed || 0,
      score: perf.interview.score || 0,
      technicalScore: perf.interview.technicalScore || 0,
      communicationScore: perf.interview.communicationScore || 0,
      confidenceScore: perf.interview.confidenceScore || 0
    },
    resume: {
      uploaded: perf.resume.uploaded || false,
      atsScore: perf.resume.atsScore || 0,
      formattingScore: perf.resume.formattingScore || 0,
      lastAnalyzed: perf.resume.lastAnalyzed
    },
    overall: {
      hasActivity: perf.overall.hasActivity || false,
      placementReadiness: readiness,
      streak: perf.overall.streak || 0,
      lastActivity: perf.overall.lastActivity
    },
    strengths: perf.strengths,
    weaknesses: perf.weaknesses,
    studyPlan: perf.studyPlan,
    recentActivity: perf.recentActivity || []
  };
}

module.exports = {
  calculateReadiness,
  evaluateDiagnosis,
  generatePersonalizedStudyPlan,
  appendRecentActivity,
  getUserPerformanceDoc,
  getUserDashboardData
};
