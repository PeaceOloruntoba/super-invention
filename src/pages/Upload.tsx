import { Loader2, Upload as UploadIcon } from "lucide-react";
import { useStudyData } from "../data/useStudyData.tsx";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Upload() {
  const { materials, setMaterials } = useStudyData();
  const [loading, setLoading] = useState(false);
  // no need to keep currentMaterial locally for now
  const navigate = useNavigate();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setLoading(true);

    try {
      // Simulate reading and summarization locally
      const reader = new FileReader();
      reader.onload = async () => {
        const placeholderSummary =
          "This is a placeholder summary generated locally. Replace with backend API later. Covers key concepts, main ideas, and exam-focused takeaways.";

        // Simulate processing time
        await new Promise((res) => setTimeout(res, 800));

        const newMaterial = {
          id: Date.now(),
          name: file.name,
          uploadDate: new Date().toISOString(),
          summary: placeholderSummary,
          file: file,
        } as any;

        setMaterials((prev: any) => [...prev, newMaterial]);
        toast.success("✅ Material uploaded and summarized successfully!");
        navigate("/materials");
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Error processing file. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <UploadIcon className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Upload Study Materials</h2>
        <p className="text-gray-600 mb-8">
          Upload PDF notes or lecture materials to get started
        </p>

        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={loading}
          />
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <UploadIcon className="w-5 h-5" />
                Choose PDF File
              </>
            )}
          </div>
        </label>

        {materials.length > 0 && (
          <div className="mt-12 text-left">
            <h3 className="text-xl font-bold mb-4">Recent Uploads</h3>
            <div className="space-y-3">
              {materials.slice(-3).map((material) => (
                <div key={material.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-indigo-600">
                    {material.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(material.uploadDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
