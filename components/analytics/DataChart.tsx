import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FilterSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="QR code name" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="product-qr">Product QR</SelectItem>
          <SelectItem value="event-qr">Event QR</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Operating systems" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="android">Android</SelectItem>
          <SelectItem value="ios">iOS</SelectItem>
          <SelectItem value="windows">Windows</SelectItem>
          <SelectItem value="macos">macOS</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Countries" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="london">London</SelectItem>
          <SelectItem value="berlin">Berlin</SelectItem>
          <SelectItem value="paris">Paris</SelectItem>
          <SelectItem value="toronto">Toronto</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSection;