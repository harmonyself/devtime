import { Timer, DollarSign, BarChart3, Check } from 'lucide-react';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">
            개발 시간을 돈으로 바꾸세요
          </h1>
          <p className="text-2xl mb-8 opacity-90">
            프리랜서 개발자를 위한 가장 간단한 시간 추적 도구
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            왜 DevTime인가요?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Timer,
                title: '원클릭 타이머',
                description: '프로젝트 선택하고 클릭 한 번으로 시작'
              },
              {
                icon: DollarSign,
                title: '실시간 수익 계산',
                description: '작업하는 동안 실시간으로 수익 확인'
              },
              {
                icon: BarChart3,
                title: '명확한 리포트',
                description: '프로젝트별 수익과 시간을 한눈에'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <feature.icon className="mx-auto mb-4 text-blue-600" size={64} />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            간단한 가격
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">무료</h3>
              <p className="text-5xl font-bold mb-6">₩0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={20} />
                  1개 프로젝트
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={20} />
                  기본 타이머
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" size={20} />
                  수익 계산
                </li>
              </ul>
              <Link
                href="/"
                className="block text-center bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300"
              >
                시작하기
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-2xl shadow-2xl transform scale-105">
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-5xl font-bold mb-6">₩9,000<span className="text-lg">/월</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="text-white" size={20} />
                  무제한 프로젝트
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-white" size={20} />
                  청구서 생성
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-white" size={20} />
                  상세 리포트
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-white" size={20} />
                  CSV 내보내기
                </li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:shadow-lg">
                Pro 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            오늘부터 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            1분이면 충분합니다. 신용카드 필요 없음.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-full text-xl font-bold hover:shadow-2xl transition"
          >
            무료로 시작하기 →
          </Link>
        </div>
      </section>
    </div>
  );
}