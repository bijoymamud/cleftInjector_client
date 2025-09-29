import { Clock, Calendar, DollarSign, Users } from "lucide-react";

export default function ConsultationDashboard() {
  const stats = [
    {
      title: "Total Consultations",
      value: "247",
      change: "+22% ",
      icon: Users,
      color: "text-orange-500",
    },
    {
      title: "This Month",
      value: "32",
      change: "+8% ",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: "+15% ",
      icon: DollarSign,
      color: "text-orange-500",
    },
  ];

  const upcomingConsultations = [
    {
      name: "Sarah Johnson",
      time: "10:00 AM",
      date: "Today, Sep 6",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b72a32b3?w=40&h=40&fit=crop&crop=face",
      status: "Pending",
    },
    {
      name: "Michael Chen",
      time: "10:00 AM",
      date: "Sep 12",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "Pending",
    },
    {
      name: "Emma Wilson",
      time: "10:00 AM",
      date: "Sep 17",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "Pending",
    },
    {
      name: "David Martinez",
      time: "10:00 AM",
      date: "Sep 17",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "Pending",
    },
  ];

  const recentActivities = [
    {
      name: "Sarah Johnson",
      time: "2hr ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b72a32b3?w=40&h=40&fit=crop&crop=face",
      status: "Consultation completed",
      statusColor: "text-green-600",
    },
    {
      name: "Michael Chen",
      time: "2 days ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "Consultation completed",
      statusColor: "text-green-600",
    },
    {
      name: "Emma Wilson",
      time: "Sep 17",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "Consultation completed",
      statusColor: "text-green-600",
    },
    {
      name: "Sarah Johnson",
      time: "Sep 17",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b72a32b3?w=40&h=40&fit=crop&crop=face",
      status: "Cancelled",
      statusColor: "text-red-500",
    },
  ];

  return (
    <div className="">
      <div className="mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl text-[#383838] font-semibold">
                  {stat.title}
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-base font-semibold text-gray-500">
                <span className={`${stat?.color} font-semibold`}>
                  {stat.change}
                </span>{" "}
                from last month
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Consultations */}
          <div className="bg-[#F9FAFB] p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="p-6  border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your upcoming consultations
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {upcomingConsultations.map((consultation, index) => (
                  <div
                    key={index}
                    className="flex border bg-white hover:cursor-pointer items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={consultation.avatar}
                        alt={consultation.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {consultation.name}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{consultation.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{consultation.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-orange-500 font-semibold">
                      {consultation.status}
                    </div>
                  </div>
                ))}
              </div>
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
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex border bg-white hover:cursor-pointer items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={activity.avatar}
                        alt={activity.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {activity.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${activity.statusColor}`}
                    >
                      {activity.status}
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
