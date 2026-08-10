const ResumeResult = require('../models/ResumeResult');
const { getUserPerformanceDoc, calculateReadiness, evaluateDiagnosis, appendRecentActivity } = require('../services/dashboard.service');

const analyzeResume = async (req, res, next) => {
  try {
    const { resumeText = '', targetRole = 'Software Engineer' } = req.body;
    const textLength = resumeText.length;

    let score = 75;
    let grammarErrors = 0;
    let formattingScore = 88;
    let atsScore = 80;
    const suggestions = [];

    if (!resumeText || textLength < 100) {
      score = 55;
      suggestions.push('Resume text is too brief. Provide detailed project descriptions and achievements.');
      suggestions.push('Include a dedicated Technical Skills section grouped by languages, frameworks, and tools.');
    } else {
      const lower = resumeText.toLowerCase();
      if (lower.includes('react') || lower.includes('node') || lower.includes('python') || lower.includes('javascript')) {
        score += 10;
        atsScore += 10;
      } else {
        suggestions.push('Missing core target tech keywords. Add key frameworks like React, Node.js, SQL.');
      }

      if (resumeText.match(/\d+%/g) || resumeText.match(/\$\d+/g) || resumeText.match(/\d+x/gi)) {
        score += 8;
        formattingScore += 5;
      } else {
        suggestions.push('Add quantifiable metrics (e.g. "Improved API response speed by 40%", "Built app with 5,000 active users").');
      }

      suggestions.push('Ensure section headers use standardized terms like "Work Experience", "Education", and "Projects".');
      suggestions.push('Fix bullet point spacing and maintain consistent past-tense action verbs (e.g. Architected, Optimized, Scaled).');
    }

    const finalScore = Math.min(98, Math.max(50, score));

    if (req.user?.id) {
      try {
        await ResumeResult.create({
          userId: req.user.id,
          atsScore: finalScore,
          formattingScore,
          detectedSkills: ['JavaScript', 'HTML5/CSS3', 'REST APIs', 'Git', 'Problem Solving'],
          missingKeywords: ['Docker', 'TypeScript', 'CI/CD Pipeline', 'System Architecture'],
          suggestions
        });

        const perf = await getUserPerformanceDoc(req.user.id);
        perf.resume.uploaded = true;
        perf.resume.atsScore = finalScore;
        perf.resume.formattingScore = formattingScore;
        perf.resume.lastAnalyzed = new Date();

        perf.overall.hasActivity = true;
        perf.overall.lastActivity = new Date();

        appendRecentActivity(
          perf,
          'resume',
          `✓ Resume Analyzed`,
          `ATS Match Score: ${finalScore}%`
        );

        perf.overall.placementReadiness = calculateReadiness(perf);
        const diagnosis = evaluateDiagnosis(perf);
        perf.strengths = diagnosis.strengths;
        perf.weaknesses = diagnosis.weaknesses;

        perf.markModified('resume');
        perf.markModified('overall');
        perf.markModified('recentActivity');
        await perf.save();
      } catch (dbErr) {
        console.warn('Non-critical: Resume score update warning:', dbErr.message);
      }
    }

    res.json({
      success: true,
      analysis: {
        overallScore: finalScore,
        atsCompatibility: `${atsScore}%`,
        formattingScore: `${formattingScore}%`,
        grammarErrorsCount: grammarErrors,
        detectedSkills: ['JavaScript', 'HTML5/CSS3', 'REST APIs', 'Git', 'Problem Solving'],
        missingTargetKeywords: ['Docker', 'TypeScript', 'CI/CD Pipeline', 'System Architecture'],
        actionableSuggestions: suggestions
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeResume
};
