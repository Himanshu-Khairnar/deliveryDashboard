'use client'

import AssignmentMetric from '@/webComponents/AssignmentMetric';
import AssignmentPartnerStatus from '@/webComponents/AssignmentPartnerStatus';
import AssignmentTable from '@/webComponents/AssignmentTable';



export default  function  AssignmentDashboard() {




    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Assignment Dashboard</h1>
                <p className="text-gray-500">Monitor real-time assignments and metrics</p>
            </div>

            {/* Metrics Overview */}
             <AssignmentMetric/>

            {/* Partner Status */}
            <AssignmentPartnerStatus/>

           
            {/* Recent Assignments */}
            <AssignmentTable/>
        </div>
    );
}
