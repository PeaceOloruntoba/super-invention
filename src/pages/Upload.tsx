import { Loader2 } from "lucide-react";
import { useStudyData } from "../data/useStudyData";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Upload() {
  const { materials, setMaterials } = useStudyData();
  const [loading, setLoading] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  currentMaterial
  setLoading(false);
  const navigate = useNavigate()

  const handleFileUpload = async (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result?.split(",")[1];

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "document",
                    source: {
                      type: "base64",
                      media_type: "application/pdf",
                      data: base64Data,
                    },
                  },
                  {
                    type: "text",
                    text: "Please provide a comprehensive summary of this study material in 3-5 paragraphs. Focus on key concepts, main ideas, and important details that would be useful for exam preparation.",
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        const summary =
          data.content.find((c: { type: string; }) => c.type === "text")?.text ||
          "Summary not available";

        const newMaterial = {
          id: Date.now(),
          name: file.name,
          uploadDate: new Date().toISOString(),
          summary: summary,
          file: file,
        };

        setMaterials((prev: any) => [...prev, newMaterial]);
        setCurrentMaterial(newMaterial);
        toast.success(
          "✅ Material uploaded and summarized successfully!"
        );
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
        <Upload className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
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
                <Upload className="w-5 h-5" />
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
