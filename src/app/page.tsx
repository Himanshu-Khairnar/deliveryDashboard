import React from 'react';
import {
  Package,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { getpartner } from '@/actions/partner.actions';
import DashboardBasic from '@/webComponents/DashboardBasic'
import DashboardPartner from '@/webComponents/DashboardPartner';
import Dashboardtable from '@/webComponents/Dashboardtable';
import Link from 'next/link';



export default function Dashboard() {


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delivery Dashboard</h1>
          <p className="text-gray-500">Real-time delivery management overview</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Metrics */}
      <DashboardBasic />
      <Link href="/assignment" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors underline">
        Check Assignment Metrics in Detail →
      </Link>


      {/* Partners dashboard */}
      <DashboardPartner />
      <Link href="/partners" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors underline">
        Check Partner Metrics in Detail →
      </Link>

      {/* Recent Orders */}
      <Dashboardtable />
      <Link href="/orders" className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors underline">
        Check Recent Orders in Detail →
      </Link>



    </div>
  );
}