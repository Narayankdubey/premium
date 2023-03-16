const raw = [
  { policyYear: 1, bonusRate: 2.5 },
  { policyYear: 2, bonusRate: 3 },
  { policyYear: 3, bonusRate: 3.5 },
  { policyYear: 4, bonusRate: 3.5 },
  { policyYear: 5, bonusRate: 3.5 },
  { policyYear: 6, bonusRate: 3.5 },
  { policyYear: 7, bonusRate: 3 },
  { policyYear: 8, bonusRate: 3 },
  { policyYear: 9, bonusRate: 3 },
  { policyYear: 10, bonusRate: 3 },
  { policyYear: 11, bonusRate: 3 },
  { policyYear: 12, bonusRate: 2.5 },
  { policyYear: 13, bonusRate: 3 },
  { policyYear: 14, bonusRate: 3 },
  { policyYear: 15, bonusRate: 2.5 },
  { policyYear: 16, bonusRate: 5 },
  { policyYear: 17, bonusRate: 4 },
  { policyYear: 18, bonusRate: 4.5 },
  { policyYear: 19, bonusRate: 4 },
  { policyYear: 20, bonusRate: 25 },
];
const calulatePremium = (data) => {
  let sumOfBonus = 0;
  raw.forEach((item) => {
    const bonus = (item.bonusRate * data?.sumAssured) / 100;
    sumOfBonus = sumOfBonus + bonus;
  });
  let calculatedData = [];
  raw.forEach((item) => {
    const result = {...item};
    result.premium = item.policyYear <= data?.ppt ? data?.modalPremium : 0;
    result.sumAssured = data?.pt == item.policyYear ? data?.sumAssured : 0;
    result.bonusAmount = (item.bonusRate * data?.sumAssured) / 100;
    result.totalBenefit = data?.pt == item.policyYear ? sumOfBonus + result?.sumAssured : 0;
    result.netCashflows =
      data?.pt == item.policyYear
        ? result.totalBenefit
        : result?.sumAssured - result?.premium;
    calculatedData.push(result);
  });
  return calculatedData;
};

module.exports = {calulatePremium}
