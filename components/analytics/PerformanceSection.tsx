// components/analytics/PerformanceSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface CampaignType {
  name: string;
  value: number;
}

interface PerformanceSectionProps {
  campaignTypes: CampaignType[];
}

const PerformanceSection: React.FC<PerformanceSectionProps> = ({ campaignTypes }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Type</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignTypes.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>
                  <Progress value={campaign.value * 100} className="w-[60%]" />
                </TableCell>
                <TableCell className="text-right">{(campaign.value * 100).toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PerformanceSection;