import { calculateInvestmentResults, formatter } from "../util/investment.js";

const TABLE_HEADERS = [
  "Year",
  "Investment Value",
  "Interest(Year)",
  "Total Interest",
  "Invested Capital",
];

export default function Result({ input }) {
  const resultData = calculateInvestmentResults(input);
  const initialInvestment = resultData[0].valueEndOfYear - resultData[0].interest - resultData[0].annualInvestment;
  console.log(resultData);
  return (
      <table id="result">
        <thead>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header} className="center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {resultData.map((data) => {
                const totalInterest = data.valueEndOfYear - data.annualInvestment * data.year - initialInvestment
                const totalAmountInvested = data.valueEndOfYear - totalInterest;
              return (
                <tr>
                    <td>{data.year}</td>
                    <td>{formatter.format(data.valueEndOfYear)}</td>
                    <td>{formatter.format(data.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
  );
}
