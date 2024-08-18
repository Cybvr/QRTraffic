// components/analytics/StatCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon } from 'lucide-react';

interface StatCardsProps {
  scans: number;
  scanIncrease: number;
  users: number;
  userIncrease: number;
}

const StatCards: React.FC<StatCardsProps> = ({ scans, scanIncrease, users, userIncrease }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scans</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scans.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              {scanIncrease}% than the previous month
            </span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Users</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 flex items-center">
              {userIncrease}% than the previous month
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;