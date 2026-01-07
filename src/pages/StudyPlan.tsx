import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useStudyData } from "../data/useStudyData";

export default function StudyPlan() {
  const { studyPlan } = useStudyData();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Study Plan</h2>
      {!studyPlan ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>No study plan created yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {studyPlan.days.map((day) => (
            <div key={day.day} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-bold text-lg">Day {day.day}</h3>
                  <p className="text-sm text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {day.duration}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <span className="font-semibold">Focus:</span> {day.focus}
              </div>
              <ul className="space-y-2">
                {day.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
