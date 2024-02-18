const dataPointWeights = {
  abuseScore: 0.6,
  reports: 0.01,
  isWhiteListed: 0.2,
  risk: {
    "N/A": 0.3,
    none: 0,
    low: 0.1,
    medium: 0.3,
    high: 0.5,
  },
};

async function urlFortressAssessment(abuseResult, pulseDiveResult) {
  try {
    const abuseScore = abuseResult.score;
    const reports = abuseResult.totalReports;
    const isWhiteListed = abuseResult.whiteList ? 0 : 1;
    const risk = pulseDiveResult.risk;
    const riskWeight = dataPointWeights.risk[risk] || 0;

    const combinedScore =
      (abuseScore / 100) * dataPointWeights.abuseScore +
      reports * dataPointWeights.reports +
      isWhiteListed * dataPointWeights.isWhiteListed +
      riskWeight;

    const assessment = await AssessmentScore(combinedScore);
    return assessment;
  } catch (error) {
    console.error("An error occurred in urlFortressAssessment:", error.message);
    throw error;
  }
}

function AssessmentScore(score) {
  if (score >= 0.8) {
    return "High";
  } else if (score >= 0.5) {
    return "Medium";
  } else {
    return "Low";
  }
}
module.exports = {
  urlFortressAssessment,
};
