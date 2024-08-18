// components/analytics/CitySection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CityData {
  city: string;
  country: string;
  scans: number;
  percentage: string;
}

interface CitySectionProps {
  cityData: CityData[];
}

const CitySection: React.FC<CitySectionProps> = ({ cityData }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Scans by City</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Scans</TableHead>
              <TableHead className="text-right">% of scans</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cityData.map((city, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{city.city}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell className="text-right">{city.scans}</TableCell>
                <TableCell className="text-right">{city.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CitySection;