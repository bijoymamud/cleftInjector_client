import { useGetDashboardDataQuery } from "@/redux/features/baseApi";
import { Clock, Calendar, DollarSign, Users } from "lucide-react";

export default function ConsultationDashboard() {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardDataQuery();

  console.log(dashboardData);
  const statConfig = {
    total_consultations: { icon: Users, color: "text-[#E26C29]" },
    this_month_consultations: { icon: Calendar, color: "text-[#E26C29]" },
    monthly_revenue: { icon: DollarSign, color: "text-[#E26C29]" },
  };

  const stats = dashboardData?.stats
    ? [
        {
          label: "Total Consultations",
          value: dashboardData.stats.total_consultations,
          icon: statConfig.total_consultations.icon,
          color: statConfig.total_consultations.color,
        },
        {
          label: "This Month Consultations",
          value: dashboardData.stats.this_month_consultations,
          icon: statConfig.this_month_consultations.icon,
          color: statConfig.this_month_consultations.color,
        },
        {
          label: "Monthly Revenue",
          value: `$${dashboardData.stats.monthly_revenue}`,
          icon: statConfig.monthly_revenue.icon,
          color: statConfig.monthly_revenue.color,
        },
      ]
    : [];

  const upcoming = dashboardData?.upcoming_consultations || [];
  const recent = dashboardData?.recent_activities || [];

  if (isLoading)
    return <div className="p-8 text-center">Loading dashboard...</div>;
  if (isError)
    return (
      <div className="p-8 text-center text-red-600">Failed to load data.</div>
    );

  return (
    <div className="">
      <div className="mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow drop-shadow-lg p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl text-[#383838] font-semibold">
                    {stat.label}
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Consultations */}
          <div className="bg-[#F9FAFB] p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                Your upcoming consultations
              </h2>
            </div>
            <div className="p-4">
              {upcoming.length === 0 ? (
                <div className="text-center text-gray-500 py-10 font-medium">
                  Currently no consultation in queue
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((data, i) => (
                    <div
                      key={i}
                      className="flex border bg-white hover:cursor-pointer items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={data?.patient_image}
                          alt={data.patient_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {data.patient_name}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {new Date(
                                  data?.appointment_datetime
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(
                                  data?.appointment_datetime
                                ).toLocaleDateString([], {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-orange-500 font-semibold capitalize">
                        {data?.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-[#F9FAFB] p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Recent Activities
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recent?.map((a, i) => (
                  <div
                    key={i}
                    className="flex border bg-white hover:cursor-pointer items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={a?.patient_image}
                        alt={a?.patient_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 mb-2">
                          {a?.patient_name}
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />{" "}
                            <h1>{a?.activity_time}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium capitalize ${a.statusColor}`}
                    >
                      {a.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
