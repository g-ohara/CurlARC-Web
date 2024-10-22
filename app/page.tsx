"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Users, Zap, Target, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false)

  const features = [
    { icon: LogIn, title: "簡単ログイン", description: "Googleアカウントで即座にアクセス", color: "from-blue-300 to-blue-600" },
    { icon: Users, title: "チーム管理と共有", description: "チームの記録を簡単に管理・共有", color: "from-green-300 to-green-600" },
    { icon: Zap, title: "直感的なUI", description: "素早く正確な記録入力を実現", color: "from-yellow-300 to-yellow-600" }
  ]

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-6xl font-bold text-center mb-4 bg-clip-text font-display"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        >
          CurlARC
        </motion.h1>
        <motion.p 
          className="text-2xl text-center mb-12 text-blue-800 font-mincho italic"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          カーリング試合記録の革新的Webアプリ
        </motion.p>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className={`bg-gradient-to-r ${feature.color}`}>
                <CardTitle className="flex items-center text-white font-display text-xl">
                  <feature.icon className="mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardDescription className="px-6 py-4 text-gray-600 font-sans">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg mb-6 font-sans leading-relaxed text-gray-700">
              CurlARCは、カーリングの試合記録を簡単に管理し、チームのパフォーマンスを向上させるための最先端ツールです。
              プロからアマチュアまで、すべてのカーリング愛好家のゲームを次のレベルへ引き上げます。
            </p>
            <Link href="/login">
              <Button className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-display" size="lg">
                今すぐ使ってみる
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img
              src="/assets/sheet.png?height=300&width=500"
              alt="CurlARCのスクリーンショット"
              className="rounded-lg shadow-xl w-full h-auto border border-gray-200"
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="mb-12 bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center text-blue-700 font-display">
                <Target className="mr-2" />
                詳細なデータ記録
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 font-sans">CurlARCでは、試合の細かなデータを記録できます：</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 font-sans">
                <li>各エンドの詳細なスコア</li>
                <li>各ショットごとのデータ：
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                    <li>シューター名</li>
                    <li>ショットの成功率</li>
                    <li>ショット終了時のストーンの座標</li>
                  </ul>
                </li>
                <li>チーム全体とプレイヤー個人の統計</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              <CardTitle className="text-2xl flex items-center justify-between text-blue-700 font-display">
                使い方
                <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
            {isExpanded && (
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 font-sans">
                  <li>Googleアカウントでログインします。</li>
                  <li>新しい試合を作成するか、既存のチームを選択します。</li>
                  <li>試合情報とチーム情報を入力します。</li>
                  <li>各エンド、各ショットのデータを入力していきます。</li>
                  <li>試合終了後、詳細な統計や分析を確認できます。</li>
                  <li>チームメンバーと記録を共有し、パフォーマンス向上に役立てましょう。</li>
                </ol>
              </CardContent>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}