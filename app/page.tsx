"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Layout, Globe, Star, Heart } from 'lucide-react'
import { signIn } from "next-auth/react"
import { SignInWithGoogleLogo } from "./components/googleLogo"

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/curling.png?height=600&width=1200"
            alt="Curling stones on ice"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <img src="/assets/full-logo.svg" alt="CurlARC" className="flex mx-auto aspect-auto w-1/2 mb-8" />
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Revolutionize your curling match recording and management with our comprehensive web application.
          </p>
          <SignInWithGoogleLogo handleFunction={() => signIn('google')} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock className="w-10 h-10 text-blue-600" />}
              title="Real-time Match Recording"
              description="Track scores and progress effortlessly during your matches."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-blue-600" />}
              title="Team Collaboration"
              description="Share match records seamlessly with your teammates."
            />
            <FeatureCard
              icon={<Layout className="w-10 h-10 text-blue-600" />}
              title="User-friendly Interface"
              description="Clean, intuitive design for users of all skill levels."
            />
            <FeatureCard
              icon={<Globe className="w-10 h-10 text-blue-600" />}
              title="Web-based Convenience"
              description="No installation required—accessible from any browser."
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-dashed">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Public Match Sharing</h3>
                  <p className="text-muted-foreground">
                    Share and showcase your match records with the community.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Follow System</h3>
                  <p className="text-muted-foreground">
                    Stay updated on your favorite teams and players.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          {icon}
          <h3 className="text-xl font-semibold my-4">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
