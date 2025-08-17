import { useState, useEffect } from "react";
import { Clock, Download, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface HistoryEntry {
  id: number;
  timestamp: string;
  image: string;
  result: {
    species: string;
    confidence: number;
    scientificName: string;
    commonName: string;
  };
}

const History = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('detection-history') || '[]');
    setHistory(savedHistory);
    setFilteredHistory(savedHistory);
  }, []);

  useEffect(() => {
    const filtered = history.filter(entry =>
      entry.result.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.result.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHistory(filtered);
  }, [searchTerm, history]);

  const clearHistory = () => {
    localStorage.removeItem('detection-history');
    setHistory([]);
    setFilteredHistory([]);
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wildlife-detection-history.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Detection History</h1>
              <p className="text-muted-foreground">
                Review your previous wildlife identifications
              </p>
            </div>
            
            <div className="flex gap-2">
              {history.length > 0 && (
                <>
                  <Button onClick={exportHistory} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button onClick={clearHistory} variant="outline">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </>
              )}
            </div>
          </div>

          {history.length > 0 && (
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search species..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {filteredHistory.length === 0 ? (
            <Card className="bg-gradient-card shadow-soft">
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {history.length === 0 ? "No detections yet" : "No matching results"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {history.length === 0 
                    ? "Start by uploading an image to detect wildlife species"
                    : "Try adjusting your search terms"
                  }
                </p>
                {history.length === 0 && (
                  <Button asChild>
                    <a href="/detect">Start Detecting</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHistory.map((entry) => (
                <Card key={entry.id} className="bg-gradient-card shadow-soft hover:shadow-nature transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <img
                        src={entry.image}
                        alt={entry.result.commonName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {entry.result.commonName}
                      </h3>
                      <p className="text-sm text-muted-foreground italic">
                        {entry.result.scientificName}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {(entry.result.confidence * 100).toFixed(1)}% confidence
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-gradient-primary h-1.5 rounded-full"
                        style={{ width: `${entry.result.confidence * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;