import { Clock } from "lucide-react";
import { useStudyData } from "../data/useStudyData";

export default function SemesterPlan() {
  const { semesterPlan } = useStudyData();

  if (!semesterPlan) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p>No semester plan yet</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Semester Planning</h2>
      <div className="space-y-4">
        {semesterPlan.schedule.map((day) => (
          <div key={day.day} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Day {day.day} • {day.date}</div>
              <div className="text-sm text-gray-500">{day.totalHours}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {day.sessions.map((s, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-indigo-50">
                  <div className="font-semibold">{s.course} • {s.timeSlot}</div>
                  <div className="text-sm">Topics: {s.topics.join(", ")}</div>
                  <div className="text-xs text-gray-600">{s.type} • {s.duration}</div>
                </div>
              ))}
            </div>
            {day.notes && (
              <div className="text-sm text-gray-600 mt-2">{day.notes}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/70 rounded-xl border">
        <div className="font-semibold mb-2">Summary</div>
        <div>Total hours: {semesterPlan.summary.totalStudyHours}</div>
        <ul className="list-disc ml-5 mt-2">
          {semesterPlan.summary.coursesBreakdown.map((c) => (
            <li key={c.course}>{c.course}: {c.hours}h</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
