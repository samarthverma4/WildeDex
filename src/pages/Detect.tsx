import { useState, useCallback } from "react";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PredictionResult {
  species: string;
  confidence: number;
  scientificName: string;
  commonName: string;
}

const Detect = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setResult(null);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API call - replace with actual ML model integration
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual API response
      const mockResult: PredictionResult = {
        species: "Red Cardinal",
        confidence: 0.87,
        scientificName: "Cardinalis cardinalis",
        commonName: "Northern Cardinal"
      };
      
      setResult(mockResult);
      
      // Save to history (localStorage for now)
      const history = JSON.parse(localStorage.getItem('detection-history') || '[]');
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        image: imagePreview,
        result: mockResult
      };
      history.unshift(newEntry);
      localStorage.setItem('detection-history', JSON.stringify(history.slice(0, 50))); // Keep last 50
      
      toast({
        title: "Analysis complete!",
        description: `Detected: ${mockResult.commonName}`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Wildlife Species Detection
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload an image to identify the wildlife species using AI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!imagePreview ? (
                  <div
                    className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your image here</p>
                    <p className="text-muted-foreground mb-4">or click to browse</p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Selected wildlife"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={resetAnalysis}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Identify Species
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Detection Results</CardTitle>
              </CardHeader>
              <CardContent>
                {!result && !isAnalyzing && (
                  <div className="text-center py-8 text-muted-foreground">
                    Upload an image to see detection results
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Analyzing your image...</p>
                  </div>
                )}
                
                {result && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {result.commonName}
                      </h3>
                      <p className="text-muted-foreground italic">
                        {result.scientificName}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Confidence</span>
                          <Badge variant="secondary">
                            {(result.confidence * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          This identification is based on visual analysis using machine learning. 
                          For scientific purposes, please verify with multiple sources.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Detect;