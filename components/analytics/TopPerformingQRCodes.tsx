// components/analytics/TopPerformingQRCodes.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface QRCodeData {
  name: string;
  value: number;
}

interface TopPerformingQRCodesProps {
  data: QRCodeData[];
}

const TopPerformingQRCodes: React.FC<TopPerformingQRCodesProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing QR Codes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformingQRCodes;