import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartProps } from 'types/types';

export function ChartBar(props: ChartProps) {
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
      <Bar dataKey="value" barSize={40} fill="#00dea3" />
    </BarChart>
  );
}
