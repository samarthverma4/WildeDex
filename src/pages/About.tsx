import { Brain, Users, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About NatureSight Snap
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between technology and nature conservation through 
              accessible AI-powered wildlife identification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To make wildlife identification accessible to everyone, empowering 
                  nature enthusiasts, researchers, and conservationists with cutting-edge 
                  AI technology that helps preserve biodiversity and promote environmental awareness.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our system uses advanced machine learning models trained on extensive 
                  wildlife datasets. Built with MobileNetV2 for efficient processing, 
                  it provides real-time species identification with high accuracy and confidence scoring.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">AI-Powered Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced neural networks trained on thousands of species for accurate identification
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Built for researchers, educators, and nature lovers to share knowledge
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Conservation Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Supporting wildlife conservation through better species monitoring and research
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Future Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Short Term</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Real-time webcam detection</li>
                    <li>• Mobile app development</li>
                    <li>• Extended species database</li>
                    <li>• Offline detection capabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Long Term</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Augmented reality overlays</li>
                    <li>• Collaborative research platform</li>
                    <li>• Conservation tracking tools</li>
                    <li>• Educational content integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;