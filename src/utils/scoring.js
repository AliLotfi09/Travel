// utils/scoring.js

export const SCORING_CONFIG = {
  BASE_POINTS: 1000,
  PERFECT_BONUS: 500,
  HINT_PENALTY: {
    neighbor: 50,
    direction: 100,
    best: 150
  },
  STEP_PENALTY: 30
};

export function calculateScore(userSteps, optimalSteps, hintsUsed) {
  let score = SCORING_CONFIG.BASE_POINTS;

  // کسر امتیاز برای قدم‌های اضافی
  const extraSteps = Math.max(0, userSteps - optimalSteps);
  score -= extraSteps * SCORING_CONFIG.STEP_PENALTY;

  // کسر امتیاز برای هر راهنما
  hintsUsed.forEach(hint => {
    score -= SCORING_CONFIG.HINT_PENALTY[hint] || 0;
  });

  // بونوس مسیر بهینه (بدون راهنما)
  if (userSteps === optimalSteps && hintsUsed.length === 0) {
    score += SCORING_CONFIG.PERFECT_BONUS;
  }

  return Math.max(0, score); // حداقل امتیاز صفر
}

export function getScoreGrade(score) {
  if (score >= 1400) return { label: '🏆 عالی', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  if (score >= 1000) return { label: '⭐ خوب', color: 'text-green-600', bg: 'bg-green-50' };
  if (score >= 700) return { label: '👍 قابل قبول', color: 'text-blue-600', bg: 'bg-blue-50' };
  return { label: '💪 تلاش کن', color: 'text-slate-600', bg: 'bg-slate-50' };
}