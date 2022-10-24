import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label}`}</p>
//         <p className="intro">{`Total posts: ${payload[0].value}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

export function ChartBar(props: any) {
  return (
    <BarChart
      width={700}
      height={400}
      data={props.props}
      margin={{
        top: 10,
        right: 20,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" barSize={30} fill="#0a64ff" />
    </BarChart>
  );
}
