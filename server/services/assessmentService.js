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
  const abuseScore = abuseResult.score || 0;
  const reports = abuseResult.totalReports || 0;
  const isWhiteListed = abuseResult.whiteList ? 0 : 1; //fix for "N/A"
  const risk = pulseDiveResult.risk;
  const riskWeight = dataPointWeights.risk[risk] || 0;
  console.log(risk);
  console.log(`Riskweight:${riskWeight}`);
  console.log(`whitelist: ${isWhiteListed}`);

  const combinedScore =
    (abuseScore / 100) * dataPointWeights.abuseScore +
    reports * dataPointWeights.reports +
    isWhiteListed * dataPointWeights.isWhiteListed +
    riskWeight;
  assessment = await AssessmentScore(combinedScore);
  return assessment;
}

function AssessmentScore(score) {
  console.log(score);
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
